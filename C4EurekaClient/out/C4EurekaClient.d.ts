import InstanceInfo from './EurekaClientTypes/InstanceInfo';
import EurekaConfig from './EurekaClientTypes/EurekaConfig';
export default class C4EurekaClient {
    private m_Client;
    constructor();
    init(eureka: EurekaConfig, instanceInfo: InstanceInfo): void;
    start(): Promise<void>;
    /**
     * 等待其他服务上线
     * @param Apps 等待注册的服务名列表
     */
    waitRegistered(Apps: string[]): Promise<void>;
    stop(): Promise<void>;
    getInstancesByAppId(appId: string): InstanceInfo[];
    getInstancesByVipAddress(vipAddress: string): InstanceInfo[];
}
