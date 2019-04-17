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
const c4apisclient_1 = require("c4apisclient");
/**
 * 威尔公司账户微服务系统
 * @class AppGateway
 * @param {(string)} [domainOrOptions] - The project domain.
 */
class AppGateway extends c4apisclient_1.C4APIsClient {
    /**
     *
     * @param key 实例ID
     * @param domain 指定域名
     * @param logger 日志对象
     */
    constructor(key, domain, logger) {
        super(key);
        this.logger = logger;
    }
    /**
     * 获取当前可用的服务的Host和Port
     * @param key 当前实例的ID
     */
    getDomain(key) {
        if (this.m_Service) {
            return this.m_Service.getDomain(key);
        }
        return "";
    }
    request(method, url, headers, qs, body, form, formData, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.m_Logger) {
                this.m_Logger.info(`Call ${method} ${url}`);
            }
            if (this.m_RESTClient === null) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('RESTFulClient not init.') : this.m_Logger.error('RESTFulClient not init.');
                    return null;
                }
                else {
                    throw new Error('RESTFulClient not init.');
                }
            }
            let curRequestOp = {};
            if (qs) {
                curRequestOp.qs = qs;
            }
            if (method.toLowerCase() !== "get" && body) {
                curRequestOp.body = body;
            }
            if (formData) {
                curRequestOp.formData = formData;
            }
            else if (form) {
                curRequestOp.form = form;
            }
            if (fileName) {
                curRequestOp.downloadFileName = fileName;
            }
            return yield this.m_RESTClient.request(url, method.toLowerCase(), curRequestOp).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    addUsingPUTURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/account/add';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * 新增应用账户接口
     * @method
     * @name AppGateway#addUsingPUT
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    addUsingPUT(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/app/account/add';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            downloadFileName = parameters.$downloadFileName;
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json,application/xml';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters['req'] !== undefined) {
                body = parameters['req'];
            }
            if (parameters['req'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: req') : this.m_Logger.error('Missing required  parameter: req');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: req');
                }
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('PUT', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    deleteUsingDELETEURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/account/delete/{app_account}';
        path = path.replace('{app_account}', `${parameters['appAccount']}`);
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * 删除应用账户接口
     * @method
     * @name AppGateway#deleteUsingDELETE
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {string} appAccount - 应用账户
     */
    deleteUsingDELETE(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/app/account/delete/{app_account}';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            path = path.replace('{app_account}', `${parameters['appAccount']}`);
            if (parameters['appAccount'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: appAccount') : this.m_Logger.error('Missing required  parameter: appAccount');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: appAccount');
                }
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('DELETE', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    loginUsingPOSTURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/account/login';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * 应用账户登陆接口
     * @method
     * @name AppGateway#loginUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    loginUsingPOST(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/app/account/login';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters['req'] !== undefined) {
                body = parameters['req'];
            }
            if (parameters['req'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: req') : this.m_Logger.error('Missing required  parameter: req');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: req');
                }
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    modifyUsingPOSTURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/account/modify';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * 修改应用账户信息接口
     * @method
     * @name AppGateway#modifyUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    modifyUsingPOST(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/app/account/modify';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters['req'] !== undefined) {
                body = parameters['req'];
            }
            if (parameters['req'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: req') : this.m_Logger.error('Missing required  parameter: req');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: req');
                }
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    modifyPassUsingPOSTURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/account/modify_pass';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * 修改应用账户密码接口
     * @method
     * @name AppGateway#modifyPassUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    modifyPassUsingPOST(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/app/account/modify_pass';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters['req'] !== undefined) {
                body = parameters['req'];
            }
            if (parameters['req'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: req') : this.m_Logger.error('Missing required  parameter: req');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: req');
                }
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    searchUsingPOSTURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/account/search';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * 可排序字段 id,app_no,basic_acc_no,app_account,inserted_dt,updated_dt,name,email
     * @method
     * @name AppGateway#searchUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - req
     */
    searchUsingPOST(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/app/account/search';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters['req'] !== undefined) {
                body = parameters['req'];
            }
            if (parameters['req'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: req') : this.m_Logger.error('Missing required  parameter: req');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: req');
                }
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    searchOneUsingPOSTURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/account/searchone';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * 查询某个应用账户接口
     * @method
     * @name AppGateway#searchOneUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - req
     */
    searchOneUsingPOST(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/app/account/searchone';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters['req'] !== undefined) {
                body = parameters['req'];
            }
            if (parameters['req'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: req') : this.m_Logger.error('Missing required  parameter: req');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: req');
                }
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    addUsingPUT_1URL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/role/add';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * 新增应用角色接口
     * @method
     * @name AppGateway#addUsingPUT_1
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    addUsingPUT_1(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/app/role/add';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters['req'] !== undefined) {
                body = parameters['req'];
            }
            if (parameters['req'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: req') : this.m_Logger.error('Missing required  parameter: req');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: req');
                }
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('PUT', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    modifyUsingPOST_1URL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/role/modify';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * 修改应用角色接口
     * @method
     * @name AppGateway#modifyUsingPOST_1
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    modifyUsingPOST_1(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/app/role/modify';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters['req'] !== undefined) {
                body = parameters['req'];
            }
            if (parameters['req'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: req') : this.m_Logger.error('Missing required  parameter: req');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: req');
                }
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    searchUsingPOST_1URL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/role/search';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * 可排序字段 id,role_name;access,is_enable,inserted_dt,updated_dt
     * @method
     * @name AppGateway#searchUsingPOST_1
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - req
     */
    searchUsingPOST_1(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/app/role/search';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters['req'] !== undefined) {
                body = parameters['req'];
            }
            if (parameters['req'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: req') : this.m_Logger.error('Missing required  parameter: req');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: req');
                }
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    searchByRoleNosUsingGETURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/role/search_by_role_nos/{role_nos}';
        path = path.replace('{role_nos}', `${parameters['roleNos']}`);
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * 根据 ;role_no1;role_no2; 形式的字符串查询权限
     * @method
     * @name AppGateway#searchByRoleNosUsingGET
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {string} roleNos - role_nos
     */
    searchByRoleNosUsingGET(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/app/role/search_by_role_nos/{role_nos}';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            path = path.replace('{role_nos}', `${parameters['roleNos']}`);
            if (parameters['roleNos'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: roleNos') : this.m_Logger.error('Missing required  parameter: roleNos');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: roleNos');
                }
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('GET', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    searchOneUsingPOST_1URL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/role/searchone';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * 查询某个应用角色接口
     * @method
     * @name AppGateway#searchOneUsingPOST_1
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - req
     */
    searchOneUsingPOST_1(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/app/role/searchone';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters['req'] !== undefined) {
                body = parameters['req'];
            }
            if (parameters['req'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: req') : this.m_Logger.error('Missing required  parameter: req');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: req');
                }
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    addResourcesUsingPOSTURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/auth/addResources';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * 增加资源矩阵
     * @method
     * @name AppGateway#addResourcesUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} param - param
     */
    addResourcesUsingPOST(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/auth/addResources';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters['param'] !== undefined) {
                body = parameters['param'];
            }
            if (parameters['param'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: param') : this.m_Logger.error('Missing required  parameter: param');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: param');
                }
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    addRoleMatrixUsingPOSTURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/auth/addRoleMatrix';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * 增加角色资源矩阵
     * @method
     * @name AppGateway#addRoleMatrixUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} param - param
     */
    addRoleMatrixUsingPOST(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/auth/addRoleMatrix';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters['param'] !== undefined) {
                body = parameters['param'];
            }
            if (parameters['param'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: param') : this.m_Logger.error('Missing required  parameter: param');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: param');
                }
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    getResourceUsingGETURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/auth/getResource';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * 获取资源矩阵
     * @method
     * @name AppGateway#getResourceUsingGET
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     */
    getResourceUsingGET(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/auth/getResource';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('GET', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    getRoleMatrixUsingGETURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/auth/getRoleMatrix';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * 暂时不支持条件查询，默认获取所有
     * @method
     * @name AppGateway#getRoleMatrixUsingGET
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     */
    getRoleMatrixUsingGET(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/auth/getRoleMatrix';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('GET', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    getUserRolesUsingGETURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/auth/getUserRoles';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * 获取用户角色信息
     * @method
     * @name AppGateway#getUserRolesUsingGET
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     */
    getUserRolesUsingGET(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/auth/getUserRoles';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('GET', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    addUsingPUT_2URL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/basic/account/add';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * 新增基础账户接口
     * @method
     * @name AppGateway#addUsingPUT_2
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    addUsingPUT_2(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/basic/account/add';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters['req'] !== undefined) {
                body = parameters['req'];
            }
            if (parameters['req'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: req') : this.m_Logger.error('Missing required  parameter: req');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: req');
                }
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('PUT', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    getMediaUsingPOSTURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/basic/account/get_media';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * 根据基础账户INT编号查询基础账户介质接口
     * @method
     * @name AppGateway#getMediaUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    getMediaUsingPOST(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/basic/account/get_media';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters['req'] !== undefined) {
                body = parameters['req'];
            }
            if (parameters['req'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: req') : this.m_Logger.error('Missing required  parameter: req');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: req');
                }
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    modifyUsingPOST_2URL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/basic/account/modify';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * 修改基础账户信息接口
     * @method
     * @name AppGateway#modifyUsingPOST_2
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    modifyUsingPOST_2(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/basic/account/modify';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters['req'] !== undefined) {
                body = parameters['req'];
            }
            if (parameters['req'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: req') : this.m_Logger.error('Missing required  parameter: req');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: req');
                }
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    modifyMediaUsingPOSTURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/basic/account/modify_media';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * 维护基础账户身份识别介质接口
     * @method
     * @name AppGateway#modifyMediaUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    modifyMediaUsingPOST(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/basic/account/modify_media';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters['req'] !== undefined) {
                body = parameters['req'];
            }
            if (parameters['req'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: req') : this.m_Logger.error('Missing required  parameter: req');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: req');
                }
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    searchByBasicAccNoUsingGETURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/basic/account/searchbybasic_acc_no/{basic_acc_no}';
        path = path.replace('{basic_acc_no}', `${parameters['basicAccNo']}`);
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * 根据基础账户基础档案编号查询基础账户接口
     * @method
     * @name AppGateway#searchByBasicAccNoUsingGET
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {string} basicAccNo - 基础账户基础档案编号
     */
    searchByBasicAccNoUsingGET(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/basic/account/searchbybasic_acc_no/{basic_acc_no}';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            path = path.replace('{basic_acc_no}', `${parameters['basicAccNo']}`);
            if (parameters['basicAccNo'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: basicAccNo') : this.m_Logger.error('Missing required  parameter: basicAccNo');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: basicAccNo');
                }
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('GET', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    registeredEventUsingGETURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/event/callback/register';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * registeredEvent
     * @method
     * @name AppGateway#registeredEventUsingGET
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} id - id
     */
    registeredEventUsingGET(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/event/callback/register';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = '*/*';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters['id'] !== undefined) {
                body = parameters['id'];
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('GET', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    registeredEventUsingHEADURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/event/callback/register';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * registeredEvent
     * @method
     * @name AppGateway#registeredEventUsingHEAD
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} id - id
     */
    registeredEventUsingHEAD(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/event/callback/register';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = '*/*';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters['id'] !== undefined) {
                body = parameters['id'];
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('HEAD', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    registeredEventUsingPOSTURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/event/callback/register';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * registeredEvent
     * @method
     * @name AppGateway#registeredEventUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} id - id
     */
    registeredEventUsingPOST(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/event/callback/register';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = '*/*';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters['id'] !== undefined) {
                body = parameters['id'];
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    registeredEventUsingPUTURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/event/callback/register';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * registeredEvent
     * @method
     * @name AppGateway#registeredEventUsingPUT
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} id - id
     */
    registeredEventUsingPUT(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/event/callback/register';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = '*/*';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters['id'] !== undefined) {
                body = parameters['id'];
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('PUT', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    registeredEventUsingDELETEURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/event/callback/register';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * registeredEvent
     * @method
     * @name AppGateway#registeredEventUsingDELETE
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} id - id
     */
    registeredEventUsingDELETE(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/event/callback/register';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = '*/*';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters['id'] !== undefined) {
                body = parameters['id'];
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('DELETE', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    registeredEventUsingOPTIONSURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/event/callback/register';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * registeredEvent
     * @method
     * @name AppGateway#registeredEventUsingOPTIONS
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} id - id
     */
    registeredEventUsingOPTIONS(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/event/callback/register';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = '*/*';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters['id'] !== undefined) {
                body = parameters['id'];
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('OPTIONS', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    registeredEventUsingPATCHURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/event/callback/register';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * registeredEvent
     * @method
     * @name AppGateway#registeredEventUsingPATCH
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} id - id
     */
    registeredEventUsingPATCH(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/event/callback/register';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = '*/*';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters['id'] !== undefined) {
                body = parameters['id'];
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('PATCH', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
    specUsingGETURL(parameters) {
        let queryParameters = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                return "";
            }
            else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/spec';
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }
        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }
    /**
     * spec
     * @method
     * @name AppGateway#specUsingGET
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     */
    specUsingGET(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
            if (domain === "") {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Invalid domain.') : this.m_Logger.error('Invalid domain.');
                    return null;
                }
                else {
                    throw new Error('Invalid domain.');
                }
            }
            let path = '/spec';
            let body;
            let queryParameters = {};
            let headers = {};
            let form = {};
            let formData = {};
            let downloadFileName = undefined;
            headers['Accept'] = '*/*';
            headers['Content-Type'] = 'application/json';
            if (parameters['authorization'] !== undefined) {
                headers['Authorization'] = parameters['authorization'];
            }
            if (parameters['authorization'] === undefined) {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err('Missing required  parameter: authorization') : this.m_Logger.error('Missing required  parameter: authorization');
                    return null;
                }
                else {
                    throw new Error('Missing required  parameter: authorization');
                }
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            return yield this.request('GET', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
                if (this.m_Logger) {
                    this.m_Logger.err ? this.m_Logger.err(err) : this.m_Logger.error(err);
                    return null;
                }
                else {
                    throw err;
                }
            });
        });
    }
}
exports.default = AppGateway;
//# sourceMappingURL=AppGateway.js.map