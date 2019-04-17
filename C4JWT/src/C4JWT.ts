import JWT = require("jsonwebtoken");
import { JWTAlgorithm, JWTStore, JWTConfig, JWTInstance, JWTPayloadAlgorithm } from "./JWTTypes/JWTConfig";
import BaseMemoryStore from "./JWTUtils/BaseMemoryStore";
import { TypeUtils, FSP, PathUtils } from "c4utils";
import { v4 } from "uuid";
import Crypto = require('crypto');

/**
 * # 支持配置密钥组
 * # 支持对payload进行加密
 * # 支持RSA加密
 * # 支持对撤销的token进行存储，在verify token时使用
 */
export default class C4JWT {
    private m_Keys          : {
        [keyID : string] : string | {
            privateKey : string | Buffer,
            publicKey  : string | Buffer,
            passphrase ?: string | Buffer
        }}  = {};
    private m_PayloadKeys   : {
        [keyID : string] : {
            key : string | Buffer;
            iv  : string | Buffer;
        }
    } = {};
    private m_PayloadAlgorithm  : JWTPayloadAlgorithm           = 'aes-256-cbc';
    private m_Algorithm         : JWTAlgorithm                  = "HS256";
    private m_ExpiresIn         : string                        = "24h";
    private m_ClockTolerance    : number                        = 0;
    private m_NotBefore        ?: string                        = undefined;
    private m_Issuer            : string                        = "Default_Issuer";
    private m_Subject          ?: string                        = undefined;
    private m_Store            ?: JWTStore                      = undefined;
    private m_UseKeyFile        : boolean                       = false;

