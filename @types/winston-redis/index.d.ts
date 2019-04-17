import { TransportOptions, TransportInstance } from "winston";

/** Declaration file generated by dts-gen */

export class Redis {
    constructor(options: any);

    log(level: any, msg: any, meta: any, callback: any): any;

    query(options: any, callback: any): any;

    stream(options: any): any;

}


export interface Redis extends TransportInstance{

    addListener(type: any, listener: any): any;

    emit(type: any, ...args: any[]): any;

    eventNames(): any;

    formatQuery(query: any): any;

    formatResults(results: any, options: any): any;

    getMaxListeners(): any;

    listenerCount(type: any): any;

    listeners(type: any): any;

    log(level: any, msg: any, meta: any, callback: any): any;

    logException(msg: any, meta: any, callback: any): any;

    normalizeQuery(options: any): any;

    on(type: any, listener: any): any;

    once(type: any, listener: any): any;

    prependListener(type: any, listener: any): any;

    prependOnceListener(type: any, listener: any): any;

    query(options: any, callback: any): any;

    removeAllListeners(type: any, ...args: any[]): any;

    removeListener(type: any, listener: any): any;

    setMaxListeners(n: any): any;

    stream(options: any): any;

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

    // namespace formatQuery {
    //     const prototype: {
    //     };

    // }

    // namespace formatResults {
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

    // namespace log {
    //     const prototype: {
    //     };

    // }

    // namespace logException {
    //     const prototype: {
    //     };

    // }

    // namespace normalizeQuery {
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

    // namespace query {
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

    // namespace stream {
    //     const prototype: {
    //     };

    // }

}

// }

