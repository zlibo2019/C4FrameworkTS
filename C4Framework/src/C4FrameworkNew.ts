import C4AJV        from 'c4ajv';
import { C4Configger, C4JSONLoader, C4ConfigInfo, C4ConfigFileType } from 'c4configger';
import { C4Logger } from 'c4logger';
import { C4EurekaClient } from "c4eurekaclient";
import { C4LoadBalancer } from "c4loadbalancer";
import { C4RESTFulClient } from "c4restfulclient";
import { C4WebService } from "c4webservice";
import C4ApplicationInfo, { AppProfiles, ServiceStatus } from './C4FrameworkTypes/C4ApplicationInfo';
import { TypeUtils, FSP } from "c4utils";
import { AppInfoMerage, ValidateAppInfo, DumpAppInfo, Sleep } from "./C4FrameworkUtils/AppInfoUtils";

import Process  = require('process');
import Path     = require('path');
import Yaml     = require('js-yaml');
import StripJsonComments    = require('strip-json-comments');



const SchemaDir             = './schema';
const LoggerConfigPath      = './Config/C4Logger.yml';
const ApplicationInfoPath   = './.temp/.App.json';
const ConfiggerConfigPath   = './Config/Configger.yml';
const DefaultAppConfigPath  = './Config/AppConfig/App.yml';

const WaitExitMs            = 5000;

// Schema name
const LoggerConfigSechema   = "http://weds.com/C4Framework/LoggerConfig.json";
const ApplicationInfoSechema= "http://weds.com/C4Framework/ApplicationInfo.json";

export default class C4Framework {
    //
    private m_AJV       : C4AJV | null;         // 验证器
    private m_Configger : C4Configger | null;   // 配置加载器
    private m_Logger    : C4Logger | null;      // 日志

    private m_EurekaClient : C4EurekaClient | null;     // eureka客户端

    private m_LoadBalancer : C4LoadBalancer | null;     // 负载均衡器（多个）
    private m_RestfulClient: C4RESTFulClient | null;    // rest 客户端（多个）
    private m_WebService : Map<string, C4WebService>;         // webservice（多个）

    private m_AppInfo : C4ApplicationInfo;              // App Info
    private m_Profiles : AppProfiles;                   // App Profiles

    private m_Argv      : any;    // 其他启动参数

    private m_CustomInit    : any;      // 自定义初始化过程
    private m_CustomLaunch  : any;      // 自定义启动过程

    private m_IsDebug       : boolean;

    static getConfig()         { return C4Configger.g_Config; }

    constructor(customProcess ?: {
        init : any,
        launch : any
    }) {
        this.m_AJV          = null;
        this.m_Configger    = null;
        this.m_Logger       = null;
        this.m_EurekaClient = null;
        this.m_LoadBalancer = null;
        this.m_RestfulClient= null;
        this.m_WebService   = new Map();
        this.m_AppInfo      = {
            AppName : "",
            Version : "",
            InstanceID : "",
            ConfigLabel : "",
            Labels : [],
            Host : "",
            Port : 0,
            Desc : ""
        };

        this.m_Profiles     = "";
        this.m_Argv         = {};
        if (customProcess) {
            this.m_CustomInit   = customProcess.init || null;
            this.m_CustomLaunch = customProcess.launch || null;
        }

        this.m_IsDebug  = false;
    }

    getChecker()        { return this.m_AJV; }
    getConfigger()      { return this.m_Configger; }
    getLogger()         { return this.m_Logger; }
    getAppInfo()        { return this.m_AppInfo; }
    getRegistryClient() { return this.m_EurekaClient; }
    getProfiles()       { return this.m_Profiles; }
    getArgv()           { return this.m_Argv; }
    getWebServices()    { return this.m_WebService; }

    // 
    setChecker(ajv : C4AJV)                     { this.m_AJV            = ajv; }
    setConfigger(configger : C4Configger | null){ this.m_Configger      = configger; }
    setLogger(logger : C4Logger)                { this.m_Logger         = logger; }
    setAppInfo(appInfo : C4ApplicationInfo)     { this.m_AppInfo        = appInfo; }
    setRegistryClient(client : C4EurekaClient)  { this.m_EurekaClient   = client; }
    setProfiles(profiles : AppProfiles)         { this.m_Profiles       = profiles; }
    setArgv(argv : any)                         { this.m_Argv           = argv; }
    setDebug(isDebug : boolean)                 { this.m_IsDebug        = isDebug; }

