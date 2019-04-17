export default interface EurekaConfig {
    host                    : string;                           // Eureka服务的Host
    port                    : number;                           // Eureka服务的port
    heartbeatInterval      ?: number | 30000,                   // 心跳间隔，单位秒
    registryFetchInterval  ?: number | 30000,                   // 从eureka服务器注册表中获取注册信息的时间间隔，单位秒
    maxRetries             ?: number | 3,                       // 最大重试次数
    requestRetryDelay      ?: number | 500,                     // 重试请求延迟
    fetchRegistry          ?: boolean | true,                   // 是否获取注册信息
    filterUpInstances      ?: boolean | true,                   // 是否对实例的状态进行过滤（状态===UP）
    servicePath             : string | '/eureka/v2/apps/',      // 服务的REST Path
    ssl                    ?: boolean | false,                  // 是否启用SSL
    useDns                 ?: boolean | false,                  // 是否启用DNS
    preferSameZone         ?: boolean | true,                   // 是否启用Eureka的区域亲和性
    clusterRefreshInterval ?: number | 300000,                  // 等待集群主机间刷新的等待时间，单位毫秒（仅限NDS解析）
    fetchMetadata          ?: boolean | true,                   // 是否获取MetaData
    registerWithEureka     ?: boolean | true,                   // 是否注册到Eureka
    useLocalMetadata       ?: boolean | false,                  // 在AWS环境中从元数据中使用本地IP和本地主机名
    preferIpAddress        ?: boolean | false                   // 在AWS环境中使用IP地址（本地或公共）作为注册的主机名
};