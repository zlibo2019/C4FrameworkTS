"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BalancerInstance_1 = __importDefault(require("./BalancerInstance"));
const c4utils_1 = require("c4utils");
/**
 * 带权重随机均衡器
 */
class RandomBalancer extends BalancerInstance_1.default {
    constructor() {
        super();
        this.m_Servers = {};
        this.m_TotalWeight = 0;
    }
    /**
     *
     * @param servers {
     *  'host:port' : { weight : value }
     * }
     */
    init(servers) {
        this.add(servers);
    }
    /**
     *
     * @param servers {
     *  'host:port' : { weight : value }
     * }
     */
    add(servers) {
        if (servers) {
            for (let key in servers) {
                let Weight = servers[key].weight;
                if (!c4utils_1.TypeUtils.isNullOrUndefined(Weight)
                    && c4utils_1.TypeUtils.isInt(Weight)) {
                    this.m_Servers[key] = {
                        weight: Weight
                    };
                    this.m_TotalWeight += Weight;
                }
            }
        }
    }
    /**
     *
     * @param serverName 'host:port'
     */
    remove(serverName) {
        let CurInfo = this.m_Servers[serverName];
        if (!c4utils_1.TypeUtils.isNullOrUndefined(CurInfo)) {
            this.m_TotalWeight -= this.m_Servers[serverName].weight;
            delete this.m_Servers[serverName];
        }
    }
    reset() {
        this.m_TotalWeight = 0;
        for (let key in this.m_Servers) {
            this.m_TotalWeight += this.m_Servers[key].weight;
        }
    }
    /**
     *
     * @param key string
     */
    get(key) {
        let index = '';
        let cur = Math.random() * this.m_TotalWeight;
        cur = parseInt(cur + "");
        for (let CurKey in this.m_Servers) {
            cur -= this.m_Servers[CurKey].weight;
            if (cur < 0) {
                index = CurKey;
                break;
            }
        }
        return index;
    }
    /**
     *
     * @param servers {
     *  'host:port' : { weight : value }
     * }
     */
    update(servers) {
        for (let key in servers) {
            let Weight = servers[key].weight;
            if (!c4utils_1.TypeUtils.isNullOrUndefined(Weight)
                && c4utils_1.TypeUtils.isInt(Weight)) {
                if (this.m_Servers.hasOwnProperty(key)) {
                    this.m_TotalWeight -= this.m_Servers[key].weight;
                    this.m_TotalWeight += Weight;
                }
                else {
                    this.m_TotalWeight += Weight;
                    this.m_Servers[key] = {
                        weight: Weight
                    };
                }
            }
        }
    }
}
exports.default = RandomBalancer;
//# sourceMappingURL=RandomBalancer.js.map