    async init() {
        //
        ServiceStatus.Status = "Initializing";
        try {
            this._processArgv();
            await this._loadSchema();
            await this._initLogger();
            await this._loadAppInfo();
            await this._loadConfig();
            await this._dumpAppInfo();
    
            // console.log(JSON.stringify(C4Configger.g_Config, null, 4));
    
            setInterval(() => {
                (<C4Logger>this.m_Logger).info('running...')
            }, 20000)
    
            await this._registryService();            // 注册后在status页面更新了状态后才可以使用
    
            // ------------ //
            this._initDB();
            this._initRedis();
            this._initMQ();
            this._initORM();
            this._initROM();
            this._initLoadBalancer();
            this._initRestfulClient();
            // ------------ //
    
            await this._initWebServices();
    
            // this._AppInit();
            if (this.m_CustomInit && TypeUtils.isFunction(this.m_CustomInit)) {
                await this.m_CustomInit();
            }
            ServiceStatus.Status = "Starting";
        } catch (error) {
            if (this.m_Logger) {
                this.m_Logger.err(error);
            } else {
                console.error(error);
            }
            Sleep(WaitExitMs);
            process.exit(-1);
        }
    }

    async launch() {
        try {
            let bRun = true;
            if (this.m_CustomLaunch && TypeUtils.isFunction(this.m_CustomLaunch)) {
                bRun = await this.m_CustomLaunch();
            }
            if (bRun)
                ServiceStatus.Status = "Running";
        } catch (error) {
            if (this.m_Logger) {
                this.m_Logger.err(error);
            } else {
                console.error(error);
            }
            Sleep(WaitExitMs);
            process.exit(-1);
        }
    }

    done() {
        ServiceStatus.Status = "Running";
    }

    _processArgv() {
        // 处理启动参数
        // set Application info
        let Argv = Process.argv;
        if (Argv.length <= 2) {
            return;
        }

        for (let i = 2; i < Argv.length; i++) {
            let IsVesrion       = Argv[i].match(/^-Version=\d+\.\d+\.\S+$/g);
            let IsInstanceID    = Argv[i].match(/^-InstanceID=\S+/g);
            let IsProfiles      = Argv[i].match(/^-Profiles=\S+/g);
            let IsDesc          = Argv[i].match(/^-Desc=[\S\s]+/g);
            let IsConfigLable   = Argv[i].match(/^-ConfigLabel=[\S]+/g);
            let IsLabels        = Argv[i].match(/^-Labels=[^,]+\S+,*/g);
            let IsHost          = Argv[i].match(/^-Host=[\S]+/g);
            let IsPort          = Argv[i].match(/^-Port=[\d]+/g);
            if (IsVesrion || IsInstanceID || IsProfiles || IsDesc
                || IsLabels || IsConfigLable || IsHost || IsPort) {
                if (IsVesrion && this.m_AppInfo.Version === "") {
                    let CurVersion = Argv[i].replace(/^-Version=/g, "");
                    if (CurVersion) {
                        this.m_AppInfo.Version  = CurVersion;
                    }
                } else if (IsInstanceID && this.m_AppInfo.InstanceID === "") {
                    let CurInstanceID = Argv[i].replace(/^-InstanceID=/g, "");
                    if (CurInstanceID) {
                        this.m_AppInfo.InstanceID   = CurInstanceID;
                    }
                } else if (IsProfiles && this.m_Profiles === "") {
                    let CurProfiles = Argv[i].replace(/^-Profiles=/g, "");
                    if (CurProfiles
                        && (CurProfiles === "dev"
                        || CurProfiles === "prod"
                        || CurProfiles === "test")) {
                        this.m_Profiles = CurProfiles;
                    }
                } else if (IsLabels && this.m_AppInfo.Labels.length === 0) {
                    let CurLabels   = Argv[i].replace(/^Labels=/g, "");
                    let Labels      = CurLabels.split(',');
                    for (let j = 0; j < Labels.length; j++) {
                        if (Labels[j]
                            && Labels[j] !== "") {
                            this.m_AppInfo.Labels.push(Labels[j]);
                        }
                    }
                } else if (IsDesc && this.m_AppInfo.Desc === "") {
                    let CurDesc = Argv[i].replace(/^-Labels=/g, "");
                    if (CurDesc) {
                        this.m_AppInfo.Desc = CurDesc;
                    }
                } else if (IsConfigLable && this.m_AppInfo.ConfigLabel === "") {
                    let CurLabel = Argv[i].replace(/^-ConfigLabel=/g, "");
                    if (CurLabel) {
                        this.m_AppInfo.ConfigLabel  = CurLabel;
                    }
                } else if (IsHost && this.m_AppInfo.Host === "") {
                    let CurHost = Argv[i].replace(/^-Host=/g, "");
                    if (CurHost) {
                        this.m_AppInfo.Host = CurHost;
                    }
                } else if (IsPort && this.m_AppInfo.Port === 0) {
                    let CurPort = Argv[i].replace(/^-Port=/g, "");
                    if (CurPort) {
                        this.m_AppInfo.Port = parseInt(CurPort);
                    }
                }
            } else {
                let CurArg = Argv[i].split("=");
                if (TypeUtils.isArray(CurArg)) {
                    if (CurArg.length >= 2) {
                        let Key = CurArg[0];
                        let Value = "";
                        for (let j = 1; j < CurArg.length; j++) {
                            if (j > 1) {
                                Value += "="
                            }
                            Value += CurArg[j];
                        }
                        this.m_Argv[Key]    = Value;
                    } else {
                        this.m_Argv[CurArg[0]] = true;
                    }
                }
            }
        }
    }

