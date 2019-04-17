/** Declaration file generated by dts-gen */

import Http = require('http');
import Events = require("events");

// export function Client(options: any, ...args: any[]): any;

declare class ClientRequest extends Events.EventEmitter {
    setHttpRequest(request : Http.ClientRequest) : void;
    end() : void;
}

export class Client {

    public methods : any;
    public parsers : any;
    public serializers : any;

    constructor();

    registerMethod(name : string, url : string, method : string): void;

    unregisterMethod(name : string) : void;

    addListener(type: any, listener: any): any;

    emit(type: any, ...args: any[]): any;

    eventNames(): any;

    getMaxListeners(): any;

    listenerCount(type: any): any;

    listeners(type: any): any;

    on(type: any, listener: any): any;

    once(type: any, listener: any): any;

    prependListener(type: any, listener: any): any;

    prependOnceListener(type: any, listener: any): any;

    removeAllListeners(type: any, ...args: any[]): any;

    removeListener(type: any, listener: any): any;

    setMaxListeners(n: any): any;

    addCustomHttpMethod(methodName : string) : void;

    get(url : string, args ?: any, cb ?: (data : any, response : Http.ClientResponse) => void) : ClientRequest;
    post(url : string, args ?: any, cb ?: (data : any, response : Http.ClientResponse) => void) : ClientRequest;
    put(url : string, args ?: any, cb ?: (data : any, response : Http.ClientResponse) => void) : ClientRequest;
    delete(url : string, args ?: any, cb ?: (data : any, response : Http.ClientResponse) => void) : ClientRequest;
    patch(url : string, args ?: any, cb ?: (data : any, response : Http.ClientResponse) => void) : ClientRequest;

        // namespace addListener {
        //     const prototype: {
        //     };

        // }

        // namespace emit {
        //     const prototype: {
        //     };

        // }

        // namespace eventNames {
        //     const prototype: {
        //     };

        // }

        // namespace getMaxListeners {
        //     const prototype: {
        //     };

        // }

        // namespace listenerCount {
        //     const prototype: {
        //     };

        // }

        // namespace listeners {
        //     const prototype: {
        //     };

        // }

        // namespace on {
        //     const prototype: {
        //     };

        // }

        // namespace once {
        //     const prototype: {
        //     };

        // }

        // namespace prependListener {
        //     const prototype: {
        //     };

        // }

        // namespace prependOnceListener {
        //     const prototype: {
        //     };

        // }

        // namespace removeAllListeners {
        //     const prototype: {
        //     };

        // }

        // namespace removeListener {
        //     const prototype: {
        //     };

        // }

        // namespace setMaxListeners {
        //     const prototype: {
        //     };

        // }

}

// }
