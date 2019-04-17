import EurekaClient = require('eureka-js-client');
import InstanceInfo, { PortWrapper, DataCenterName, DataCenterInfo, InstanceStatus, LeaseInfo, ActionType } from './EurekaClientTypes/InstanceInfo'
import EurekaConfig from './EurekaClientTypes/EurekaConfig';

export default class C4EurekaClient {
    private m_Client    : EurekaClient.Eureka | null;

    constructor() {
        this.m_Client   = null;
    }

    init(eureka : EurekaConfig, instanceInfo : InstanceInfo) {
        if (null !== this.m_Client) {
            return;
        }

        this.m_Client   = new EurekaClient.Eureka({
            instance : instanceInfo,
            eureka   : eureka
        });
    }

    async start() {
        let Self = this;
        await new Promise((resolve, reject) => {
            if (Self.m_Client !== null) {
                Self.m_Client.start((err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            }
        });
    }

    /**
     * 等待其他服务上线
     * @param Apps 等待注册的服务名列表
     */
    async waitRegistered(Apps : string[]) {
        let Self = this;

        await new Promise((resolve, reject) => {
            let tempListener = () => {
                let i = 0;
                for (i = 0; i < Apps.length; i++) {
                    if (Self.getInstancesByAppId(Apps[i]).length === 0) {
                        break;
                    }
                }
                if (i >= Apps.length) {
                    resolve();
                    (<any>Self.m_Client).removeListener("registryUpdated", tempListener)
                }
            }
            if (Self.m_Client !== null) {
                (<any>Self.m_Client).addListener("registryUpdated", tempListener);
            }
        });
    }

    async stop() {
        let Self = this;
        await new Promise((resolve, reject) => {
            if (Self.m_Client !== null) {
                Self.m_Client.stop((err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            }
        });
    }

    getInstancesByAppId(appId : string) : InstanceInfo[] {
        if (null === this.m_Client) {
            return [];
        }

        return <any []>this.m_Client.getInstancesByAppId(appId);
    }

    getInstancesByVipAddress(vipAddress: string) : InstanceInfo[] {
        if (null === this.m_Client) {
            return [];
        }

        return <any []>this.m_Client.getInstancesByVipAddress(vipAddress);
    }
}
