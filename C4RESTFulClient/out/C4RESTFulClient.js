"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_rest_client_1 = require("node-rest-client");
const c4utils_1 = require("c4utils");
const MixinDeep = require("mixin-deep");
const CloneDeep = require("clone-deep");
class C4RESTFulClient {
    constructor() {
        this.m_Client = null;
        this.m_args = {};
    }
    init(options) {
        if (c4utils_1.TypeUtils.isNullOrUndefined(options)) {
            this.m_args = options;
        }
        this.m_Client = new node_rest_client_1.Client();
    }
    registerMethod(name, url, method) {
        if (null === this.m_Client) {
            return;
        }
        this.m_Client.registerMethod(name, url, method);
    }
    unregisterMethod(name) {
        if (null === this.m_Client) {
            return;
        }
        this.m_Client.unregisterMethod(name);
    }
    addParser(parser) {
        if (null === this.m_Client) {
            return;
        }
        this.m_Client.parsers.add(parser);
    }
    getMethod(name) {
        if (this.m_Client === null) {
            throw new Error("C4RESTFulClient not init.");
        }
        let CurMethod = this.m_Client.methods[name];
        return CurMethod;
    }
    methods(name, args, cb) {
        let Self = this;
        if (Self.m_Client === null) {
            throw new Error("C4RESTFulClient not init.");
        }
        // 合并配置
        let CurArgs = CloneDeep(Self.m_args); // 复制一下当前配置
        CurArgs = MixinDeep(CurArgs || {}, args); // 合并配置
        // 获取Method
        let CurMethod = Self.m_Client.methods[name];
        if (c4utils_1.TypeUtils.isNullOrUndefined(CurMethod)) {
            throw new Error('C4RESTFulClient unknown method : ' + name);
        }
        // 开始请求
        if (c4utils_1.TypeUtils.isFunction(cb)) {
            // 回调方式
            let req = CurMethod(CurArgs, cb);
            req.on('requestTimeout', (request) => {
                if (cb)
                    cb({}, {}, request);
            });
            req.on('responseTimeout', (response) => {
                if (cb)
                    cb({}, {}, response);
            });
            req.on('error', (err) => {
                if (cb)
                    cb({}, {}, err);
            });
        }
        else {
            // promise 模式
            return new Promise((resolve, reject) => {
                let req = CurMethod(CurArgs, (data, res) => {
                    resolve({
                        response: res,
                        data: data
                    });
                });
                req.on('requestTimeout', (request) => {
                    reject(request);
                });
                req.on('responseTimeout', (response) => {
                    reject(response);
                });
                req.on('error', (err) => {
                    reject(err);
                });
            });
        }
    }
    _method(method, url, args, cb) {
        let Self = this;
        if (Self.m_Client === null) {
            throw new Error("C4RESTFulClient not init.");
        }
        // 合并配置
        let CurArgs = CloneDeep(Self.m_args); // 复制一下当前配置
        CurArgs = MixinDeep(CurArgs || {}, args); // 合并配置
        // 获取Method
        let CurMethod = Self.m_Client[method];
        if (c4utils_1.TypeUtils.isNullOrUndefined(CurMethod)) {
            throw new Error('C4RESTFulClient unknown method : ' + method);
        }
        // 开始请求
        if (c4utils_1.TypeUtils.isFunction(cb)) {
            // 回调方式
            let req = CurMethod(url, CurArgs, (data, response) => {
                if (cb)
                    cb(data, response, undefined);
            });
            req.on('requestTimeout', (request) => {
                if (cb)
                    cb({}, {}, request);
            });
            req.on('responseTimeout', (response) => {
                if (cb)
                    cb({}, {}, response);
            });
            req.on('error', (err) => {
                if (cb)
                    cb({}, {}, err);
            });
        }
        else {
            // promise 模式
            return new Promise((resolve, reject) => {
                let req = CurMethod(url, CurArgs, (data, res) => {
                    resolve({
                        response: res,
                        data: data
                    });
                });
                req.on('requestTimeout', (request) => {
                    reject(request);
                });
                req.on('responseTimeout', (response) => {
                    reject(response);
                });
                req.on('error', (err) => {
                    reject(err);
                });
            });
        }
    }
    get(url, args, cb) {
        return this._method('get', url, args, cb);
    }
    post(url, args, cb) {
        return this._method('post', url, args, cb);
    }
    put(url, args, cb) {
        return this._method('put', url, args, cb);
    }
    patch(url, args, cb) {
        return this._method('patch', url, args, cb);
    }
    delete(url, args, cb) {
        return this._method('delete', url, args, cb);
    }
}
exports.default = C4RESTFulClient;
//# sourceMappingURL=C4RESTFulClient.js.map