    // new RegExp('[-BEGIN\s\S+PRIVATE KEY-]', 'g')
    async init(config : JWTConfig) {
        this.m_Algorithm    = config.algorithm || "HS256";
        let CheckAlg = new RegExp("^[RE]S\\d+$", 'g');
        let CheckRes = CheckAlg.exec(this.m_Algorithm);
        if (null === CheckRes) {
            // HS算法使用Keys
            if (TypeUtils.isObject(config.keys) && TypeUtils.isEmptyObj(config.keys)
                || TypeUtils.isArray(config.keys) && TypeUtils.isEmptyStr(config.keys)) {
                console.warn("C4JWT init use default key : 'DEFAULT_KEY'.");
                this.m_Keys["0"] = "DEFAULT_KEY";
            } else {
                let Keys = Object.keys(<any>config.keys);
                for (let i = 0; i < Keys.length; i++) {
                    this.m_Keys[Keys[i]] = (<any>config.keys)[Keys[i]];
                }

                if (TypeUtils.isEmptyObj(this.m_Keys)) {
                    console.warn("C4JWT init use default key : 'DEFAULT_KEY'.");
                    this.m_Keys["0"] = "DEFAULT_KEY";
                }
            }
        } else {
            // RS或ES算法，使用KeyFiles
            if (TypeUtils.isObject(config.keyFiles) && TypeUtils.isEmptyObj(config.keyFiles)) {
                console.error("C4JWT init can't get any pem.");
                throw Error("C4JWT init can't get any pem.");
            } else {
                let CurKey : {
                    privateKey : string | Buffer,
                    publicKey  : string | Buffer,
                    passphrase ?: string | Buffer
                } = {
                    privateKey : "",
                    publicKey  : ""
                };
                let Keys = Object.keys(<any>config.keyFiles);
                for (let i = 0; i < Keys.length; i++) {
                    let CurPriKey   = (<any>config.keyFiles)[Keys[i]].privateKey;
                    let CurPubKey   = (<any>config.keyFiles)[Keys[i]].publicKey;
                    let CurPass     = (<any>config.keyFiles)[Keys[i]].passphrase;

                    let IsPem = (new RegExp('-BEGIN[\\s\\S]+PRIVATE[\\s\\S]+KEY-', 'g')).exec(CurPriKey);
                    if (null === IsPem) {
                        // load from file;
                        CurKey.privateKey = await loadKeyFromFile(CurPriKey);
                    }
                    IsPem   = (new RegExp('-BEGIN[\\s\\S]+PUBLIC[\\s\\S]+KEY-', 'g')).exec(CurPubKey);
                    if (null === IsPem) {
                        // load from file;
                        CurKey.publicKey    = await loadKeyFromFile(CurPubKey);
                    }

                    if (!TypeUtils.isEmptyStr(CurPass)) {
                        CurKey.passphrase   = CurPass;
                    }

                    this.m_Keys[Keys[i]] = CurKey;
                }

                this.m_UseKeyFile = true;
                if (TypeUtils.isEmptyObj(this.m_Keys)) {
                    console.warn("C4JWT init use default key : 'DEFAULT_KEY'.");
                    this.m_Keys["0"] = "DEFAULT_KEY";
                    this.m_UseKeyFile = false;
                }
            }
        }

        // load payload keys
        this.m_PayloadAlgorithm = <JWTPayloadAlgorithm>config.payloadAlgorithm.toLowerCase();
        let Keys = Object.keys(config.payloadKeys);
        for (let i = 0; i < Keys.length; i++) {
            this.m_PayloadKeys[Keys[i]] = (<any>config).payloadKeys[Keys[i]];
            if (!checkKeyAndIV(this.m_PayloadKeys[Keys[i]].key, this.m_PayloadKeys[Keys[i]].iv, this.m_PayloadAlgorithm)) {
                console.error(`C4JWT init payload algorithm ${this.m_PayloadAlgorithm}, key or iv has bad length.`);
                throw Error(`C4JWT init payload algorithm ${this.m_PayloadAlgorithm}, key or iv has bad length.`);
            }
        }
        if (TypeUtils.isEmptyObj(this.m_PayloadKeys)) {
            console.warn("C4JWT init use default algorithm : 'aes-256-cbc', payload key : 'DEFAULT_PAYLOAD_KEY_012345678901', iv : 'DEFAULT_IV_01234'.");
            this.m_PayloadAlgorithm = "aes-256-cbc";
            this.m_PayloadKeys["0"].key = "DEFAULT_PAYLOAD_KEY_012345678901";
            this.m_PayloadKeys["0"].iv  = "DEFAULT_IV_01234";
        }

        this.m_ExpiresIn        = config.expiresIn || "24h";
        this.m_NotBefore        = config.notBefore;
        this.m_Issuer           = config.issuer;
        this.m_Subject          = config.subject;
        this.m_ClockTolerance   = config.clockTolerance || 0;

        if (TypeUtils.isEmptyObj(config.store)) {
            this.m_Store    = new BaseMemoryStore();
            await this.m_Store.init({});
        } else {
            this.m_Store    = config.store;
        }
    }

    getKeyIDs() {
        return Object.keys(this.m_Keys);
    }

    /**
     * 设置payload上的信息
     * @param data 
     * @param key 
     * @param value 
     */
    setJWT(payload : any, key : string, value : any) {
        if (TypeUtils.isEmptyObj(payload)) {
            let a : any = {};
            a[key] = value;
            return a;
        }
        payload[key] = value;
        return payload;
    }

    /**
     * 读取payload上的信息
     * @param data 
     * @param key 
     */
    getJWT(payload : any, key : string) {
        if (TypeUtils.isEmptyObj(payload)) {
            return undefined;
        }

        return payload[key];
    }

