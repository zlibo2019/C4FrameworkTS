// 初始化时，添加Key 列表，选择均衡器，设置均衡器参数
// 可以中间添加key
// 可以中间移除Key
// 提供获取当前选中的结果

import BalancerInstance         from './Balancer/BalancerInstance';
import ConsistentHashBalancer   from './Balancer/ConsistentHashBalancer';
import RandomBalancer           from './Balancer/RandomBalancer';
import RoundRobinBalancer       from './Balancer/RoundRobinBalancer';
import LeastLoadBalancer        from './Balancer/LeastLoadBalancer';

import { TypeUtils }            from 'c4utils';

export default class C4LoadBalancer {
    private static s_BalancerFactory : Map<string, () => BalancerInstance> = new Map();
    //
    // 注册Balancer
    // 移除Balancer
    // 获取Balancer

    static Init() {
        C4LoadBalancer.s_BalancerFactory.set('RandomBalancer', () => {
            return new RandomBalancer();
        });
        C4LoadBalancer.s_BalancerFactory.set('RoundRobinBalancer', () => {
            return new RoundRobinBalancer();
        });
        C4LoadBalancer.s_BalancerFactory.set('ConsistentHashBalancer', () => {
            return new ConsistentHashBalancer();
        });
        C4LoadBalancer.s_BalancerFactory.set('LeastLoadBalancer', () => {
            return new LeastLoadBalancer();
        });
    }
    
    static registerBalancer(key : string, f : () => BalancerInstance) {
        if (!TypeUtils.isString(key)
            || TypeUtils.isEmptyStr(key)) {
            throw new Error('Invalid key value : ' + JSON.stringify(key));
        }
        if (!TypeUtils.isFunction(f)) {
            throw new Error('Invalid create function.');
        }
        C4LoadBalancer.s_BalancerFactory.set(key, f);
    }

    static unregisterBalancer(key :string) {
        if (!TypeUtils.isString(key)
            || TypeUtils.isEmptyStr(key)) {
            return;
        }

        C4LoadBalancer.s_BalancerFactory.delete(key);
    }

    static createBalancer(key : string) {
        if (!TypeUtils.isString(key)
            || TypeUtils.isEmptyStr(key)) {
            return null;
        }
        let factory = C4LoadBalancer.s_BalancerFactory.get(key);
        if (TypeUtils.isUndefined(factory)
            || !TypeUtils.isFunction(factory)) {
            return null;
        }

        return (<() => BalancerInstance>factory)();
    }
}
