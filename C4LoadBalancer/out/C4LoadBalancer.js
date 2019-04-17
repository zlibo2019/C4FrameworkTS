"use strict";
// 初始化时，添加Key 列表，选择均衡器，设置均衡器参数
// 可以中间添加key
// 可以中间移除Key
// 提供获取当前选中的结果
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConsistentHashBalancer_1 = __importDefault(require("./Balancer/ConsistentHashBalancer"));
const RandomBalancer_1 = __importDefault(require("./Balancer/RandomBalancer"));
const RoundRobinBalancer_1 = __importDefault(require("./Balancer/RoundRobinBalancer"));
const LeastLoadBalancer_1 = __importDefault(require("./Balancer/LeastLoadBalancer"));
const c4utils_1 = require("c4utils");
class C4LoadBalancer {
    //
    // 注册Balancer
    // 移除Balancer
    // 获取Balancer
    static Init() {
        C4LoadBalancer.s_BalancerFactory.set('RandomBalancer', () => {
            return new RandomBalancer_1.default();
        });
        C4LoadBalancer.s_BalancerFactory.set('RoundRobinBalancer', () => {
            return new RoundRobinBalancer_1.default();
        });
        C4LoadBalancer.s_BalancerFactory.set('ConsistentHashBalancer', () => {
            return new ConsistentHashBalancer_1.default();
        });
        C4LoadBalancer.s_BalancerFactory.set('LeastLoadBalancer', () => {
            return new LeastLoadBalancer_1.default();
        });
    }
    static registerBalancer(key, f) {
        if (!c4utils_1.TypeUtils.isString(key)
            || c4utils_1.TypeUtils.isEmptyStr(key)) {
            throw new Error('Invalid key value : ' + JSON.stringify(key));
        }
        if (!c4utils_1.TypeUtils.isFunction(f)) {
            throw new Error('Invalid create function.');
        }
        C4LoadBalancer.s_BalancerFactory.set(key, f);
    }
    static unregisterBalancer(key) {
        if (!c4utils_1.TypeUtils.isString(key)
            || c4utils_1.TypeUtils.isEmptyStr(key)) {
            return;
        }
        C4LoadBalancer.s_BalancerFactory.delete(key);
    }
    static createBalancer(key) {
        if (!c4utils_1.TypeUtils.isString(key)
            || c4utils_1.TypeUtils.isEmptyStr(key)) {
            return null;
        }
        let factory = C4LoadBalancer.s_BalancerFactory.get(key);
        if (c4utils_1.TypeUtils.isUndefined(factory)
            || !c4utils_1.TypeUtils.isFunction(factory)) {
            return null;
        }
        return factory();
    }
}
C4LoadBalancer.s_BalancerFactory = new Map();
exports.default = C4LoadBalancer;
//# sourceMappingURL=C4LoadBalancer.js.map