import BaseMemoryStore from "../JWTUtils/BaseMemoryStore";
export declare type JWTAlgorithm = "HS256" | "HS384" | "HS512" | "RS256" | "RS384" | "RS512" | "ES256" | "ES384" | "ES512";
export declare type JWTPayloadAlgorithm = "aes-256-cbc" | "des-ede3-cbc";
export interface JWTConfig {
    authField: string;
    keys?: string[] | {
        [keyID: string]: string;
    };
    algorithm?: JWTAlgorithm;
    expiresIn?: string;
    notBefore?: string;
    issuer: string;
    subject?: string;
    clockTolerance?: number;
    store?: JWTStore | BaseMemoryStore;
    keyFiles?: {
        [keyID: string]: {
            privateKey: string;
            publicKey: string;
            passphrase?: string;
        };
    };
    payloadAlgorithm: JWTPayloadAlgorithm;
    payloadKeys: string[] | {
        [keyID: string]: {
            key: string;
            iv: string;
        };
    };
}
export declare abstract class JWTStore {
    abstract init(config: any): Promise<boolean>;
    abstract destroy(): Promise<any>;
    abstract get(key: string): Promise<any>;
    abstract set(key: string, data: any): Promise<any>;
    abstract clear(key: string): Promise<any>;
}
export interface JWTInstance {
    header: {
        alg: JWTAlgorithm;
        typ: "JWT";
        kid?: string;
    };
    payload: {
        palg: JWTPayloadAlgorithm;
        pkeyid: string;
        pdata: string;
        iat: number;
        exp: number;
        aud: string;
        iss: string;
        sub?: string;
        jti: string;
    };
    signature: string;
}
