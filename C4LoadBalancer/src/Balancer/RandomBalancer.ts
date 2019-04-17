import BalancerInstance from './BalancerInstance';
import { TypeUtils } from 'c4utils';

/**
 * 带权重随机均衡器
 */
export default class RandomBalancer extends BalancerInstance {

    private m_Servers       : any;
    private m_TotalWeight   : number;

    constructor() {
        super();
        this.m_Servers      = {};
        this.m_TotalWeight  = 0;
    }

    /**
     * 
     * @param servers {
     *  'host:port' : { weight : value }
     * }
     */
    init(servers ?: any) {
        this.add(servers);
    }

    /**
     * 
     * @param servers {
     *  'host:port' : { weight : value }
     * }
     */
    add(servers : any) {
        if (servers) {
            for (let key in servers) {
                let Weight = servers[key].weight;
                if (!TypeUtils.isNullOrUndefined(Weight)
                    && TypeUtils.isInt(Weight)) {
                    this.m_Servers[key] = {
                        weight  : Weight
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
    remove(serverName : string) {
        let CurInfo = this.m_Servers[serverName];
        if (!TypeUtils.isNullOrUndefined(CurInfo)) {
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
    get(key : string) {
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
    update(servers : any) {
        for (let key in servers) {
            let Weight  = servers[key].weight;
            if (!TypeUtils.isNullOrUndefined(Weight)
                && TypeUtils.isInt(Weight)) {
                if (this.m_Servers.hasOwnProperty(key)) {
                    this.m_TotalWeight -= this.m_Servers[key].weight;
                    this.m_TotalWeight += Weight;
                } else {
                    this.m_TotalWeight += Weight;
                    this.m_Servers[key] = {
                        weight  : Weight
                    };
                }
            }
        }
    }
}

