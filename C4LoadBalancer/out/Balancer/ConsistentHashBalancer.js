"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BalancerInstance_1 = __importDefault(require("./BalancerInstance"));
const HashRing = require("hashring");
;
/**
 * 一致性Hash均衡器
 */
class ConsistentHashBalancer extends BalancerInstance_1.default {
    constructor() {
        super();
        this.m_HashRing = null;
    }
    /**
     * 初始化均衡器
     * @param keys {
     *  'host:port' : { weight : value},
     *  'host:port' : { vnodes : value}
     * }
     * @param options {
     *  VNodeCount  : 40,
     *  Replicas    : 4,
     *  MaxCacheSize: 5000
     * }
     * @param algorithm 'md5'
     */
    init(keys, options, algorithm = 'md5') {
        if (null !== this.m_HashRing)
            return;
        this.m_HashRing = new HashRing(keys, algorithm, options);
    }
    /**
     * 增加新的节点
     * @param keys {
     *  'host:port' : { weight : value},
     *  'host:port' : { vnodes : value}
     * }
     */
    add(keys) {
        if (null === this.m_HashRing)
            return;
        this.m_HashRing.add(keys);
    }
    /**
     * 移除节点
     * @param key 'host:port'
     */
    remove(key) {
        if (null === this.m_HashRing)
            return;
        this.m_HashRing.remove(key);
    }
    /**
     * 重新分布
     */
    reset() {
        if (null === this.m_HashRing)
            return;
        this.m_HashRing.reset();
    }
    /**
     * 根据标识获取分布到的节点信息
     * @param key string
     */
    get(key) {
        if (null === this.m_HashRing)
            return '';
        return this.m_HashRing.get(key);
    }
    /**
     * 更新节点信息
     * @param servers {
     *  'host:port' : { weight : value},
     *  'host:port' : { vnodes : value}
     * }
     */
    update(servers) {
        if (null === this.m_HashRing)
            return;
        for (let key in servers) {
            if (this.m_HashRing.has(key)) {
                this.m_HashRing.remove(key);
            }
            this.m_HashRing.add(servers[key]);
        }
    }
}
exports.default = ConsistentHashBalancer;
;
//# sourceMappingURL=ConsistentHashBalancer.js.map