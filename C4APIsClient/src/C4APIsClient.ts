import C4DependencyService from "./C4DependencyService";
import { C4RESTFulClient } from "c4restfulclient";
import { C4Logger } from "c4logger";

export default abstract class C4APIsClient {

    protected m_InstanceID      : string;                               // 当前实例的ID
    protected m_Service         : C4DependencyService | null = null;    // 对应的服务的实例
    protected m_RESTClient      : C4RESTFulClient | null = null;        // RESTFul客户端
    protected m_Logger          : C4Logger | Console | null = null;     //

    constructor(key : string) {
        this.m_InstanceID   = key;
    }

    /**
     * 设置日志对象
     * @param logger 
     */
    setLogger(logger : any) {
        this.m_Logger   = logger;
    }

    /**
     * 设置依赖的服务
     * @param service C4DependencyService
     */
    setService(service : C4DependencyService) {
        this.m_Service  = service;
    }

    /**
     * 获取依赖服务的实例
     */
    getService() {
        return this.m_Service;
    }

    /**
     * 设置RESTFul客户端
     * @param client C4RESTFulClient实例
     */
    setRESTClient(client : C4RESTFulClient) {
        this.m_RESTClient   = client;
    }

    /**
     * 获取RESTFul实例
     */
    getRESTClient() {
        return this.m_RESTClient;
    }


}