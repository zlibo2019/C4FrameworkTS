import { JWTStore } from "../JWTTypes/JWTConfig";
import Redis = require('ioredis')
import { configObj2JSObj } from "c4utils/src/TypeUtils";

export default class RedisStore implements JWTStore {

    private m_RedisClient : Redis.Redis | null  = null;
    private m_Prefix : string = "";
    private m_ClockTolerance : number = 0;

    async init(config : {
        client : Redis.Redis
        prefix : string;
        clockTolerance : number;
    }) {
        this.m_RedisClient      = config.client;
        this.m_Prefix           = config.prefix;
        this.m_ClockTolerance   = config.clockTolerance;
        return true;
    }

    async destroy() {
        //
    }

    async get(key : string) {
        if (this.m_RedisClient === null)
            return undefined;

        let Res = await this.m_RedisClient.get(this.m_Prefix + "_" + key);
        return JSON.parse(Res);
    }

    async set(key : string, data : any) {
        if (this.m_RedisClient === null)
            return false;

        let CurTime = (new Date()).getTime() - this.m_ClockTolerance * 3000 - 60000;
        let ExpireTime = ((data.exp * 1000 - CurTime) / 1000);
        ExpireTime  = ExpireTime < 0 ? 0 : ExpireTime;
        ExpireTime = parseInt(ExpireTime + "");
        let Res = await this.m_RedisClient.setex(this.m_Prefix + "_" + key, ExpireTime, JSON.stringify(data));
        return true;
    }

    async clear(key : string) {
        if (this.m_RedisClient === null)
            return;

        do {
            let Res = await this.m_RedisClient.scan(0, [
                "match", this.m_Prefix + "_",
                "count" , 100
            ]);
            let Keys = Res[1];
            await this.m_RedisClient.del(Keys);
            if (Res[0] === "0") {
                break;
            }
        } while (true);
    }
};
