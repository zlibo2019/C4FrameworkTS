"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class RedisStore {
    constructor() {
        this.m_RedisClient = null;
        this.m_Prefix = "";
        this.m_ClockTolerance = 0;
    }
    init(config) {
        return __awaiter(this, void 0, void 0, function* () {
            this.m_RedisClient = config.client;
            this.m_Prefix = config.prefix;
            this.m_ClockTolerance = config.clockTolerance;
            return true;
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            //
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.m_RedisClient === null)
                return undefined;
            let Res = yield this.m_RedisClient.get(this.m_Prefix + "_" + key);
            return JSON.parse(Res);
        });
    }
    set(key, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.m_RedisClient === null)
                return false;
            let CurTime = (new Date()).getTime() - this.m_ClockTolerance * 3000 - 60000;
            let ExpireTime = ((data.exp * 1000 - CurTime) / 1000);
            ExpireTime = ExpireTime < 0 ? 0 : ExpireTime;
            ExpireTime = parseInt(ExpireTime + "");
            let Res = yield this.m_RedisClient.setex(this.m_Prefix + "_" + key, ExpireTime, JSON.stringify(data));
            return true;
        });
    }
    clear(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.m_RedisClient === null)
                return;
            do {
                let Res = yield this.m_RedisClient.scan(0, [
                    "match", this.m_Prefix + "_",
                    "count", 100
                ]);
                let Keys = Res[1];
                yield this.m_RedisClient.del(Keys);
                if (Res[0] === "0") {
                    break;
                }
            } while (true);
        });
    }
}
exports.default = RedisStore;
;
//# sourceMappingURL=RedisStore.js.map