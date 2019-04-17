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
};
Object.defineProperty(exports, "__esModule", { value: true });
const C4WebService_1 = __importDefault(require("./C4WebService"));
const ioredis_1 = __importDefault(require("ioredis"));
const c4jwt_1 = require("c4jwt");
const c4accesscontrol_1 = require("c4accesscontrol");
// import Hello from './Controllers/Hello'
var Service;
// var Service2 : C4WebService;
var RedisClient = null;
function SetRouters(app) {
    app.get('/hello', (req, res) => {
        res.json({
            code: 600,
            msg: "Succeed",
            data: {
                Text: "Hello world!"
            }
        });
    });
}
function Test() {
    return __awaiter(this, void 0, void 0, function* () {
        RedisClient = new ioredis_1.default(6379, "10.0.0.95", {
            family: 4,
            connectionName: "TestJWT",
            db: 2
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
        let CurRedisStore = new c4jwt_1.RedisStore();
        yield CurRedisStore.init({
            client: RedisClient,
            prefix: "jwt_",
            clockTolerance: 30
        });
        let RedisCache = new c4accesscontrol_1.ACLRedisCache(RedisClient);
        yield RedisCache.init();
        let DemoCommunicator = new c4accesscontrol_1.ACLDemoCommunicator();
        Service = new C4WebService_1.default();
        // Service2 = new C4WebService();
        yield Service.init({
            name: "TestService",
            host: "localhost",
            port: 9001,
            domain: "localhost",
            serviceType: "http",
            staticPath: "./public",
            uploadPath: "./upload",
            compression: {},
            maxBodySize: "200kb",
            jwtOption: {
                authField: "Token",
                keys: [
                    "123",
                    "456"
                ],
                algorithm: "HS256",
                expiresIn: "2h",
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
            },
            aclOption: {
                disable: false,
                serToken: "Token ZXlKcmFXUWlPaUl3SWl3aWRIbHdJam9pU2xkVUlpd2lZV3huSWpvaVNGTXlOVFlpZlEuZXlKcFlYUWlPakUxTWpnek5UYzRNak1zSW5OMVlpSTZJbXh2WjJsdUlpd2lhWE56SWpvaWQyVmtjeUlzSW5Ca1lYUmhJam9pY0VsRlJsaDJSVzFsVlVSMGRrWm1SbGh1TDNsTE1saFhNR2RrWkRSM04yMTBWRmt3ZEc1YWRrMVRPRTlwZFZSMFFsbE5iRGw1V0ZKVk5VTTVVRm94ZVNJc0luQnJaWGxwWkNJNklqRWlMQ0pxZEdraU9pSm1OalUwWldFeFlpMWxZMlpqTFRSbE1qQXRPVEJpWmkxaFlqbGlNbUk1Wm1GbU5qZ2lmUS5KM0ktNkdkYXhFS2t4QnZCOWd5OTY3alhRX2RJLTlnWXJjR2JaWWlQTV9v",
                aclCache: RedisCache,
                aclCommunicator: DemoCommunicator
            }
            // aclOption : {}
            // Session : {
            //     secret : '123',
            //     resave : false,
            //     saveUninitialized : false
            // }
        }).catch((err) => {
            console.log(err.toString());
        });
        // await Service2.init({
        //     name : "TestService",
        //     host : "localhost",
        //     port : 9002,
        //     domain : "localhost",
        //     serviceType : "http",
        //     staticPath : "./public",
        //     uploadPath : "./upload",
        //     compression : {},
        //     maxBodySize : "200kb"
        // }).catch((err) => {
        //     console.log(err.toString())
        // })
        SetRouters(Service.getApp());
        yield Service.addControllers(['Hello.js', 'StaticRes.js', 'TryACL.js']);
        // await Service.addControllers([ {dir : 'Hello'}]);
        // await Service2.addControllers(['Hello']);
        yield Service.launch().catch((err) => {
            console.log(err);
        });
        // await Service2.launch().catch((err) => {
        //     console.log(err);
        // });
    });
}
Test().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=main.js.map