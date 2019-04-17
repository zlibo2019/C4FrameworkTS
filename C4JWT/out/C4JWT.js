"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const JWT = require("jsonwebtoken");
const BaseMemoryStore_1 = __importDefault(require("./JWTUtils/BaseMemoryStore"));
const c4utils_1 = require("c4utils");
const uuid_1 = require("uuid");
const Crypto = require("crypto");
/**
 * # 支持配置密钥组
 * # 支持对payload进行加密
 * # 支持RSA加密
 * # 支持对撤销的token进行存储，在verify token时使用
 */
class C4JWT {
    constructor() {
        this.m_Keys = {};
        this.m_PayloadKeys = {};
        this.m_PayloadAlgorithm = 'aes-256-cbc';
        this.m_Algorithm = "HS256";
        this.m_ExpiresIn = "24h";
        this.m_ClockTolerance = 0;
        this.m_NotBefore = undefined;
        this.m_Issuer = "Default_Issuer";
        this.m_Subject = undefined;
        this.m_Store = undefined;
        this.m_UseKeyFile = false;
    }
    // new RegExp('[-BEGIN\s\S+PRIVATE KEY-]', 'g')
    init(config) {
        return __awaiter(this, void 0, void 0, function* () {
            this.m_Algorithm = config.algorithm || "HS256";
            let CheckAlg = new RegExp("^[RE]S\\d+$", 'g');
            let CheckRes = CheckAlg.exec(this.m_Algorithm);
            if (null === CheckRes) {
                // HS算法使用Keys
                if (c4utils_1.TypeUtils.isObject(config.keys) && c4utils_1.TypeUtils.isEmptyObj(config.keys)
                    || c4utils_1.TypeUtils.isArray(config.keys) && c4utils_1.TypeUtils.isEmptyStr(config.keys)) {
                    console.warn("C4JWT init use default key : 'DEFAULT_KEY'.");
                    this.m_Keys["0"] = "DEFAULT_KEY";
                }
                else {
                    let Keys = Object.keys(config.keys);
                    for (let i = 0; i < Keys.length; i++) {
                        this.m_Keys[Keys[i]] = config.keys[Keys[i]];
                    }
                    if (c4utils_1.TypeUtils.isEmptyObj(this.m_Keys)) {
                        console.warn("C4JWT init use default key : 'DEFAULT_KEY'.");
                        this.m_Keys["0"] = "DEFAULT_KEY";
                    }
                }
            }
            else {
                // RS或ES算法，使用KeyFiles
                if (c4utils_1.TypeUtils.isObject(config.keyFiles) && c4utils_1.TypeUtils.isEmptyObj(config.keyFiles)) {
                    console.error("C4JWT init can't get any pem.");
                    throw Error("C4JWT init can't get any pem.");
                }
                else {
                    let CurKey = {
                        privateKey: "",
                        publicKey: ""
                    };
                    let Keys = Object.keys(config.keyFiles);
                    for (let i = 0; i < Keys.length; i++) {
                        let CurPriKey = config.keyFiles[Keys[i]].privateKey;
                        let CurPubKey = config.keyFiles[Keys[i]].publicKey;
                        let CurPass = config.keyFiles[Keys[i]].passphrase;
                        let IsPem = (new RegExp('-BEGIN[\\s\\S]+PRIVATE[\\s\\S]+KEY-', 'g')).exec(CurPriKey);
                        if (null === IsPem) {
                            // load from file;
                            CurKey.privateKey = yield loadKeyFromFile(CurPriKey);
                        }
                        IsPem = (new RegExp('-BEGIN[\\s\\S]+PUBLIC[\\s\\S]+KEY-', 'g')).exec(CurPubKey);
                        if (null === IsPem) {
                            // load from file;
                            CurKey.publicKey = yield loadKeyFromFile(CurPubKey);
                        }
                        if (!c4utils_1.TypeUtils.isEmptyStr(CurPass)) {
                            CurKey.passphrase = CurPass;
                        }
                        this.m_Keys[Keys[i]] = CurKey;
                    }
                    this.m_UseKeyFile = true;
                    if (c4utils_1.TypeUtils.isEmptyObj(this.m_Keys)) {
                        console.warn("C4JWT init use default key : 'DEFAULT_KEY'.");
                        this.m_Keys["0"] = "DEFAULT_KEY";
                        this.m_UseKeyFile = false;
                    }
                }
            }
            // load payload keys
            this.m_PayloadAlgorithm = config.payloadAlgorithm.toLowerCase();
            let Keys = Object.keys(config.payloadKeys);
            for (let i = 0; i < Keys.length; i++) {
                this.m_PayloadKeys[Keys[i]] = config.payloadKeys[Keys[i]];
                if (!checkKeyAndIV(this.m_PayloadKeys[Keys[i]].key, this.m_PayloadKeys[Keys[i]].iv, this.m_PayloadAlgorithm)) {
                    console.error(`C4JWT init payload algorithm ${this.m_PayloadAlgorithm}, key or iv has bad length.`);
                    throw Error(`C4JWT init payload algorithm ${this.m_PayloadAlgorithm}, key or iv has bad length.`);
                }
            }
            if (c4utils_1.TypeUtils.isEmptyObj(this.m_PayloadKeys)) {
                console.warn("C4JWT init use default algorithm : 'aes-256-cbc', payload key : 'DEFAULT_PAYLOAD_KEY_012345678901', iv : 'DEFAULT_IV_01234'.");
                this.m_PayloadAlgorithm = "aes-256-cbc";
                this.m_PayloadKeys["0"].key = "DEFAULT_PAYLOAD_KEY_012345678901";
                this.m_PayloadKeys["0"].iv = "DEFAULT_IV_01234";
            }
            this.m_ExpiresIn = config.expiresIn || "24h";
            this.m_NotBefore = config.notBefore;
            this.m_Issuer = config.issuer;
            this.m_Subject = config.subject;
            this.m_ClockTolerance = config.clockTolerance || 0;
            if (c4utils_1.TypeUtils.isEmptyObj(config.store)) {
                this.m_Store = new BaseMemoryStore_1.default();
                yield this.m_Store.init({});
            }
            else {
                this.m_Store = config.store;
            }
        });
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
    setJWT(payload, key, value) {
        if (c4utils_1.TypeUtils.isEmptyObj(payload)) {
            let a = {};
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
    getJWT(payload, key) {
        if (c4utils_1.TypeUtils.isEmptyObj(payload)) {
            return undefined;
        }
        return payload[key];
    }
    /**
     * 校验Token
     * @param token JWT串
     */
    verifyJWT(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let CurJWT;
            CurJWT = decodeToken(token);
            if (null === CurJWT) {
                return {
                    verifyRes: false,
                    jwt: null
                };
            }
            // 验证Token
            let Self = this;
            let CurKey = "";
            if (this.m_UseKeyFile) {
                CurKey = Self.m_Keys[(CurJWT.header.kid)].publicKey;
            }
            else {
                CurKey = Self.m_Keys[(CurJWT.header.kid)];
            }
            let VerifyRes = yield new Promise((resolve, reject) => {
                JWT.verify(token, CurKey, {
                    algorithms: [Self.m_Algorithm],
                    issuer: Self.m_Issuer,
                    subject: Self.m_Subject,
                    clockTolerance: Self.m_ClockTolerance
                }, (err, decoded) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(decoded);
                });
            }).catch((err) => {
                throw err;
            });
            // 检查token是否提前撤销了
            // 之所以放到Verify后面，防止伪造
            let CurJTI = CurJWT.payload.jti;
            if (!c4utils_1.TypeUtils.isEmptyStr(CurJTI)) {
                let isRevoked = yield this.m_Store.get(CurJTI);
                if (!c4utils_1.TypeUtils.isEmptyObj(isRevoked)) {
                    return {
                        verifyRes: false,
                        jwt: null
                    };
                }
            }
            // 解密payload
            let CurPalg = VerifyRes.palg;
            let CurPKeyid = VerifyRes.pkeyid;
            let CurPdata = VerifyRes.pdata;
            if (this.m_PayloadAlgorithm !== CurPalg) {
                return {
                    verifyRes: false,
                    jwt: null
                };
            }
            let CurPKey = this.m_PayloadKeys[CurPKeyid];
            if (c4utils_1.TypeUtils.isEmptyObj(CurPKey)) {
                return {
                    verifyRes: false,
                    jwt: null
                };
            }
            let Decipher = Crypto.createDecipheriv(this.m_PayloadAlgorithm, CurPKey.key, CurPKey.iv);
            let Decrypted = Decipher.update(CurPdata, 'hex', 'utf8');
            Decrypted += Decipher.final('utf8');
            try {
                CurPdata = JSON.parse(Decrypted);
            }
            catch (error) {
                console.error(error);
                return {
                    verifyRes: false,
                    jwt: null
                };
            }
            VerifyRes.pdata = CurPdata;
            return {
                verifyRes: true,
                jwt: VerifyRes
            };
        });
    }
    /**
     * 撤销Token，将撤销的Token的jti写入存储，并设置超时
     * @param jti token的ID
     */
    revokeJWT(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (c4utils_1.TypeUtils.isString(token)) {
                if (c4utils_1.TypeUtils.isEmptyStr(token)) {
                    return false;
                }
                let VerifyRes = null;
                try {
                    VerifyRes = yield this.verifyJWT(token);
                }
                catch (error) {
                    return false;
                }
                if (!VerifyRes.verifyRes)
                    return false;
                return yield this.m_Store.set(VerifyRes.jwt.jti, VerifyRes.jwt);
            }
            else {
                return yield this.m_Store.set(token.payload.jti, token.payload);
            }
        });
    }
    /**
     * 刷新Token，用来给Token续命
     * @param token
     */
    refreshJWT(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (c4utils_1.TypeUtils.isString(token)) {
                if (c4utils_1.TypeUtils.isEmptyStr(token)) {
                    throw Error("Token is empty string.");
                }
                let VerifyRes = null;
                try {
                    VerifyRes = yield this.verifyJWT(token);
                }
                catch (error) {
                    throw error;
                }
                if (!VerifyRes.verifyRes) {
                    throw Error("Token is invalid。");
                }
                return this.generateJWT(VerifyRes.jwt.aud, VerifyRes.jwt.pdata, VerifyRes.jwt.jti);
            }
            else {
                return this.generateJWT(token.payload.aud, token.payload.pdata, token.payload.jti);
            }
        });
    }
    /**
     * 创建一个JWT
     * @param audience 使用者
     * @param payload  载荷
     * @param keyID    签名的Key的ID，不设置默认使用第一个或者使用随机方法
     * @param jwtid    jwt的ID(建议使用UUID)
     */
    generateJWT(audience, payload, jwtid, keyID) {
        return __awaiter(this, void 0, void 0, function* () {
            let CurKeyID = keyID || ""; // 随机获取keyID
            let CurJTI = jwtid || (yield C4JWT.getJWTID());
            let Self = this;
            let CurKeys = this.getKeyIDs();
            let RandomIndex = parseInt((Math.random() * CurKeys.length) + "");
            CurKeyID = CurKeys[RandomIndex];
            let CurKey = this.m_Keys[CurKeyID];
            if (this.m_UseKeyFile) {
                if (CurKey.passphrase) {
                    CurKey = {
                        key: CurKey.privateKey,
                        passphrase: CurKey.passphrase
                    };
                }
                else {
                    CurKey = CurKey.privateKey;
                }
            }
            let CurPayload = {
                random: Math.random()
            };
            let PayloadProps = [];
            if (c4utils_1.TypeUtils.isString(payload)) {
                try {
                    payload = JSON.parse(payload);
                }
                catch (error) {
                    payload = {
                        data: payload
                    };
                }
            }
            PayloadProps = Object.keys(payload);
            for (let i = 0; i < PayloadProps.length; i++) {
                CurPayload[PayloadProps[i]] = payload[PayloadProps[i]];
            }
            CurPayload["random"] = Math.random(); // 加入随机数
            // 获取随机的的加密key
            let PayloadKeys = Object.keys(this.m_PayloadKeys);
            RandomIndex = parseInt((Math.random() * PayloadKeys.length) + "");
            let PayloadKey = this.m_PayloadKeys[PayloadKeys[RandomIndex]];
            // 加密payload
            let Cipher = Crypto.createCipheriv(this.m_PayloadAlgorithm, PayloadKey.key, PayloadKey.iv);
            let Encrypted = Cipher.update(JSON.stringify(CurPayload), 'utf8', 'hex');
            Encrypted += Cipher.final('hex');
            // 构造payload
            let OutPayload = {
                palg: this.m_PayloadAlgorithm,
                pkeyid: PayloadKeys[RandomIndex],
                pdata: Encrypted
            };
            let SignOpt = {
                algorithm: Self.m_Algorithm,
                expiresIn: Self.m_ExpiresIn,
                audience: audience,
                issuer: Self.m_Issuer || "",
                subject: Self.m_Subject,
                keyid: CurKeyID,
                jwtid: CurJTI
            };
            if (Self.m_NotBefore) {
                SignOpt["notBefore"] = Self.m_NotBefore;
            }
            let Token = JWT.sign(OutPayload, CurKey, SignOpt);
            return Token;
        });
    }
    /**
     * 创建一个JWTID（UUID）
     */
    static getJWTID() {
        return __awaiter(this, void 0, void 0, function* () {
            return uuid_1.v4();
        });
    }
}
exports.default = C4JWT;
function loadKeyFromFile(path) {
    return __awaiter(this, void 0, void 0, function* () {
        let IsInside = yield c4utils_1.PathUtils.PathInsideAc(process.cwd(), path);
        let ReadRes = yield c4utils_1.FSP.ReadFile(yield c4utils_1.PathUtils.GetAbsolutePath(path), {
            flag: "r",
            encoding: "utf8"
        });
        return ReadRes;
    });
}
function checkKeyAndIV(key, iv, algType) {
    if (algType === "aes-256-cbc") {
        if (key.length !== 32
            || iv.length !== 16) {
            return false;
        }
    }
    else if (algType === "des-ede3-cbc") {
        if (key.length !== 24
            || iv.length !== 8) {
            return false;
        }
    }
    else {
        return false;
    }
    return true;
}
function decodeToken(token) {
    if (c4utils_1.TypeUtils.isString(token)
        && !c4utils_1.TypeUtils.isEmptyStr(token)) {
        return JWT.decode(token, { complete: true });
    }
    else {
        return null;
    }
}
exports.decodeToken = decodeToken;
//# sourceMappingURL=C4JWT.js.map