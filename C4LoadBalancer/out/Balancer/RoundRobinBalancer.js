"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BalancerInstance_1 = __importDefault(require("./BalancerInstance"));
const c4utils_1 = require("c4utils");
/**
 * 带权重的轮询负载器
 */
class RoundRobinBalancer extends BalancerInstance_1.default {
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
                        weight: Weight,
                        curWeight: 0
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
            this.m_Servers[key].curWeight = 0;
            this.m_TotalWeight += this.m_Servers[key].weight;
        }
    }
    /**
     *
     * @param key string
     */
    get(key) {
        let index = '';
        for (let CurKey in this.m_Servers) {
            this.m_Servers[CurKey].curWeight += this.m_Servers[CurKey].weight;
            if (index === ''
                || this.m_Servers[index].curWeight < this.m_Servers[CurKey].curWeight) {
                index = CurKey;
            }
        }
        this.m_Servers[index].curWeight -= this.m_TotalWeight;
        return index;
    }
    /**
     *
     * @param servers {
     *  'host:port' : { weight : value }
     * }
     */
    update(servers) {
        let bReset = false;
        for (let key in servers) {
            let Weight = servers[key].weight;
            if (!c4utils_1.TypeUtils.isNullOrUndefined(Weight)
                && c4utils_1.TypeUtils.isInt(Weight)) {
                if (this.m_Servers.hasOwnProperty(key)) {
                    if (this.m_Servers[key].weight !== Weight) {
                        this.m_Servers[key].weight = Weight;
                        bReset = true;
                    }
                }
                else {
                    this.m_Servers[key] = {
                        weight: Weight,
                        curWeight: 0
                    };
                    bReset = true;
                }
            }
        }
        if (bReset) {
            this.reset();
        }
    }
}
exports.default = RoundRobinBalancer;
//# sourceMappingURL=RoundRobinBalancer.js.map