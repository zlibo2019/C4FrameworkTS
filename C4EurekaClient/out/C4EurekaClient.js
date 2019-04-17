"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const EurekaClient = require("eureka-js-client");
class C4EurekaClient {
    constructor() {
        this.m_Client = null;
    }
    init(eureka, instanceInfo) {
        if (null !== this.m_Client) {
            return;
        }
        this.m_Client = new EurekaClient.Eureka({
            instance: instanceInfo,
            eureka: eureka
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            let Self = this;
            yield new Promise((resolve, reject) => {
                if (Self.m_Client !== null) {
                    Self.m_Client.start((err) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve();
                    });
                }
            });
        });
    }
    /**
     * 等待其他服务上线
     * @param Apps 等待注册的服务名列表
     */
    waitRegistered(Apps) {
        return __awaiter(this, void 0, void 0, function* () {
            let Self = this;
            yield new Promise((resolve, reject) => {
                let tempListener = () => {
                    let i = 0;
                    for (i = 0; i < Apps.length; i++) {
                        if (Self.getInstancesByAppId(Apps[i]).length === 0) {
                            break;
                        }
                    }
                    if (i >= Apps.length) {
                        resolve();
                        Self.m_Client.removeListener("registryUpdated", tempListener);
                    }
                };
                if (Self.m_Client !== null) {
                    Self.m_Client.addListener("registryUpdated", tempListener);
                }
            });
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            let Self = this;
            yield new Promise((resolve, reject) => {
                if (Self.m_Client !== null) {
                    Self.m_Client.stop((err) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve();
                    });
                }
            });
        });
    }
    getInstancesByAppId(appId) {
        if (null === this.m_Client) {
            return [];
        }
        return this.m_Client.getInstancesByAppId(appId);
    }
    getInstancesByVipAddress(vipAddress) {
        if (null === this.m_Client) {
            return [];
        }
        return this.m_Client.getInstancesByVipAddress(vipAddress);
    }
}
exports.default = C4EurekaClient;
//# sourceMappingURL=C4EurekaClient.js.map