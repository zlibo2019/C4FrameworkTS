import { BalancerInstance } from "c4loadbalancer";
import C4APIsClient from "./C4APIsClient";
import { InstanceInfo } from "c4eurekaclient";
import { C4RESTFulClient } from "c4restfulclient";
export default class C4DependencyService {
    private m_AppName;
    private m_LoadBalance;
    private m_LBType;
    private m_InstancesCache;
    private m_APIsClient;
    private m_RESTClient;
    private m_Timeout;
    private m_Required;
    constructor(appName: string, timeout: number, required: boolean);
    /**
     * 设置负载均衡器
     * @param LBType 负载均衡器类型
     * @param lb 负载均衡器实例
     */
    setLoadBalancer(LBType: string, lb: BalancerInstance): void;
    /**
     * 获取负载均衡器类型
     */
    getLBType(): string;
    /**
     * 是否必须依赖
     */
    isRequired(): boolean;
    /**
     * 设置APIs Client
     * @param client C4APIsClient实例，通过C4SwaggerJSCodeGenerator生成
     * @param restClient C4RESTFulClient实例
     */
    setAPIsClient(client: C4APIsClient, restClient: C4RESTFulClient): void;
    /**
     * 获取APIsClient实例
     */
    getAPIsClient(): C4APIsClient | null;
    /**
     * 获取应用名
     */
    getAppName(): string;
    /**
     * 获取服务的实例
     * @param key 当前实例的ID
     */
    getDomain(key: string): string;
    /**
     * 获取已经Read的实例
     * @param instances
     */
    _getReadyInstances(instances: InstanceInfo[]): Promise<InstanceInfo[]>;
    /**
     * 更新实例的状态
     * @param instances
     */
    updateInstance(instances: InstanceInfo[]): Promise<boolean>;
}
