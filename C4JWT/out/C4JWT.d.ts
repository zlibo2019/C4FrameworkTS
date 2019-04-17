/// <reference types="node" />
import { JWTConfig, JWTInstance } from "./JWTTypes/JWTConfig";
/**
 * # 支持配置密钥组
 * # 支持对payload进行加密
 * # 支持RSA加密
 * # 支持对撤销的token进行存储，在verify token时使用
 */
export default class C4JWT {
    private m_Keys;
    private m_PayloadKeys;
    private m_PayloadAlgorithm;
    private m_Algorithm;
    private m_ExpiresIn;
    private m_ClockTolerance;
    private m_NotBefore?;
    private m_Issuer;
    private m_Subject?;
    private m_Store?;
    private m_UseKeyFile;
    init(config: JWTConfig): Promise<void>;
    getKeyIDs(): string[];
    /**
     * 设置payload上的信息
     * @param data
     * @param key
     * @param value
     */
    setJWT(payload: any, key: string, value: any): any;
    /**
     * 读取payload上的信息
     * @param data
     * @param key
     */
    getJWT(payload: any, key: string): any;
    /**
     * 校验Token
     * @param token JWT串
     */
    verifyJWT(token: string): Promise<{
        verifyRes: boolean;
        jwt: null;
    } | {
        verifyRes: boolean;
        jwt: {};
    }>;
    /**
     * 撤销Token，将撤销的Token的jti写入存储，并设置超时
     * @param jti token的ID
     */
    revokeJWT(token: string | JWTInstance): Promise<any>;
    /**
     * 刷新Token，用来给Token续命
     * @param token
     */
    refreshJWT(token: string | JWTInstance): Promise<string>;
    /**
     * 创建一个JWT
     * @param audience 使用者
     * @param payload  载荷
     * @param keyID    签名的Key的ID，不设置默认使用第一个或者使用随机方法
     * @param jwtid    jwt的ID(建议使用UUID)
     */
    generateJWT(audience: string, payload: string | any, jwtid?: string, keyID?: string): Promise<string>;
    /**
     * 创建一个JWTID（UUID）
     */
    static getJWTID(): Promise<string>;
}
export declare function decodeToken(token: string | Buffer): JWTInstance | null;
