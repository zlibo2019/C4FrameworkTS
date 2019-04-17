import BalancerInstance from './BalancerInstance';
/**
 * 最小负载均衡器
 */
export default class LeastLoadBalancer extends BalancerInstance {
    private m_Servers;
    private m_TotalWeight;
    constructor();
    /**
     * 初始化均衡器
     * weight为节点权重
     * cn为节点当前连接数
     * @param servers {
     *  'host:port' : { weight : value, cn : value}
     * }
     */
    init(servers?: any): void;
    /**
     * 新增节点
     * @param servers {
     *  'host:port' : { weight : value, cn : value}
     * }
     */
    add(servers: any): void;
    /**
     * 移除节点
     * @param serverName string
     */
    remove(serverName: string): void;
    /**
     * 重新分布
     */
    reset(): void;
    /**
     * 根据标识获取分布到的节点信息
     * @param key string
     */
    get(key: string): string;
    /**
     * 更新节点信息
     * @param servers {
     *  'host:port' : { weight : value, cn : value}
     * }
     */
    update(servers: any): void;
}
