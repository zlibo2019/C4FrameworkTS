import BalancerInstance from './BalancerInstance';
export interface ConsistentHashBalancerOptions {
    VNodeCount?: number | 40;
    DefaultPort?: number;
    Replicas?: number | 4;
    MaxCacheSize?: number | 5000;
}
/**
 * 一致性Hash均衡器
 */
export default class ConsistentHashBalancer extends BalancerInstance {
    private m_HashRing;
    constructor();
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
    init(keys?: any, options?: ConsistentHashBalancerOptions, algorithm?: string): void;
    /**
     * 增加新的节点
     * @param keys {
     *  'host:port' : { weight : value},
     *  'host:port' : { vnodes : value}
     * }
     */
    add(keys: any): void;
    /**
     * 移除节点
     * @param key 'host:port'
     */
    remove(key: string): void;
    /**
     * 重新分布
     */
    reset(): void;
    /**
     * 根据标识获取分布到的节点信息
     * @param key string
     */
    get(key: string): any;
    /**
     * 更新节点信息
     * @param servers {
     *  'host:port' : { weight : value},
     *  'host:port' : { vnodes : value}
     * }
     */
    update(servers: any): void;
}
