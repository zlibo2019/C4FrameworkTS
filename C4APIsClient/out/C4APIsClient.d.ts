import C4DependencyService from "./C4DependencyService";
import { C4RESTFulClient } from "c4restfulclient";
import { C4Logger } from "c4logger";
export default abstract class C4APIsClient {
    protected m_InstanceID: string;
    protected m_Service: C4DependencyService | null;
    protected m_RESTClient: C4RESTFulClient | null;
    protected m_Logger: C4Logger | Console | null;
    constructor(key: string);
    /**
     * 设置日志对象
     * @param logger
     */
    setLogger(logger: any): void;
    /**
     * 设置依赖的服务
     * @param service C4DependencyService
     */
    setService(service: C4DependencyService): void;
    /**
     * 获取依赖服务的实例
     */
    getService(): C4DependencyService | null;
    /**
     * 设置RESTFul客户端
     * @param client C4RESTFulClient实例
     */
    setRESTClient(client: C4RESTFulClient): void;
    /**
     * 获取RESTFul实例
     */
    getRESTClient(): C4RESTFulClient | null;
}
