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
const c4ajv_1 = require("c4ajv");
const c4configger_1 = require("c4configger");
const c4logger_1 = require("c4logger");
const c4eurekaclient_1 = require("c4eurekaclient");
const c4webservice_1 = require("c4webservice");
const C4ApplicationInfo_1 = require("./C4FrameworkTypes/C4ApplicationInfo");
const c4utils_1 = require("c4utils");
const AppInfoUtils_1 = require("./C4FrameworkUtils/AppInfoUtils");
const Process = require("process");
const Path = require("path");
const Yaml = require("js-yaml");
const StripJsonComments = require("strip-json-comments");
const SchemaDir = './schema';
const LoggerConfigPath = './Config/C4Logger.yml';
const ApplicationInfoPath = './.temp/.App.json';
const ConfiggerConfigPath = './Config/Configger.yml';
const DefaultAppConfigPath = './Config/AppConfig/App.yml';
const WaitExitMs = 5000;
// Schema name
const LoggerConfigSechema = "http://weds.com/C4Framework/LoggerConfig.json";
const ApplicationInfoSechema = "http://weds.com/C4Framework/ApplicationInfo.json";
class C4Framework {
    static getConfig() { return c4configger_1.C4Configger.g_Config; }
    constructor(customProcess) {
        this.m_AJV = null;
        this.m_Configger = null;
        this.m_Logger = null;
        this.m_EurekaClient = null;
        this.m_LoadBalancer = null;
        this.m_RestfulClient = null;
        this.m_WebService = new Map();
        this.m_AppInfo = {
            AppName: "",
            Version: "",
            InstanceID: "",
            ConfigLabel: "",
            Labels: [],
            Host: "",
            Port: 0,
            Desc: ""
        };
        this.m_Profiles = "";
        this.m_Argv = {};
        if (customProcess) {
            this.m_CustomInit = customProcess.init || null;
            this.m_CustomLaunch = customProcess.launch || null;
        }
        this.m_IsDebug = false;
    }
    getChecker() { return this.m_AJV; }
    getConfigger() { return this.m_Configger; }
    getLogger() { return this.m_Logger; }
    getAppInfo() { return this.m_AppInfo; }
    getRegistryClient() { return this.m_EurekaClient; }
    getProfiles() { return this.m_Profiles; }
    getArgv() { return this.m_Argv; }
    getWebServices() { return this.m_WebService; }
    // 
    setChecker(ajv) { this.m_AJV = ajv; }
    setConfigger(configger) { this.m_Configger = configger; }
    setLogger(logger) { this.m_Logger = logger; }
    setAppInfo(appInfo) { this.m_AppInfo = appInfo; }
    setRegistryClient(client) { this.m_EurekaClient = client; }
    setProfiles(profiles) { this.m_Profiles = profiles; }
    setArgv(argv) { this.m_Argv = argv; }
    setDebug(isDebug) { this.m_IsDebug = isDebug; }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            //
            C4ApplicationInfo_1.ServiceStatus.Status = "Initializing";
            try {
                this._processArgv();
                yield this._loadSchema();
                yield this._initLogger();
                yield this._loadAppInfo();
                yield this._loadConfig();
                yield this._dumpAppInfo();
                // console.log(JSON.stringify(C4Configger.g_Config, null, 4));
                setInterval(() => {
                    this.m_Logger.info('running...');
                }, 20000);
                yield this._registryService(); // 注册后在status页面更新了状态后才可以使用
                // ------------ //
                this._initDB();
                this._initRedis();
                this._initMQ();
                this._initORM();
                this._initROM();
                this._initLoadBalancer();
                this._initRestfulClient();
                // ------------ //
                yield this._initWebServices();
                // this._AppInit();
                if (this.m_CustomInit && c4utils_1.TypeUtils.isFunction(this.m_CustomInit)) {
                    yield this.m_CustomInit();
                }
                C4ApplicationInfo_1.ServiceStatus.Status = "Starting";
            }
            catch (error) {
                if (this.m_Logger) {
                    this.m_Logger.err(error);
                }
                else {
                    console.error(error);
                }
                AppInfoUtils_1.Sleep(WaitExitMs);
                process.exit(-1);
            }
        });
    }
    launch() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let bRun = true;
                if (this.m_CustomLaunch && c4utils_1.TypeUtils.isFunction(this.m_CustomLaunch)) {
                    bRun = yield this.m_CustomLaunch();
                }
                if (bRun)
                    C4ApplicationInfo_1.ServiceStatus.Status = "Running";
            }
            catch (error) {
                if (this.m_Logger) {
                    this.m_Logger.err(error);
                }
                else {
                    console.error(error);
                }
                AppInfoUtils_1.Sleep(WaitExitMs);
                process.exit(-1);
            }
        });
    }
    done() {
        C4ApplicationInfo_1.ServiceStatus.Status = "Running";
    }
    _processArgv() {
        // 处理启动参数
        // set Application info
        let Argv = Process.argv;
        if (Argv.length <= 2) {
            return;
        }
        for (let i = 2; i < Argv.length; i++) {
            let IsVesrion = Argv[i].match(/^-Version=\d+\.\d+\.\S+$/g);
            let IsInstanceID = Argv[i].match(/^-InstanceID=\S+/g);
            let IsProfiles = Argv[i].match(/^-Profiles=\S+/g);
            let IsDesc = Argv[i].match(/^-Desc=[\S\s]+/g);
            let IsConfigLable = Argv[i].match(/^-ConfigLabel=[\S]+/g);
            let IsLabels = Argv[i].match(/^-Labels=[^,]+\S+,*/g);
            let IsHost = Argv[i].match(/^-Host=[\S]+/g);
            let IsPort = Argv[i].match(/^-Port=[\d]+/g);
            if (IsVesrion || IsInstanceID || IsProfiles || IsDesc
                || IsLabels || IsConfigLable || IsHost || IsPort) {
                if (IsVesrion && this.m_AppInfo.Version === "") {
                    let CurVersion = Argv[i].replace(/^-Version=/g, "");
                    if (CurVersion) {
                        this.m_AppInfo.Version = CurVersion;
                    }
                }
                else if (IsInstanceID && this.m_AppInfo.InstanceID === "") {
                    let CurInstanceID = Argv[i].replace(/^-InstanceID=/g, "");
                    if (CurInstanceID) {
                        this.m_AppInfo.InstanceID = CurInstanceID;
                    }
                }
                else if (IsProfiles && this.m_Profiles === "") {
                    let CurProfiles = Argv[i].replace(/^-Profiles=/g, "");
                    if (CurProfiles
                        && (CurProfiles === "dev"
                            || CurProfiles === "prod"
                            || CurProfiles === "test")) {
                        this.m_Profiles = CurProfiles;
                    }
                }
                else if (IsLabels && this.m_AppInfo.Labels.length === 0) {
                    let CurLabels = Argv[i].replace(/^Labels=/g, "");
                    let Labels = CurLabels.split(',');
                    for (let j = 0; j < Labels.length; j++) {
                        if (Labels[j]
                            && Labels[j] !== "") {
                            this.m_AppInfo.Labels.push(Labels[j]);
                        }
                    }
                }
                else if (IsDesc && this.m_AppInfo.Desc === "") {
                    let CurDesc = Argv[i].replace(/^-Labels=/g, "");
                    if (CurDesc) {
                        this.m_AppInfo.Desc = CurDesc;
                    }
                }
                else if (IsConfigLable && this.m_AppInfo.ConfigLabel === "") {
                    let CurLabel = Argv[i].replace(/^-ConfigLabel=/g, "");
                    if (CurLabel) {
                        this.m_AppInfo.ConfigLabel = CurLabel;
                    }
                }
                else if (IsHost && this.m_AppInfo.Host === "") {
                    let CurHost = Argv[i].replace(/^-Host=/g, "");
                    if (CurHost) {
                        this.m_AppInfo.Host = CurHost;
                    }
                }
                else if (IsPort && this.m_AppInfo.Port === 0) {
                    let CurPort = Argv[i].replace(/^-Port=/g, "");
                    if (CurPort) {
                        this.m_AppInfo.Port = parseInt(CurPort);
                    }
                }
            }
            else {
                let CurArg = Argv[i].split("=");
                if (c4utils_1.TypeUtils.isArray(CurArg)) {
                    if (CurArg.length >= 2) {
                        let Key = CurArg[0];
                        let Value = "";
                        for (let j = 1; j < CurArg.length; j++) {
                            if (j > 1) {
                                Value += "=";
                            }
                            Value += CurArg[j];
                        }
                        this.m_Argv[Key] = Value;
                    }
                    else {
                        this.m_Argv[CurArg[0]] = true;
                    }
                }
            }
        }
    }
    _loadSchema() {
        return __awaiter(this, void 0, void 0, function* () {
            if (null === this.m_AJV) {
                let SchemaPath = Path.join(process.cwd(), SchemaDir);
                this.m_AJV = new c4ajv_1.default();
                yield this.m_AJV.init(SchemaPath);
            }
        });
    }
    _initLogger() {
        return __awaiter(this, void 0, void 0, function* () {
            if (null === this.m_Logger) {
                // 加载日志配置
                let doc = null;
                try {
                    let data = yield c4utils_1.FSP.ReadFile(LoggerConfigPath, {
                        encoding: 'utf8',
                        flag: 'r'
                    });
                    doc = Yaml.safeLoad(data);
                    if (c4utils_1.TypeUtils.isEmptyObj(doc)) {
                        throw new Error("[" + (new Date()).toLocaleString() + "]" + " [C4Framework] Logger config is empty.");
                    }
                }
                catch (error) {
                    console.error("[" + (new Date()).toLocaleString() + "]" + " [C4Framework] Load logger config failed.");
                    console.error(error);
                    AppInfoUtils_1.Sleep(WaitExitMs);
                    process.exit(-1);
                }
                // 校验日志配置
                if (null !== this.m_AJV) {
                    // check config
                    let Res = this.m_AJV.validate(LoggerConfigSechema, doc);
                    if (Res === false) {
                        console.error("[" + (new Date()).toLocaleString() + "]" + " [C4Framework] Invalid logger config file.");
                        process.exit(-1);
                    }
                }
                else {
                    console.warn("[" + (new Date()).toLocaleString() + "]" + ' [C4Framework] JSON checker not init, can not check logger config.');
                }
                // 初始化日志系统
                console.debug("[" + (new Date()).toLocaleString() + "]" + " C4Framework init logger...");
                this.m_Logger = new c4logger_1.C4Logger();
                yield this.m_Logger.init(doc);
                console.debug("[" + (new Date()).toLocaleString() + "]" + " [C4Framework] init logger succeed.");
            }
        });
    }
    _initConfigger() {
        return __awaiter(this, void 0, void 0, function* () {
            if (null === this.m_Configger) {
                let Self = this;
                this.m_Configger = new c4configger_1.C4Configger({
                    AppName: Self.m_AppInfo.AppName,
                    Version: Self.m_AppInfo.Version,
                    host: Self.m_AppInfo.Host,
                    port: Self.m_AppInfo.Port,
                    InstanceID: Self.m_AppInfo.InstanceID,
                    Profiles: "",
                    Label: Self.m_AppInfo.ConfigLabel,
                    Checker: this.m_AJV,
                    ConfigPath: ConfiggerConfigPath
                });
                try {
                    yield this.m_Configger.init();
                }
                catch (error) {
                    this.m_Logger.err(error);
                    AppInfoUtils_1.Sleep(WaitExitMs);
                    process.exit(-1);
                }
            }
        });
    }
    _loadConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            // 初始化Configger
            yield this._initConfigger();
            let ConfiggerLoadType = this.m_Configger.loadType();
            if (ConfiggerLoadType === "Remote") {
                // 远程加载，需要确保ApplicationInfo有效
                let Res = AppInfoUtils_1.ValidateAppInfo(this.m_AJV, ApplicationInfoSechema, this.m_AppInfo);
                if (Res === false) {
                    this.m_Logger.err("Invalid Application Info.");
                    process.exit(-1);
                }
            }
            else if (ConfiggerLoadType !== "Local") {
                this.m_Logger.err("Unknown Configger load type, may configger init failed.");
                AppInfoUtils_1.Sleep(WaitExitMs);
                process.exit(-1);
            }
            yield this.m_Configger.load();
            if (ConfiggerLoadType === "Local") {
                // 本地加载，需要确保ApplicationInfo有效
                let Res = AppInfoUtils_1.ValidateAppInfo(this.m_AJV, ApplicationInfoSechema, this.m_AppInfo);
                if (Res === false) {
                    this.m_Logger.err("Invalid Application Info.");
                    AppInfoUtils_1.Sleep(WaitExitMs);
                    process.exit(-1);
                }
            }
        });
    }
    _loadAppInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            let AppInfo;
            try {
                let Doc = yield c4utils_1.FSP.ReadFile(Path.join(process.cwd(), ApplicationInfoPath), {
                    encoding: 'utf8',
                    flag: 'r'
                });
                AppInfo = JSON.parse(StripJsonComments(Doc));
                // 合并现有的AppInfo，将文件加载的覆盖到启动项上未配置的项目上
                this.m_AppInfo = AppInfoUtils_1.AppInfoMerage(this.m_AppInfo, AppInfo);
            }
            catch (error) {
                this.m_Logger.debug(error);
            }
        });
    }
    _dumpAppInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            let DumpRes = yield AppInfoUtils_1.DumpAppInfo(this.m_AppInfo, c4configger_1.C4ConfigFileType.JSON, ApplicationInfoPath);
            if (DumpRes === false) {
                this.m_Logger.err("Dump Application Info failed.");
                AppInfoUtils_1.Sleep(WaitExitMs);
                process.exit(-1);
            }
        });
    }
    _registryService() {
        return __awaiter(this, void 0, void 0, function* () {
            if (null === this.m_Configger) {
                this.m_Logger.err("Registry service, configger is not init.");
                AppInfoUtils_1.Sleep(WaitExitMs);
                process.exit(-1);
            }
            let EurekaServerConfig = c4configger_1.C4Configger.g_Config["EurekaServer"];
            let EurekaClientConfig = c4configger_1.C4Configger.g_Config["EurekaClient"];
            if (EurekaServerConfig && EurekaClientConfig) {
                // check
                EurekaClientConfig.port = {
                    "$": EurekaClientConfig.port,
                    "@enabled": true
                };
                EurekaClientConfig.dataCenterInfo = {
                    "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
                    name: EurekaClientConfig.dataCenterInfo
                };
                this.m_EurekaClient = new c4eurekaclient_1.C4EurekaClient();
                this.m_EurekaClient.init(EurekaServerConfig, EurekaClientConfig);
                yield this.m_EurekaClient.start();
            }
            // check Dependencies
        });
    }
    _initWebServices() {
        return __awaiter(this, void 0, void 0, function* () {
            // init status 
            if (!this.m_WebService.has("StatusService")) {
                let CurStatusService = new c4webservice_1.C4WebService();
                yield CurStatusService.init({
                    name: "StatusService",
                    host: this.m_AppInfo.Host || c4configger_1.C4Configger.g_Config.EurekaClient.ipAddr || 'localhost',
                    port: this.m_AppInfo.Port || c4configger_1.C4Configger.g_Config.EurekaClient.port["$"] || 9001,
                    serviceType: "http",
                    logger: this.m_Logger
                }).catch((err) => {
                    this.m_Logger.err(err);
                    AppInfoUtils_1.Sleep(WaitExitMs);
                    process.exit(-1);
                });
                yield CurStatusService.addControllers(["StatusController"]);
                this.m_WebService.set("StatusService", CurStatusService);
                yield CurStatusService.launch().catch((err) => {
                    this.m_Logger.err(err);
                });
            }
            // init other webservice
            try {
                for (let i = 0; i < c4configger_1.C4Configger.g_Config.WebServices.length; i++) {
                    let CurWebConfig = c4configger_1.C4Configger.g_Config.WebServices[i];
                    CurWebConfig.logger = this.m_Logger;
                    if (!this.m_WebService.has(CurWebConfig.name)) {
                        let CurService = new c4webservice_1.C4WebService();
                        let Res = yield CurService.init(CurWebConfig).catch((err) => {
                            this.m_Logger.err("Init Web Service %s failed.", CurWebConfig.name);
                            this.m_Logger.err(err);
                            return false;
                        });
                        if (Res === false) {
                            continue;
                        }
                        // bind controller
                        CurService.addControllers(CurWebConfig.controllers);
                        Res = yield CurService.launch().catch((err) => {
                            this.m_Logger.err("Launch Web Service %s failed.", CurWebConfig.name);
                            this.m_Logger.err(err);
                            return false;
                        });
                        if (Res === false) {
                            continue;
                        }
                        this.m_WebService.set(CurWebConfig.name, CurService);
                    }
                    else {
                        this.m_Logger.warn('Web Service %s exist.', CurWebConfig.name);
                    }
                }
            }
            catch (error) {
                this.m_Logger.err(error);
            }
        });
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
exports.default = C4Framework;
//# sourceMappingURL=C4FrameworkNew.js.map