    async _loadSchema() {
        if (null === this.m_AJV) {
            let SchemaPath = Path.join(process.cwd(), SchemaDir);
            this.m_AJV  = new C4AJV();
            await this.m_AJV.init(SchemaPath);
        }
    }

    async _initLogger() {
        if (null === this.m_Logger) {
            // 加载日志配置
            let doc = null;
            try {
                let data = await FSP.ReadFile(LoggerConfigPath, {
                    encoding : 'utf8',
                    flag : 'r'
                });

                doc = Yaml.safeLoad(<string>data);
                if (TypeUtils.isEmptyObj(doc)) {
                    throw new Error("[" + (new Date()).toLocaleString() + "]" + " [C4Framework] Logger config is empty.");
                }
            } catch (error) {
                console.error("[" + (new Date()).toLocaleString() + "]" + " [C4Framework] Load logger config failed.");
                console.error(error);
                Sleep(WaitExitMs);
                process.exit(-1);
            }

            // 校验日志配置
            if (null !== this.m_AJV) {
                // check config
                let Res = this.m_AJV.validate(LoggerConfigSechema, <object>doc);
                if (Res === false) {
                    console.error("[" + (new Date()).toLocaleString() + "]" + " [C4Framework] Invalid logger config file.");
                    process.exit(-1);
                }
            } else {
                console.warn("[" + (new Date()).toLocaleString() + "]" + ' [C4Framework] JSON checker not init, can not check logger config.');
            }

            // 初始化日志系统
            console.debug("[" + (new Date()).toLocaleString() + "]" + " C4Framework init logger...");
            this.m_Logger   = new C4Logger();
            await this.m_Logger.init(<any>doc);
            console.debug("[" + (new Date()).toLocaleString() + "]" + " [C4Framework] init logger succeed.");
        }
    }

    async _initConfigger() {
        if (null === this.m_Configger) {
            let Self = this;
            this.m_Configger    = new C4Configger({
                AppName : Self.m_AppInfo.AppName,
                Version : Self.m_AppInfo.Version,
                host : Self.m_AppInfo.Host,
                port : Self.m_AppInfo.Port,
                InstanceID : Self.m_AppInfo.InstanceID,
                Profiles : "",
                Label : Self.m_AppInfo.ConfigLabel,
                Checker : <C4AJV>this.m_AJV,
                ConfigPath : ConfiggerConfigPath
            });

            try {
                await this.m_Configger.init();
            } catch (error) {
                (<C4Logger>this.m_Logger).err(error);
                Sleep(WaitExitMs);
                process.exit(-1);
            }
        }
    }

    async _loadConfig() {
        // 初始化Configger
        await this._initConfigger();
        let ConfiggerLoadType = (<C4Configger>this.m_Configger).loadType();
        if (ConfiggerLoadType === "Remote") {
            // 远程加载，需要确保ApplicationInfo有效
            let Res = ValidateAppInfo(<C4AJV>this.m_AJV, ApplicationInfoSechema, this.m_AppInfo);
            if (Res === false) {
                (<C4Logger>this.m_Logger).err("Invalid Application Info.");
                process.exit(-1);
            }
        } else if (ConfiggerLoadType !== "Local") {
            (<C4Logger>this.m_Logger).err("Unknown Configger load type, may configger init failed.");
            Sleep(WaitExitMs);
            process.exit(-1);
        }

        await (<C4Configger>this.m_Configger).load();

        if (ConfiggerLoadType === "Local") {
            // 本地加载，需要确保ApplicationInfo有效
            let Res = ValidateAppInfo(<C4AJV>this.m_AJV, ApplicationInfoSechema, this.m_AppInfo);
            if (Res === false) {
                (<C4Logger>this.m_Logger).err("Invalid Application Info.");
                Sleep(WaitExitMs);
                process.exit(-1);
            }
        }
    }

