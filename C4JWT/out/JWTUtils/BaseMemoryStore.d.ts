import { JWTStore } from "../JWTTypes/JWTConfig";
export default class BaseMemoryStore implements JWTStore {
    private m_TokenStore;
    init(config: any): Promise<boolean>;
    destroy(): Promise<void>;
    get(key: string): Promise<any>;
    set(key: string, data: any): Promise<boolean>;
    clear(key: string): Promise<void>;
}
