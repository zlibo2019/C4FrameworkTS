import BaseMemoryStore from "../JWTUtils/BaseMemoryStore";

export type JWTAlgorithm = "HS256" | "HS384" | "HS512" | "RS256" | "RS384" | "RS512" | "ES256" | "ES384" | "ES512";
export type JWTPayloadAlgorithm = "aes-256-cbc" | "des-ede3-cbc";

// 算法使用RS后ES系列时KeyFiles有效，Keys无效
export interface JWTConfig {
    authField : string;
    keys ?: string[] | {
        [keyID : string] : string
    };
    algorithm ?: JWTAlgorithm;
    expiresIn ?: string;
    notBefore ?: string;
    issuer     : string;
    subject   ?: string;
    clockTolerance ?: number;               // 允许的校验始终偏差（单位：s）
    store     ?: JWTStore | BaseMemoryStore;
    keyFiles  ?: {
        [keyID : string] : {
            privateKey : string;        // fileName or pem data
            publicKey  : string;        // fileName or pem data
            passphrase ?: string;       // passphrase for private key
        }
    };
    // 载荷的加密密钥
    payloadAlgorithm : JWTPayloadAlgorithm;
    payloadKeys : string[] | {
        [keyID : string] : {
            key : string;           // aes-256-cbc 256bits 3des-cbc 192bits
            iv  : string;           // aes-256-cbc 128bits 3des-cbc 64bits
        }
    };
};

export abstract class JWTStore {
    abstract async init(config : any) : Promise<boolean>;
    abstract async destroy() : Promise<any>;
    abstract async get(key : string) : Promise<any>;
    abstract async set(key : string, data : any) : Promise<any>;
    abstract async clear(key : string) : Promise<any>;
};

export interface JWTInstance {
    header : {
        alg  : JWTAlgorithm;
        typ  : "JWT";
        kid ?: string;
    };
    payload : {
        palg    : JWTPayloadAlgorithm;
        pkeyid  : string;
        pdata   : string;
        iat     : number;
        exp     : number;
        aud     : string;
        iss     : string;
        sub    ?: string;
        jti     : string;
    };
    signature : string;
}
