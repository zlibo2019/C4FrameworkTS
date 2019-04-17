
export interface PortWrapper {
    "$"         : number;
    "@enabled"  : boolean;
};

export type DataCenterName = 'Netflix' | 'Amazon' | 'MyOwn';
export type InstanceStatus = 'UP' | 'DOWN' | 'STARTING' | 'OUT_OF_SERVICE' | 'UNKNOWN';
export type ActionType = 'ADDED' | 'MODIFIED' | 'DELETED';

export interface DataCenterInfo {
    "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
    name    : DataCenterName
};

export interface LeaseInfo {
    renewalIntervalInSecs   : number | 30,
    durationInSecs          : number | 90       // 实际更新时间为该时间的两倍
};

export default interface InstanceInfo {
    instanceId             ?: string | '';      // 实例ID，代替sid
    app                     : string | '';      // 应用名
    appGroupName           ?: string | '';      // 应用组名
    ipAddr                  : string | '';      // IP地址
    sid                    ?: string | '';      // 已弃用
    port                   ?: PortWrapper;      // 端口
    securePort             ?: PortWrapper;      // 安全通信接口
    homePageUrl            ?: string | '';      // home page url
    statusPageUrl          ?: string | '';      // 状态Page url
    healthCheckUrl         ?: string | '';      // 健康Page url
    secureHealthCheckUrl   ?: string | '';      // 安全的健康Page url
    vipAddress              : string | '';      // 虚拟IP地址
    secureVipAddress       ?: string | '';      // 安全的虚拟IP地址
    countryId              ?: number;           // 国家ID，已弃用
    dataCenterInfo          : DataCenterInfo;   // 数据中心信息
    hostName                : string | '';      // 主机名
    status                 ?: InstanceStatus;   // 状态（不要手动设置）
    overriddenstatus       ?: InstanceStatus;   // 覆盖状态（不要手动设置）
    leaseInfo               : LeaseInfo;        // 租赁信息（不要手动设置）
    isCoordinatingDiscoveryServer  ?: boolean;  // 正在协调发现服务器（不要手动设置）
    metadata               ?: any;              // 自定义数据
    lastUpdatedTimestamp   ?: number;           // 最后的更新时间（不要手动设置）
    lastDirtyTimestamp     ?: number;           // 最后的Dirty时间（不要手动设置）
    actionType             ?: ActionType;       // action type（不要手动设置）
    asgName                ?: string;           // 实例的AWS ASG
};