    async _loadAppInfo() {
        let AppInfo : C4ApplicationInfo;
        try {
            let Doc = await FSP.ReadFile(Path.join(process.cwd(), ApplicationInfoPath), {
                encoding : 'utf8',
                    flag : 'r'
            });

            AppInfo = JSON.parse(StripJsonComments(<string>Doc));
            // 合并现有的AppInfo，将文件加载的覆盖到启动项上未配置的项目上
            this.m_AppInfo = AppInfoMerage(this.m_AppInfo,  AppInfo);

        } catch (error) {
            (<C4Logger>this.m_Logger).debug(error);
        }
    }

    async _dumpAppInfo() {
        let DumpRes = await DumpAppInfo(this.m_AppInfo, C4ConfigFileType.JSON, ApplicationInfoPath);
        if (DumpRes === false) {
            (<C4Logger>this.m_Logger).err("Dump Application Info failed.");
            Sleep(WaitExitMs);
            process.exit(-1);
        }
    }

    async _registryService() {
        if (null === this.m_Configger) {
            (<C4Logger>this.m_Logger).err("Registry service, configger is not init.");
            Sleep(WaitExitMs);
            process.exit(-1);
        }

        let EurekaServerConfig = C4Configger.g_Config["EurekaServer"];
        let EurekaClientConfig = C4Configger.g_Config["EurekaClient"];
        if (EurekaServerConfig && EurekaClientConfig) {
            // check
            EurekaClientConfig.port = {
                "$" : EurekaClientConfig.port,
                "@enabled" : true
            };
            EurekaClientConfig.dataCenterInfo = {
                "@class" : "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
                name : EurekaClientConfig.dataCenterInfo
            };
            this.m_EurekaClient = new C4EurekaClient();
            this.m_EurekaClient.init(EurekaServerConfig, EurekaClientConfig);
            await this.m_EurekaClient.start();
        }

        // check Dependencies
    }

    async _initWebServices() {
        // init status 
        if (!this.m_WebService.has("StatusService")) {
            let CurStatusService = new C4WebService();
            await CurStatusService.init({
                name : "StatusService",
                host : this.m_AppInfo.Host || C4Configger.g_Config.EurekaClient.ipAddr || 'localhost',
                port : this.m_AppInfo.Port || C4Configger.g_Config.EurekaClient.port["$"] || 9001,
                serviceType : "http",
                logger : this.m_Logger
            }).catch((err) => {
                (<C4Logger>this.m_Logger).err(err);
                Sleep(WaitExitMs);
                process.exit(-1);
            });

            await CurStatusService.addControllers(["StatusController"]);
            this.m_WebService.set("StatusService", CurStatusService);
            await CurStatusService.launch().catch((err) => {
                (<C4Logger>this.m_Logger).err(err);
            });
        }

        // init other webservice
        try {
            for (let i = 0; i < C4Configger.g_Config.WebServices.length; i++) {
                let CurWebConfig = C4Configger.g_Config.WebServices[i];
                CurWebConfig.logger = this.m_Logger;
                if (!this.m_WebService.has(CurWebConfig.name)) {
                    let CurService = new C4WebService();
                    let Res = await CurService.init(CurWebConfig).catch((err) => {
                        (<C4Logger>this.m_Logger).err("Init Web Service %s failed.", CurWebConfig.name);
                        (<C4Logger>this.m_Logger).err(err);
                        return false;
                    });
                    if (Res === false) {
                        continue;
                    }
                    // bind controller
                    CurService.addControllers(CurWebConfig.controllers);
                    Res = await CurService.launch().catch((err) => {
                        (<C4Logger>this.m_Logger).err("Launch Web Service %s failed.", CurWebConfig.name);
                        (<C4Logger>this.m_Logger).err(err);
                        return false;
                    });
                    if (Res === false) {
                        continue;
                    }
                    this.m_WebService.set(CurWebConfig.name, CurService);
                } else {
                    (<C4Logger>this.m_Logger).warn('Web Service %s exist.', CurWebConfig.name);
                }
            }
        } catch (error) {
            (<C4Logger>this.m_Logger).err(error);
        }
    }

    _initRedis() {
        //
    }

    _initDB() {
        //
    }

    _initMQ() {
        //
    }

    _initORM() {
        //
    }

    _initROM() {
        //
    }

    _initRestfulClient() {
        //
    }

    _initLoadBalancer() {
        //
    }
}
