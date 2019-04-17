import { Client, ClientRequest } from 'node-rest-client';
import Http                 = require('http');
import { C4RESTFulClientConfig, C4RESTFulClientRequestConfig }    from './C4RESTFulClientConfig';
import { TypeUtils }                from 'c4utils';
import MixinDeep            = require('mixin-deep');
import CloneDeep            = require('clone-deep');

export default class C4RESTFulClient {
    private m_Client    : Client | null;
    private m_args      : C4RESTFulClientConfig;

    constructor() {
        this.m_Client   = null;
        this.m_args     = {};
    }

    init(options ?: C4RESTFulClientConfig) {
        if (TypeUtils.isNullOrUndefined(options)) {
            this.m_args     = <C4RESTFulClientConfig>options;
        }

        this.m_Client   = new Client();
    }

    registerMethod(name : string, url : string, method : string) {
        if (null === this.m_Client) {
            return;
        }

        this.m_Client.registerMethod(name, url, method);
    }

    unregisterMethod(name : string) {
        if (null === this.m_Client) {
            return;
        }

        this.m_Client.unregisterMethod(name);
    }

    addParser(parser : any) {
        if (null === this.m_Client) {
            return;
        }

        this.m_Client.parsers.add(parser);
    }

    getMethod(name : string) {
        if (this.m_Client === null) {
            throw new Error("C4RESTFulClient not init.")
        }

        let CurMethod = this.m_Client.methods[name];
        return CurMethod;
    }

    methods(name : string, args ?: C4RESTFulClientRequestConfig, cb ?: (data : any, res : Http.ClientResponse, err ?: any) => void) {
        let Self = this;
        if (Self.m_Client === null) {
            throw new Error("C4RESTFulClient not init.");
        }

        // 合并配置
        let CurArgs = CloneDeep(Self.m_args);       // 复制一下当前配置
        CurArgs = MixinDeep(CurArgs || {}, args);         // 合并配置

        // 获取Method
        let CurMethod = Self.m_Client.methods[name];
        if (TypeUtils.isNullOrUndefined(CurMethod)) {
            throw new Error('C4RESTFulClient unknown method : ' + name);
        }

        // 开始请求
        if (TypeUtils.isFunction(cb)) {
            // 回调方式
            let req = CurMethod(CurArgs, cb);
            req.on('requestTimeout', (request : Http.ClientRequest) => {
                if (cb)
                    cb({}, <Http.ClientResponse>{}, request);
            });
            req.on('responseTimeout', (response : Http.ClientResponse) => {
                if (cb)
                    cb({}, <Http.ClientResponse>{}, response);
            });
            req.on('error', (err : any) => {
                if (cb)
                    cb({}, <Http.ClientResponse>{}, err);
            });
        } else {
            // promise 模式
            return new Promise((resolve, reject) => {
                let req = CurMethod(CurArgs, (data : any, res : any) => {
                    resolve({
                        response : res,
                        data : data
                    });
                });
                req.on('requestTimeout', (request : Http.ClientRequest) => {
                    reject(request);
                });
                req.on('responseTimeout', (response : Http.ClientResponse) => {
                    reject(response);
                });
                req.on('error', (err : any) => {
                    reject(err)
                });
            });
        }
    }

    _method(method : string, url : string, args ?: C4RESTFulClientConfig, cb ?: (data : any, res : Http.ClientResponse, err ?: any) => void) {
        let Self = this;
        if (Self.m_Client === null) {
            throw new Error("C4RESTFulClient not init.");
        }

        // 合并配置
        let CurArgs = CloneDeep(Self.m_args);       // 复制一下当前配置
        CurArgs = MixinDeep(CurArgs || {}, args);         // 合并配置

        // 获取Method
        let CurMethod = (<any>Self.m_Client)[method];
        if (TypeUtils.isNullOrUndefined(CurMethod)) {
            throw new Error('C4RESTFulClient unknown method : ' + method);
        }

        // 开始请求
        if (TypeUtils.isFunction(cb)) {
            // 回调方式
            let req = CurMethod(url, CurArgs, (data : any, response : Http.ClientResponse) => {
                if (cb)
                    cb(data, response, undefined);
            });
            req.on('requestTimeout', (request : Http.ClientRequest) => {
                if (cb)
                    cb({}, <Http.ClientResponse>{}, request);
            });
            req.on('responseTimeout', (response : Http.ClientResponse) => {
                if (cb)
                    cb({}, <Http.ClientResponse>{}, response);
            });
            req.on('error', (err : any) => {
                if (cb)
                    cb({}, <Http.ClientResponse>{}, err);
            });
        } else {
            // promise 模式
            return new Promise((resolve, reject) => {
                let req = CurMethod(url, CurArgs, (data : any, res : Http.ClientResponse) => {
                    resolve({
                        response : res,
                        data : data
                    });
                });
                req.on('requestTimeout', (request : Http.ClientRequest) => {
                    reject(request);
                });
                req.on('responseTimeout', (response : Http.ClientResponse) => {
                    reject(response);
                });
                req.on('error', (err : any) => {
                    reject(err)
                });
            });
        }
    }

    get(url : string, args ?: C4RESTFulClientConfig, cb ?: (data : any, res : Http.ClientResponse, err ?: any) => void) {
        return this._method('get', url, args, cb);
    }

    post(url : string, args ?: C4RESTFulClientConfig, cb ?: (data : any, res : Http.ClientResponse, err ?: any) => void) {
        return this._method('post', url, args, cb);
    }

    put(url : string, args ?: C4RESTFulClientConfig, cb ?: (data : any, res : Http.ClientResponse, err ?: any) => void) {
        return this._method('put', url, args, cb);
    }

    patch(url : string, args ?: C4RESTFulClientConfig, cb ?: (data : any, res : Http.ClientResponse, err ?: any) => void) {
        return this._method('patch', url, args, cb);
    }

    delete(url : string, args ?: C4RESTFulClientConfig, cb ?: (data : any, res : Http.ClientResponse, err ?: any) => void) {
        return this._method('delete', url, args, cb);
    }
}
