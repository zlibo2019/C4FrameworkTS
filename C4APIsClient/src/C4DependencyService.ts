import { BalancerInstance } from "c4loadbalancer";
import C4APIsClient from "./C4APIsClient";
import { InstanceInfo } from "c4eurekaclient";
import { TypeUtils } from "c4utils";
import { C4RESTFulClient, RequestOption } from "c4restfulclient";

export default class C4DependencyService {

    private m_AppName           : string;                           // 应用名
    private m_LoadBalance       : BalancerInstance | null;          // 负载均衡器
    private m_LBType            : string;                           // 负载均衡算法类型
    private m_InstancesCache    : Map<string, any>;                 // 实例的缓存（Ready、Starting、Running状态）
    private m_APIsClient        : C4APIsClient | null;              // API客户端
    private m_RESTClient        : C4RESTFulClient | null;           // RESTFulClient
    private m_Timeout           : number;
    private m_Required          : boolean = true;

    constructor(appName : string, timeout : number, required : boolean) {
        this.m_AppName          = appName;
        this.m_LoadBalance      = null;
        this.m_InstancesCache   = new Map();
        this.m_APIsClient       = null;
        this.m_RESTClient       = null;
        this.m_LBType           = "";
        this.m_Timeout          = timeout;
        this.m_Required         = required
    }

    /**
     * 设置负载均衡器
     * @param LBType 负载均衡器类型
     * @param lb 负载均衡器实例
     */
    setLoadBalancer(LBType : string, lb : BalancerInstance) {
        this.m_LBType       = LBType;
        this.m_LoadBalance  = lb;
    }

    /**
     * 获取负载均衡器类型
     */
    getLBType() {
        return this.m_LBType;
    }

    /**
     * 是否必须依赖
     */
    isRequired() {
        return this.m_Required;
    }

    /**
     * 设置APIs Client
     * @param client C4APIsClient实例，通过C4SwaggerJSCodeGenerator生成
     * @param restClient C4RESTFulClient实例
     */
    setAPIsClient(client : C4APIsClient, restClient : C4RESTFulClient) {
        this.m_APIsClient   = client;
        this.m_RESTClient   = restClient;
        if (this.m_APIsClient) {
            this.m_APIsClient.setService(this);
            this.m_APIsClient.setRESTClient(restClient);
        }
    }

    /**
     * 获取APIsClient实例
     */
    getAPIsClient() {
        return this.m_APIsClient;
    }

    /**
     * 获取应用名
     */
    getAppName() {
        return this.m_AppName;
    }

    /**
     * 获取服务的实例
     * @param key 当前实例的ID
     */
    getDomain(key : string) {
        if (this.m_LoadBalance) {
            return this.m_LoadBalance.get(key)
        }
        return "";
    }

    /**
     * 获取已经Read的实例
     * @param instances 
     */
    async _getReadyInstances(instances : InstanceInfo[]) {
        if (this.m_RESTClient === undefined || this.m_RESTClient === null)
            return [];

        let InstancesTask = [];
        let Self = this;
        for (let i = 0; i < instances.length; i++) {
            let CurStatusPageUrl = instances[i].statusPageUrl;
            if (CurStatusPageUrl === undefined || CurStatusPageUrl === null)
                continue;

            InstancesTask.push(
                this.m_RESTClient.get(CurStatusPageUrl,
                    <RequestOption>{
                        timeout : Self.m_Timeout
                    }
                ).catch((err) => {
                    return false;
                })
            );
        }

        if (InstancesTask.length === 0)
            return [];

        let TaskRes : any[] = await Promise.all(InstancesTask);
        let ReadyInstances : InstanceInfo[] = [];
        for (let i = 0; i < TaskRes.length; i++) {
            let CurRes = TaskRes[i];
            if (CurRes === false) {
                continue;
            }
            if (CurRes.data) {
                if ((<string>CurRes.data.Status).toUpperCase() === "READY"
                    || (<string>CurRes.data.Status).toUpperCase() === "STARTING"
                    || (<string>CurRes.data.Status).toUpperCase() === "RUNNING") {
                    TaskRes.push(instances[i])
                }
            }
        }

        return ReadyInstances;
    }

    /**
     * 更新实例的状态
     * @param instances 
     */
    async updateInstance(instances : InstanceInfo[]) {
        if (this.m_LoadBalance) {
            if (instances.length === 0) {
                this.m_InstancesCache.clear();
                this.m_LoadBalance.reset();
                return false;
            }

            if (this.m_RESTClient === undefined || this.m_RESTClient === null)
                return false;

            let Self = this;

            // 获取所有instances的状态
            let CurReadyInstances = await this._getReadyInstances(instances);

            // 剔除
            if (CurReadyInstances.length === 0) {
                this.m_InstancesCache.clear();
                this.m_LoadBalance.reset();
                return false;
            }
            let ReadyInstances = new Map<string, InstanceInfo>();
            for (let i = 0; i < CurReadyInstances.length; i++) {
                let CurInstanceId = CurReadyInstances[i].instanceId;
                if (CurInstanceId)
                    ReadyInstances.set(CurInstanceId, CurReadyInstances[i]);
            }
            for (let key of this.m_InstancesCache.keys()) {
                if (!ReadyInstances.has(key)) {
                    this.m_InstancesCache.delete(key);
                    this.m_LoadBalance.remove(key);
                }
            }

            // 添加和更新
            for (let instance of ReadyInstances.values()) {
                let CurLBInfo   = JSON.parse(instance.metadata.loadBalance);
                let CurKey      = `${instance.hostName}:${(<any>instance.port)['$']}`;
                let CurInfo     = this.m_InstancesCache.get(CurKey);
                let CurWeight   = CurLBInfo[Self.m_LBType] ? (CurLBInfo[Self.m_LBType].weight ? CurLBInfo[Self.m_LBType].weight : 1) : 1;
                if (undefined === CurInfo) {
                    this.m_LoadBalance.add({
                        CurKey : {
                            weight : CurWeight
                        }
                    });
                } else {
                    this.m_LoadBalance.update({
                        CurKey : {
                            weight : CurWeight
                        }
                    })
                }
            }

            return true;
        }

        return false;
    }
}
