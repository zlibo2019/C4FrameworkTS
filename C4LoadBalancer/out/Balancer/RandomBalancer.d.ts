import BalancerInstance from './BalancerInstance';
/**
 * 带权重随机均衡器
 */
export default class RandomBalancer extends BalancerInstance {
    private m_Servers;
    private m_TotalWeight;
    constructor();
    /**
     *
     * @param servers {
     *  'host:port' : { weight : value }
     * }
     */
    init(servers?: any): void;
    /**
     *
     * @param servers {
     *  'host:port' : { weight : value }
     * }
     */
    add(servers: any): void;
    /**
     *
     * @param serverName 'host:port'
     */
    remove(serverName: string): void;
    reset(): void;
    /**
     *
     * @param key string
     */
    get(key: string): string;
    /**
     *
     * @param servers {
     *  'host:port' : { weight : value }
     * }
     */
    update(servers: any): void;
}