    /**
     * 校验Token
     * @param token JWT串
     */
    async verifyJWT(token : string) {
        let CurJWT : JWTInstance;
        CurJWT = <JWTInstance>decodeToken(token);
        if (null === CurJWT) {
            return {
                verifyRes : false,
                jwt : null
            };
        }

        // 验证Token
        let Self = this;
        let CurKey : any = "";
        if (this.m_UseKeyFile) {
            CurKey  = (<any>Self.m_Keys[<string>(CurJWT.header.kid)]).publicKey;
        } else {
            CurKey  = Self.m_Keys[<string>(CurJWT.header.kid)];
        }
        let VerifyRes = await new Promise((resolve, reject) => {
            JWT.verify(token, CurKey, {
                algorithms : [Self.m_Algorithm],
                issuer : Self.m_Issuer,
                subject : Self.m_Subject,
                clockTolerance : Self.m_ClockTolerance
            }, (err, decoded) => {
                if (err) {
                    return reject(err);
                }
                resolve(decoded);
            })
        }).catch((err) => {
            throw err;
        });

        // 检查token是否提前撤销了
        // 之所以放到Verify后面，防止伪造
        let CurJTI = CurJWT.payload.jti;
        if (!TypeUtils.isEmptyStr(CurJTI)) {
            let isRevoked = await (<JWTStore>this.m_Store).get(<string>CurJTI);
            if (!TypeUtils.isEmptyObj(isRevoked)) {
                return {
                    verifyRes : false,
                    jwt : null
                }
            }
        }

        // 解密payload
        let CurPalg     = (<any>VerifyRes).palg;
        let CurPKeyid   = (<any>VerifyRes).pkeyid;
        let CurPdata    = (<any>VerifyRes).pdata;
        if (this.m_PayloadAlgorithm !== CurPalg) {
            return {
                verifyRes : false,
                jwt : null
            }
        }
        let CurPKey     = this.m_PayloadKeys[CurPKeyid];
        if (TypeUtils.isEmptyObj(CurPKey)) {
            return {
                verifyRes : false,
                jwt : null
            }
        }

        let Decipher    = Crypto.createDecipheriv(this.m_PayloadAlgorithm, CurPKey.key, CurPKey.iv);
        let Decrypted   = Decipher.update(CurPdata, 'hex', 'utf8');
        Decrypted      += Decipher.final('utf8');

        try {
            CurPdata = JSON.parse(Decrypted);
        } catch (error) {
            console.error(error);
            return {
                verifyRes : false,
                jwt : null
            }
        }

        (<any>VerifyRes).pdata = CurPdata;

        return {
            verifyRes : true,
            jwt : VerifyRes
        };
    }

    /**
     * 撤销Token，将撤销的Token的jti写入存储，并设置超时
     * @param jti token的ID
     */
    async revokeJWT(token : string | JWTInstance) {
        if (TypeUtils.isString(token)) {
            if (TypeUtils.isEmptyStr(token)) {
                return false;
            }
            let VerifyRes : any = null;
            try {
                VerifyRes = await this.verifyJWT(<string>token);
            } catch (error) {
                return false;
            }

            if (!VerifyRes.verifyRes)
                return false;
            return await (<JWTStore>this.m_Store).set(VerifyRes.jwt.jti, VerifyRes.jwt);
        } else {
            return await (<JWTStore>this.m_Store).set((<JWTInstance>token).payload.jti, (<JWTInstance>token).payload);
        }
    }

    /**
     * 刷新Token，用来给Token续命
     * @param token 
     */
    async refreshJWT(token : string | JWTInstance) {
        if (TypeUtils.isString(token)) {
            if (TypeUtils.isEmptyStr(token)) {
                throw Error("Token is empty string.");
            }

            let VerifyRes : any = null;
            try {
                VerifyRes   = await this.verifyJWT(<string>token);
            } catch (error) {
                throw error;
            }
            if (!VerifyRes.verifyRes) {
                throw Error("Token is invalid。");
            }
            return this.generateJWT(VerifyRes.jwt.aud, VerifyRes.jwt.pdata, VerifyRes.jwt.jti);
        } else {
            return this.generateJWT((<JWTInstance>token).payload.aud, (<JWTInstance>token).payload.pdata, (<JWTInstance>token).payload.jti);
        }
    }

