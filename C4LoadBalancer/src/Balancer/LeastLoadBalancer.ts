import BalancerInstance from './BalancerInstance';
import { TypeUtils } from 'c4utils';

/**
 * 最小负载均衡器
 */
export default class LeastLoadBalancer extends BalancerInstance {
    private m_Servers       : any;
    private m_TotalWeight   : number;

    constructor() {
        super();
        this.m_Servers      = {};
        this.m_TotalWeight  = 0;
    }

    /**
     * 初始化均衡器
     * weight为节点权重
     * cn为节点当前连接数
     * @param servers {
     *  'host:port' : { weight : value, cn : value}
     * }
     */
    init(servers ?: any) {
        this.add(servers);
    }

    /**
     * 新增节点
     * @param servers {
     *  'host:port' : { weight : value, cn : value}
     * }
     */
    add(servers : any) {
        if (servers) {
            for (let key in servers) {
                let Weight  = servers[key].weight;
                let CN      = servers[key].cn;
                if (!TypeUtils.isNullOrUndefined(Weight)
                    && TypeUtils.isInt(Weight)
                    && !TypeUtils.isNullOrUndefined(CN)
                    && TypeUtils.isInt(CN)) {
                    this.m_Servers[key] = {
                        weight  : Weight,
                        cn      : CN
                    };
                    this.m_TotalWeight  += Weight;
                }
            }
        }
    }

    /**
     * 移除节点
     * @param serverName string
     */
    remove(serverName : string) {
        let CurInfo = this.m_Servers[serverName];
        if (!TypeUtils.isNullOrUndefined(CurInfo)) {
            this.m_TotalWeight  -= this.m_Servers[serverName].weight;
            delete this.m_Servers[serverName];
        }
    }

    /**
     * 重新分布
     */
    reset() {
        this.m_TotalWeight  = 0;
        for (let key in this.m_Servers) {
            this.m_TotalWeight += this.m_Servers[key].weight;
        }
    }

    /**
     * 根据标识获取分布到的节点信息
     * @param key string
     */
    get(key : string) {
        let Keys = Object.getOwnPropertyNames(this.m_Servers);
        for (let i = 0; i < Keys.length; i++) {
            if (this.m_Servers[Keys[i]] > 0) {
                for (let m = i + 1; m < Keys.length; m++) {
                    if (this.m_Servers[Keys[i]].cn * this.m_Servers[Keys[m]].weight
                        > this.m_Servers[Keys[m]].cn * this.m_Servers[Keys[i]].weight) {
                        i = m;
                    }
                }
                return Keys[i];
            }
        }
        return "";
    }

    /**
     * 更新节点信息
     * @param servers {
     *  'host:port' : { weight : value, cn : value}
     * }
     */
    update(servers : any) {
        for (let key in servers) {
            let Weight  = servers[key].weight;
            let CN      = servers[key].cn;
            if (!TypeUtils.isNullOrUndefined(Weight)
                && TypeUtils.isInt(Weight)
                && !TypeUtils.isNullOrUndefined(CN)
                && TypeUtils.isInt(CN)) {
                if (this.m_Servers.hasOwnProperty(key)) {
                    this.m_TotalWeight -= this.m_Servers[key].weight;
                    this.m_TotalWeight += Weight;
                    this.m_Servers[key].weight  = Weight;
                    this.m_Servers[key].cn      = CN;
                } else {
                    this.m_TotalWeight += Weight;
                    this.m_Servers[key] = {
                        weight  : Weight,
                        cn      : CN
                    };
                }
            }
        }
    }
}

