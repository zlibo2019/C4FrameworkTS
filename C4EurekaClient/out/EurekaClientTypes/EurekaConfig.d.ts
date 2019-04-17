export default interface EurekaConfig {
    host: string;
    port: number;
    heartbeatInterval?: number | 30000;
    registryFetchInterval?: number | 30000;
    maxRetries?: number | 3;
    requestRetryDelay?: number | 500;
    fetchRegistry?: boolean | true;
    filterUpInstances?: boolean | true;
    servicePath: string | '/eureka/v2/apps/';
    ssl?: boolean | false;
    useDns?: boolean | false;
    preferSameZone?: boolean | true;
    clusterRefreshInterval?: number | 300000;
    fetchMetadata?: boolean | true;
    registerWithEureka?: boolean | true;
    useLocalMetadata?: boolean | false;
    preferIpAddress?: boolean | false;
}
