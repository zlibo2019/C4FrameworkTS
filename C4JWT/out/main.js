"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const C4JWT_1 = __importDefault(require("./C4JWT"));
const ioredis_1 = __importDefault(require("ioredis"));
const _1 = require(".");
const C4JWT_2 = require("./C4JWT");
var CurJWT = null;
var RedisClient = null;
function Test() {
    return __awaiter(this, void 0, void 0, function* () {
        CurJWT = new C4JWT_1.default();
        RedisClient = new ioredis_1.default(6379, "10.0.0.102", {
            family: 4,
            connectionName: "TestJWT",
            db: 1
        });
        yield new Promise((resolve, reject) => {
            RedisClient.on('ready', () => {
                resolve();
            });
            RedisClient.on('error', (err) => {
                reject(err);
            });
        }).catch((err) => {
            console.log(err);
            RedisClient = null;
        });
        if (null === RedisClient) {
            process.exit(-1);
        }
        let CurRedisStore = new _1.RedisStore();
        yield CurRedisStore.init({
            client: RedisClient,
            prefix: "jwt_",
            clockTolerance: 30
        });
        CurJWT.init({
            authField: "Token",
            keys: [
                "123",
                "456"
            ],
            algorithm: "HS256",
            expiresIn: "2s",
            issuer: "WEDS",
            subject: "Test",
            clockTolerance: 30,
            store: CurRedisStore,
            payloadAlgorithm: "aes-256-cbc",
            payloadKeys: {
                "0": {
                    key: "01234567890123456789012345678901",
                    iv: "0123456789012345"
                },
                "1": {
                    key: "12345678901234567890123456789012",
                    iv: "1234567890123456"
                }
            }
        });
        console.log("m_keys:" + CurJWT.getKeyIDs());
        let payload = yield CurJWT.setJWT(null, "userID", "0123456789");
        let CurToken = yield CurJWT.generateJWT("TestUser", payload);
        console.log("CurToken:" + CurToken);
        let VerifyToken = yield CurJWT.verifyJWT(CurToken);
        console.log("----------Verify Result----------");
        console.log("VerifyToken:" + JSON.stringify(VerifyToken, null, 4));
        yield Sleep(60000);
        let Token = yield CurJWT.refreshJWT(CurToken);
        console.log("----------Refresh Result----------");
        console.log("decodeToken(Token):" + JSON.stringify(C4JWT_2.decodeToken(Token), null, 4));
        yield CurJWT.revokeJWT(Token);
        VerifyToken = yield CurJWT.verifyJWT(CurToken);
        console.log("----------Verify Result----------");
        console.log("VerifyToken:" + JSON.stringify(VerifyToken, null, 4));
    });
}
function Sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
Test().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=main.js.map