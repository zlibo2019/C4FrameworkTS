import BalancerInstance from './BalancerInstance';
import HashRing = require('hashring');

export interface ConsistentHashBalancerOptions {
    VNodeCount  ?: number | 40,
    DefaultPort ?: number,
    Replicas    ?: number | 4,
    MaxCacheSize?: number | 5000
};

/**
 * 一致性Hash均衡器
 */
export default class ConsistentHashBalancer extends BalancerInstance {

    private m_HashRing : HashRing | null;

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
    init(keys ?: any, options ?: ConsistentHashBalancerOptions, algorithm : string = 'md5') {
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
    add(keys : any) {
        if (null === this.m_HashRing)
            return;
        this.m_HashRing.add(keys);
    }

    /**
     * 移除节点
     * @param key 'host:port' 
     */
    remove(key : string) {
        if (null === this.m_HashRing)
            return;

        this.m_HashRing.remove(key)
    }

    /**
     * 重新分布
     */
    reset() {
        if (null === this.m_HashRing)
            return;

        this.m_HashRing.reset()
    }

    /**
     * 根据标识获取分布到的节点信息
     * @param key string
     */
    get(key : string) {
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
    update(servers : any) {
        if (null === this.m_HashRing)
            return;
        for (let key in servers) {
            if ((<HashRing>this.m_HashRing).has(key)) {
                this.m_HashRing.remove(key);
            }
            this.m_HashRing.add(servers[key])
        }
    }
};
