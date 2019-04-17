/// <reference types="ioredis" />
import C4AJV from 'c4ajv';
import { C4Configger } from 'c4configger';
import { C4Logger } from 'c4logger';
import { C4EurekaClient } from "c4eurekaclient";
import { C4RESTFulClient } from "c4restfulclient";
import { C4WebService } from "c4webservice";
import { C4Publisher, C4Subscriber, C4MQ } from 'c4mq';
import C4ApplicationInfo, { AppProfiles } from './C4FrameworkTypes/C4ApplicationInfo';
import { Sequelize } from 'sequelize-typescript';
import Redis = require('ioredis');
import { C4DependencyService } from 'c4apisclient';
export default class C4Framework {
    private m_AJV;
    private m_Configger;
    private m_Logger;
    private m_EurekaClient;
    private m_LoadBalancer;
    private m_RestfulClient;
    private m_WebServices;
    private m_DBClients;
    private m_RedisClients;
    private m_Publishers;
    private m_Subscribers;
    private m_MQConns;
    private m_SubscribeLater;
    private m_DependServices;
    private m_APIs;
    private m_AppInfo;
    private m_Profiles;
    private m_Argv;
    private m_CustomInit;
    private m_CustomLaunch;
    private m_IsDebug;
    private m_Helper;
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
    getDBClients(): Map<string, Sequelize>;
    getRedisClients(): Map<string, Redis.Redis | Redis.Cluster>;
    getPublishers(): Map<string, C4Publisher>;
    getSubscribers(): Map<string, C4Subscriber>;
    getMQConnections(): Map<string, C4MQ>;
    getSubscribeLater(): string[];
    getDependencies(): Map<string, C4DependencyService>;
    getDBClient(name: string): Sequelize | undefined;
    getRedisClient(name: string): Redis.Redis | Redis.Cluster | undefined;
    getPublisher(name: string): C4Publisher | undefined;
    getSubscriber(name: string): C4Subscriber | undefined;
    getMQConnection(name: string): C4MQ | undefined;
    getDependency(name: string): C4DependencyService | undefined;
    getRESTClient(): C4RESTFulClient | null;
    setChecker(ajv: C4AJV): void;
    setConfigger(configger: C4Configger | null): void;
    setLogger(logger: C4Logger): void;
    setAppInfo(appInfo: C4ApplicationInfo): void;
    setRegistryClient(client: C4EurekaClient): void;
    setProfiles(profiles: AppProfiles): void;
    setArgv(argv: any): void;
    setDebug(isDebug: boolean): void;
    setRESTClient(client: C4RESTFulClient): void;
    init(): Promise<void>;
    launch(): Promise<void>;
    done(): void;
}
