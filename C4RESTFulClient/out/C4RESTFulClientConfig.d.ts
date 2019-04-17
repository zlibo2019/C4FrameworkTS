export interface C4RESTFulClientConfig {
    proxy?: {
        host: string;
        port: number;
        user?: string;
        password?: string;
    };
    connection?: {
        secureOptions: number;
        ciphers: string;
        honorCipherOrder: boolean;
    };
    mimetypes?: {
        json?: string[];
        xml?: string[];
    };
    user?: string;
    password?: string;
    requestConfig?: {
        timeout?: number;
        noDelay?: boolean;
        keepAlive?: boolean;
        keepAliveDelay?: number;
        followRedirects?: true;
        maxRedirects?: number;
    };
    responseConfig?: {
        timeout: number;
    };
}
export interface C4RESTFulClientRequestConfig {
    data?: {};
    headers?: {};
    path?: {};
    parameters?: {};
}
