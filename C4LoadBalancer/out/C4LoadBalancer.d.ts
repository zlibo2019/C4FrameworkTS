import BalancerInstance from './Balancer/BalancerInstance';
export default class C4LoadBalancer {
    private static s_BalancerFactory;
    static Init(): void;
    static registerBalancer(key: string, f: () => BalancerInstance): void;
    static unregisterBalancer(key: string): void;
    static createBalancer(key: string): BalancerInstance | null;
}
