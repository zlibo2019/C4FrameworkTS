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
const C4EurekaClient_1 = __importDefault(require("./C4EurekaClient"));
function Launch() {
    return __awaiter(this, void 0, void 0, function* () {
        let Client = new C4EurekaClient_1.default();
        let Client2 = new C4EurekaClient_1.default();
        Client.init({
            fetchRegistry: true,
            host: /*"10.0.0.95"*/ /*"127.0.0.1"*/ "10.0.0.102",
            port: /*8761*/ /*1111*/ 30009,
            servicePath: "/eureka/apps/",
            heartbeatInterval: 5000,
            registryFetchInterval: 5000,
        }, {
            instanceId: "Node_SystemStatsService-02",
            app: "Node_SystemStatsService",
            hostName: "Mac",
            ipAddr: "10.1.0.18",
            statusPageUrl: "http://10.1.0.18:10010/SystemStatsServiceControler",
            port: {
                "$": 10010,
                "@enabled": true
            },
            vipAddress: "Node_SystemStatsService",
            dataCenterInfo: {
                "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
                name: "MyOwn"
            },
            leaseInfo: {
                renewalIntervalInSecs: 5,
                durationInSecs: 15
            },
            countryId: 86,
            metadata: {
                // "@class" : "java.util.Collections$EmptyMap",
                test: { a: '123', b: 123 },
                test2: "123"
            }
        });
        Client2.init({
            fetchRegistry: true,
            host: /*"10.0.0.95"*/ /*"127.0.0.1"*/ "10.0.0.102",
            port: /*8761*/ /*1111*/ 30009,
            servicePath: "/eureka/apps/",
            heartbeatInterval: 5000,
            registryFetchInterval: 5000,
        }, {
            instanceId: "Node_SystemStatsService-01",
            app: "Node_SystemStatsService",
            hostName: "Mac1",
            ipAddr: "10.1.0.19",
            statusPageUrl: "http://10.1.0.19:10010/SystemStatsServiceControler",
            port: {
                "$": 10010,
                "@enabled": true
            },
            vipAddress: "Node_SystemStatsService00",
            dataCenterInfo: {
                "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
                name: "MyOwn"
            },
            leaseInfo: {
                renewalIntervalInSecs: 5,
                durationInSecs: 15
            },
            countryId: 86,
            metadata: {
                // "@class" : "java.util.Collections$EmptyMap",
                test: { a: '123', b: 123 },
                test2: "123"
            }
        });
        yield Client.start();
        yield Client2.start();
        let Begin = (new Date()).getTime();
        console.log('1');
        yield Client.waitRegistered(["Node_SystemStatsService"]);
        console.log((new Date()).getTime() - Begin);
        // await new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve();
        //     }, 5000);
        // })
        console.log(Client.getInstancesByAppId("Node_SystemStatsService"));
        console.log(JSON.stringify(Client.getInstancesByAppId("Node_SystemStatsService"), null, 4));
        console.log('');
        console.log((Client.getInstancesByAppId("Node_SystemStatsService")[0]).leaseInfo);
        console.log((Client.getInstancesByVipAddress("Node_SystemStatsService")[0]).leaseInfo);
        console.log(JSON.stringify(Client.getInstancesByAppId("Node_SystemStatsService"), null, 4));
        setInterval(() => {
            console.log('Alive');
            console.log((Client.getInstancesByAppId("Node_SystemStatsService")[0]).leaseInfo);
            console.log(JSON.stringify(Client.getInstancesByAppId("Node_SystemStatsService"), null, 4));
        }, 10000);
    });
}
Launch();
// [
//     {
//         "instanceId": "Node_SystemStatsService-02",
//         "hostName": "Mac",
//         "app": "NODE_SYSTEMSTATSSERVICE",
//         "ipAddr": "10.1.0.18",
//         "status": "UP",
//         "overriddenstatus": "UNKNOWN",
//         "port": {
//             "$": 10010,
//             "@enabled": "true"
//         },
//         "securePort": {
//             "$": 7002,
//             "@enabled": "false"
//         },
//         "countryId": 86,
//         "dataCenterInfo": {
//             "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
//             "name": "MyOwn"
//         },
//         "leaseInfo": {
//             "renewalIntervalInSecs": 5,
//             "durationInSecs": 15,
//             "registrationTimestamp": 1523494892967,
//             "lastRenewalTimestamp": 1523496037901,
//             "evictionTimestamp": 0,
//             "serviceUpTimestamp": 1523494892967
//         },
//         "metadata": {
//             "test2": "123",
//             "test": "1"
//         },
//         "statusPageUrl": "http://10.1.0.18:10010/SystemStatsServiceControler",
//         "vipAddress": "Node_SystemStatsService",
//         "isCoordinatingDiscoveryServer": "false",
//         "lastUpdatedTimestamp": "1523494892967",
//         "lastDirtyTimestamp": "1523494892960",
//         "actionType": "ADDED"
//     },
//     {
//         "instanceId": "Node_SystemStatsService-01",
//         "hostName": "Mac",
//         "app": "NODE_SYSTEMSTATSSERVICE",
//         "ipAddr": "10.1.0.18",
//         "status": "UP",
//         "overriddenstatus": "UNKNOWN",
//         "port": {
//             "$": 10011,
//             "@enabled": "true"
//         },
//         "securePort": {
//             "$": 7002,
//             "@enabled": "false"
//         },
//         "countryId": 86,
//         "dataCenterInfo": {
//             "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
//             "name": "MyOwn"
//         },
//         "leaseInfo": {
//             "renewalIntervalInSecs": 5,
//             "durationInSecs": 15,
//             "registrationTimestamp": 1523495130586,
//             "lastRenewalTimestamp": 1523496045955,
//             "evictionTimestamp": 0,
//             "serviceUpTimestamp": 1523494609269
//         },
//         "metadata": {
//             "test2": "123",
//             "test": "1"
//         },
//         "statusPageUrl": "http://10.1.0.18:10011/SystemStatsServiceControler",
//         "vipAddress": "Node_SystemStatsService",
//         "isCoordinatingDiscoveryServer": "false",
//         "lastUpdatedTimestamp": "1523495130586",
//         "lastDirtyTimestamp": "1523495130580",
//         "actionType": "ADDED"
//     }
// ]
//# sourceMappingURL=main.js.map