"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C4APIsClient {
    constructor(key) {
        this.m_Service = null; // 对应的服务的实例
        this.m_RESTClient = null; // RESTFul客户端
        this.m_Logger = null; //
        this.m_InstanceID = key;
    }
    /**
     * 设置日志对象
     * @param logger
     */
    setLogger(logger) {
        this.m_Logger = logger;
    }
    /**
     * 设置依赖的服务
     * @param service C4DependencyService
     */
    setService(service) {
        this.m_Service = service;
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
    setRESTClient(client) {
        this.m_RESTClient = client;
    }
    /**
     * 获取RESTFul实例
     */
    getRESTClient() {
        return this.m_RESTClient;
    }
}
exports.default = C4APIsClient;
//# sourceMappingURL=C4APIsClient.js.map