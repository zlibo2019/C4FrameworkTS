import C4AJV from 'c4ajv';
import { C4Configger } from 'c4configger';
import { C4Logger } from 'c4logger';
import { C4EurekaClient } from "c4eurekaclient";
import { C4WebService } from "c4webservice";
import C4ApplicationInfo, { AppProfiles } from './C4FrameworkTypes/C4ApplicationInfo';
export default class C4Framework {
    private m_AJV;
    private m_Configger;
    private m_Logger;
    private m_EurekaClient;
    private m_LoadBalancer;
    private m_RestfulClient;
    private m_WebService;
    private m_AppInfo;
    private m_Profiles;
    private m_Argv;
    private m_CustomInit;
    private m_CustomLaunch;
    private m_IsDebug;
    static getConfig(): any;
    constructor(customProcess?: {
        init: any;
        launch: any;
    });
    getChecker(): C4AJV | null;
    getConfigger(): C4Configger | null;
    getLogger(): C4Logger | null;
    getAppInfo(): C4ApplicationInfo;
    getRegistryClient(): C4EurekaClient | null;
    getProfiles(): AppProfiles;
    getArgv(): any;
    getWebServices(): Map<string, C4WebService>;
    setChecker(ajv: C4AJV): void;
    setConfigger(configger: C4Configger | null): void;
    setLogger(logger: C4Logger): void;
    setAppInfo(appInfo: C4ApplicationInfo): void;
    setRegistryClient(client: C4EurekaClient): void;
    setProfiles(profiles: AppProfiles): void;
    setArgv(argv: any): void;
    setDebug(isDebug: boolean): void;
    init(): Promise<void>;
    launch(): Promise<void>;
    done(): void;
    _processArgv(): void;
    _loadSchema(): Promise<void>;
    _initLogger(): Promise<void>;
    _initConfigger(): Promise<void>;
    _loadConfig(): Promise<void>;
    _loadAppInfo(): Promise<void>;
    _dumpAppInfo(): Promise<void>;
    _registryService(): Promise<void>;
    _initWebServices(): Promise<void>;
    _initRedis(): void;
    _initDB(): void;
    _initMQ(): void;
    _initORM(): void;
    _initROM(): void;
    _initRestfulClient(): void;
    _initLoadBalancer(): void;
}
