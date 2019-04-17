
export default abstract class BalancerInstance {
    abstract init(servers ?: any) : void;
    abstract add(keys : any) : void;
    abstract remove(key : string) : void;
    abstract reset() : void;
    abstract get(key : string) : string;
    abstract update(servers : any) : void;
};
