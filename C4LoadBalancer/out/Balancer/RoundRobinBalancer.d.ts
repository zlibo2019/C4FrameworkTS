import BalancerInstance from './BalancerInstance';
/**
 * 带权重的轮询负载器
 */
export default class RoundRobinBalancer extends BalancerInstance {
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
