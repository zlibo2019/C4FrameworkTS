/// <reference types="node" />
import Http = require('http');
import { C4RESTFulClientConfig, C4RESTFulClientRequestConfig } from './C4RESTFulClientConfig';
export default class C4RESTFulClient {
    private m_Client;
    private m_args;
    constructor();
    init(options?: C4RESTFulClientConfig): void;
    registerMethod(name: string, url: string, method: string): void;
    unregisterMethod(name: string): void;
    addParser(parser: any): void;
    getMethod(name: string): any;
    methods(name: string, args?: C4RESTFulClientRequestConfig, cb?: (data: any, res: Http.ClientResponse, err?: any) => void): Promise<{}> | undefined;
    _method(method: string, url: string, args?: C4RESTFulClientConfig, cb?: (data: any, res: Http.ClientResponse, err?: any) => void): Promise<{}> | undefined;
    get(url: string, args?: C4RESTFulClientConfig, cb?: (data: any, res: Http.ClientResponse, err?: any) => void): Promise<{}> | undefined;
    post(url: string, args?: C4RESTFulClientConfig, cb?: (data: any, res: Http.ClientResponse, err?: any) => void): Promise<{}> | undefined;
    put(url: string, args?: C4RESTFulClientConfig, cb?: (data: any, res: Http.ClientResponse, err?: any) => void): Promise<{}> | undefined;
    patch(url: string, args?: C4RESTFulClientConfig, cb?: (data: any, res: Http.ClientResponse, err?: any) => void): Promise<{}> | undefined;
    delete(url: string, args?: C4RESTFulClientConfig, cb?: (data: any, res: Http.ClientResponse, err?: any) => void): Promise<{}> | undefined;
}