    /**
     * 创建一个JWT
     * @param audience 使用者
     * @param payload  载荷
     * @param keyID    签名的Key的ID，不设置默认使用第一个或者使用随机方法
     * @param jwtid    jwt的ID(建议使用UUID)
     */
    async generateJWT(audience : string, payload : string | any, jwtid ?: string, keyID ?: string) {
        let CurKeyID    = keyID || "";  // 随机获取keyID
        let CurJTI      = jwtid || await C4JWT.getJWTID();
        let Self        = this;

        let CurKeys     = this.getKeyIDs();
        let RandomIndex = parseInt((Math.random() * CurKeys.length) + "");
        CurKeyID        = CurKeys[RandomIndex];
        let CurKey : any= this.m_Keys[CurKeyID];
        if (this.m_UseKeyFile) {
            if ((<any>CurKey).passphrase) {
                CurKey  = {
                    key : (<any>CurKey).privateKey,
                    passphrase : (<any>CurKey).passphrase
                }
            } else {
                CurKey = (<any>CurKey).privateKey;
            }
        }

        let CurPayload : any = {
            random : Math.random()
        }
        let PayloadProps : string[] = [];
        if (TypeUtils.isString(payload)) {
            try {
                payload = JSON.parse(payload);
            } catch (error) {
                payload = {
                    data : payload
                }
            }
        }
        PayloadProps = Object.keys(payload);
        for (let i = 0; i < PayloadProps.length; i++) {
            CurPayload[PayloadProps[i]] = payload[PayloadProps[i]];
        }
        CurPayload["random"] = Math.random();            // 加入随机数

        // 获取随机的的加密key
        let PayloadKeys     = Object.keys(this.m_PayloadKeys);
        RandomIndex         = parseInt((Math.random() * PayloadKeys.length) + "");
        let PayloadKey      = this.m_PayloadKeys[PayloadKeys[RandomIndex]];

        // 加密payload
        let Cipher          = Crypto.createCipheriv(this.m_PayloadAlgorithm, PayloadKey.key, PayloadKey.iv);
        let Encrypted       = Cipher.update(JSON.stringify(CurPayload), 'utf8', 'hex');
        Encrypted += Cipher.final('hex');

        // 构造payload
        let OutPayload  = {
            palg   : this.m_PayloadAlgorithm,
            pkeyid : PayloadKeys[RandomIndex],
            
            pdata  : Encrypted
        }
        let SignOpt : any = {
            algorithm   : Self.m_Algorithm,
            expiresIn   : Self.m_ExpiresIn,
            audience    : audience,
            issuer      : Self.m_Issuer || "",
            subject     : Self.m_Subject,
            keyid       : CurKeyID,
            jwtid       : CurJTI
        };
        if (Self.m_NotBefore) {
            SignOpt["notBefore"] = Self.m_NotBefore;
        }
        let Token = JWT.sign(OutPayload, CurKey, SignOpt);

        return Token;
    }

    /**
     * 创建一个JWTID（UUID）
     */
    static async getJWTID() {
        return v4();
    }
}

async function loadKeyFromFile(path : string) {
    let IsInside    = await PathUtils.PathInsideAc(process.cwd(), path);
    let ReadRes     = await FSP.ReadFile(await PathUtils.GetAbsolutePath(path), {
        flag : "r",
        encoding : "utf8"
    });
    return ReadRes;
}

function checkKeyAndIV(key : string | Buffer, iv : string | Buffer, algType : string) {
    if (algType === "aes-256-cbc") {
        if (key.length !== 32
            || iv.length !== 16) {
            return false;
        }
    } else if (algType === "des-ede3-cbc") {
        if (key.length !== 24
            || iv.length !== 8) {
            return false;
        }
    } else {
        return false;
    }

    return true;
}

export function decodeToken(token : string | Buffer) {
    if (TypeUtils.isString(token)
        && !TypeUtils.isEmptyStr(token)) {
        return <JWTInstance>JWT.decode(<string>token, { complete : true});
    } else {
        return null;
    }
}
