import { JWTStore } from "../JWTTypes/JWTConfig";

export default class BaseMemoryStore implements JWTStore {

    private m_TokenStore : { [toekKey : string] : any} = {};

    async init(config : any) {
        return true;
    }

    async destroy() {
        this.m_TokenStore = {};
    }

    async get(key : string) {
        return this.m_TokenStore[key];
    }

    async set(key : string, data : any) {
        this.m_TokenStore[key] = data;
        return true;
    }

    async clear(key : string) {
        delete this.m_TokenStore.key
    }
};
