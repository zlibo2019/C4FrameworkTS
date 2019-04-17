/// <reference types="ioredis" />
import { JWTStore } from "../JWTTypes/JWTConfig";
import Redis = require('ioredis');
export default class RedisStore implements JWTStore {
    private m_RedisClient;
    private m_Prefix;
    private m_ClockTolerance;
    init(config: {
        client: Redis.Redis;
        prefix: string;
        clockTolerance: number;
    }): Promise<boolean>;
    destroy(): Promise<void>;
    get(key: string): Promise<any>;
    set(key: string, data: any): Promise<boolean>;
    clear(key: string): Promise<void>;
}
