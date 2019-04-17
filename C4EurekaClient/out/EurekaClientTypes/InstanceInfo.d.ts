export interface PortWrapper {
    "$": number;
    "@enabled": boolean;
}
export declare type DataCenterName = 'Netflix' | 'Amazon' | 'MyOwn';
export declare type InstanceStatus = 'UP' | 'DOWN' | 'STARTING' | 'OUT_OF_SERVICE' | 'UNKNOWN';
export declare type ActionType = 'ADDED' | 'MODIFIED' | 'DELETED';
export interface DataCenterInfo {
    "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo";
    name: DataCenterName;
}
export interface LeaseInfo {
    renewalIntervalInSecs: number | 30;
    durationInSecs: number | 90;
}
export default interface InstanceInfo {
    instanceId?: string | '';
    app: string | '';
    appGroupName?: string | '';
    ipAddr: string | '';
    sid?: string | '';
    port?: PortWrapper;
    securePort?: PortWrapper;
    homePageUrl?: string | '';
    statusPageUrl?: string | '';
    healthCheckUrl?: string | '';
    secureHealthCheckUrl?: string | '';
    vipAddress: string | '';
    secureVipAddress?: string | '';
    countryId?: number;
    dataCenterInfo: DataCenterInfo;
    hostName: string | '';
    status?: InstanceStatus;
    overriddenstatus?: InstanceStatus;
    leaseInfo: LeaseInfo;
    isCoordinatingDiscoveryServer?: boolean;
    metadata?: any;
    lastUpdatedTimestamp?: number;
    lastDirtyTimestamp?: number;
    actionType?: ActionType;
    asgName?: string;
}
