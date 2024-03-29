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
// import C4Framework          from '../C4Framework';
// import { ProcessArgvHelper }from './ProcessArgvHelper';
// import { SchemaHelper }     from './SchemaHelper';
// import { LoggerHelper }     from './LoggerHelper';
// import { AppInfoHelper }    from './AppInfoHelper';
// import { ConfiggerHelper }  from './ConfiggerHelper';
// import { DumpAppInfoHelper }from './AppInfoHelper';
// import { RegistryHelper }   from './RegistryHelper';
// import { WebServiceHelper } from './WebServiceHelper';
// import { ORMHelper }        from './ORMHelper';
// import { ROMHelper }        from './ROMHelper';
// import { MQHelper }         from './MQHelper';
// import { LoadBalancerHelper } from './LoadBalancerHelper';
// import { DependenciesHelper, WaitDependenciesReady } from './DependenciesHelper';
// import { RESTClientHelper } from './RESTClientHelper';
const c4configger_1 = require("c4configger");
const c4utils_1 = require("c4utils");
const FSPromise_1 = require("c4utils/src/FSPromise");
const s_DefaultHelpersConfigPath = './Config/C4Helpers.yml';
const s_HelpersLoadPath = './out/C4Helpers/';
// export function C4Helper() {
//     return {
//         'ProcessArgv'       : ProcessArgvHelper,
//         "LoadSechma"        : SchemaHelper,
//         "InitLogger"        : LoggerHelper,
//         "LoadAppInfo"       : AppInfoHelper,
//         "LoadConfig"        : ConfiggerHelper,
//         "DumpAppInfo"       : DumpAppInfoHelper,
//         "RESTClient"        : RESTClientHelper,
//         "ORMHelper"         : ORMHelper,
//         "ROMHelper"         : ROMHelper,
//         "MQHelper"          : MQHelper,
//         'RegistryService'   : RegistryHelper,
//         'Dependencies'      : DependenciesHelper,
//         'LoadBalancerHelper': LoadBalancerHelper,
//         'InitWebServices'   : WebServiceHelper,
//         'WaitDependenciesReady' : WaitDependenciesReady
//     }
// }
function C4InitFlow(helpersName) {
    return __awaiter(this, void 0, void 0, function* () {
        // 初始化一个Config的LocalLoader
        let CurLoaclLoader = new c4configger_1.C4LocalLoader();
        CurLoaclLoader.init();
        CurLoaclLoader.registerLoader('.yml', () => {
            return new c4configger_1.C4YamlLoader();
        });
        CurLoaclLoader.registerLoader('.yaml', () => {
            return new c4configger_1.C4YamlLoader();
        });
        CurLoaclLoader.registerLoader('.json', () => {
            return new c4configger_1.C4JSONLoader();
        });
        let TempConfigInfo = {
            ConfigDir: {
                Path: "",
                main: ""
            },
            AppName: "",
            Version: "",
            host: "",
            port: 0,
            InstanceID: "",
            Profiles: "",
            Macros: []
        };
        let HelpersName = yield CurLoaclLoader.load(process.cwd(), s_DefaultHelpersConfigPath, TempConfigInfo).catch((err) => {
            console.log(err);
            return null;
        });
        if (!c4utils_1.TypeUtils.isArray(HelpersName)
            || (HelpersName.length > 0 && !c4utils_1.TypeUtils.isString(HelpersName[0]))) {
            console.log("C4Helper get a bad format config.");
            process.exit(-1);
        }
        if (c4utils_1.TypeUtils.isEmptyArray(HelpersName)) {
            console.warn("Warning : C4Helper get a empty config.");
        }
        for (let i = 0; i < HelpersName.length; i++) {
            helpersName.push(HelpersName[i]);
        }
        let Helpers = [];
        try {
            Helpers = FSPromise_1.getModulesEx(HelpersName, [s_HelpersLoadPath], "", true);
        }
        catch (error) {
            console.log(error);
            process.exit(-1);
        }
        return Helpers;
        // return [
        //     'ProcessArgv',              // 处理输入参数
        //     "LoadSechma",               // 加载JSON Sechma
        //     "InitLogger",               // 初始化Logger
        //     "LoadAppInfo",              // 加载App Info
        //     "LoadConfig",               // 加载配置
        //     "DumpAppInfo",              // Dump App Info
        //     "RESTClient",               // 初始化RESTFul Client
        //     "ORMHelper",                // 初始化ORM
        //     "ROMHelper",                // 初始化Redis及ROM
        //     "MQHelper",                 // 初始化MQ
        //     'RegistryService',          // 向发现与注册中心注册自己
        //     'Dependencies',             // 等待依赖的服务上线（后面还要等待所有服务Ready）
        //     'LoadBalancerHelper',       // 初始化负载均衡器
        //     'InitWebServices',          // 初始化自己的WebService
        //     'WaitDependenciesReady'     // 等待所有依赖的服务Ready
        // ]
    });
}
exports.C4InitFlow = C4InitFlow;
//# sourceMappingURL=C4Helper.js.map