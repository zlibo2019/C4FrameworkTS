<h1>JWT规范</h1>
### JWT结构

```

// 支持的签名算法
export type JWTAlgorithm = "HS256" | "HS384" | "HS512" | "RS256" | "RS384" | "RS512" | "ES256" | "ES384" | "ES512";

// 支持的Payload加密算法
export type JWTPayloadAlgorithm = "aes-256-cbc" | "des-ede3-cbc";

// JWT结构
export interface JWTInstance {
    header : {
        alg  : JWTAlgorithm;    // 签名算法
        typ  : "JWT";
        kid  : string;          // 签名的Key的ID
    };
    payload : {
        palg    : JWTPayloadAlgorithm;  // 加密算法
        pkeyid  : string;               // 加密的Key的ID
        pdata   : string;               // 加密后的数据，其中要在原始数据中增加random字段，来保存随机数，数据采用hex表示（注意，字母要小写，并且不是Base64）
        iat     : number;               // token创建时间（unix时间戳ms）
        exp     : number;               // token过期时间（unix时间戳ms）
        aud     : string;               // 接收者
        iss     : string;               // 发布者
        sub     : string;               // 主题
        jti     : string;               // JWT的ID
    };
    signature : string;                 // 签名串
}
​
```

### 签名算法
1.对于HS系列算法，可以使用任意长度的字符串作为签名的Key;

2.对于HS系列算法，签名和验证使用相同的Key;

3.对于RS和ES算法，需要使用公钥私钥对作为签名的Key和验证的Key；

4.对于RS和ES算法，签名使用私钥，验证使用公钥；

### Payload加密算法

1.支持的加密算法有aes-256-cbc和des-ede3-cbc；

2.aes-256-cbc使用32字节（256bits）的Key，16字节（128bits）的IV；

3.des-ede3-cbc使用24字节（192bits）的key，8字节（64bits）的IV；

### 默认值
1.签名默认使用HS256算法，默认密钥为DEFAULT_KEY；

2.Payload加密默认采用aes-256-cbc算法，默认密钥为DEFAULT_PAYLOAD_KEY_012345678901，默认IV为DEFAULT_IV_01234；

3.Payload的pdata中至少包含userID数据，其他数据可以根据应用自行添加；

### Token撤销
1.Token撤销采用黑名单机制，生产环境将已经撤销还未失效（超时）的Token存入Redis中，当进行Token校验时，首先校验Token的真伪和有效性，
然后从Redis中检查是否撤销；

2.在Redis中存储时，使用jwt_(jti)作为key，采用String类型，其中jti采用UUID（v4）生成；

### 举例
当前配置

```
{
        keys : [                            // 签名的Key数组，支持多组Key
            "123",
            "456"
        ],
        algorithm : "HS256",                // 签名算法
        expiresIn : "2h",
        issuer : "WEDS",
        subject : "Test",
        clockTolerance : 30,
        store : CurRedisStore,
        payloadAlgorithm : "aes-256-cbc",   // 加密算法
        payloadKeys : {                     // 加密的Key数组
            "0" : {
                key : "01234567890123456789012345678901",
                iv : "0123456789012345"
            },
            "1" : {
                key : "12345678901234567890123456789012",
                iv : "1234567890123456"
            }
        }
    }

```

Payload

<font color=#ff0000 size=3 face="黑体">注意：pdata中random一定要在其他属性之前</font>

```
{
    "palg": "aes-256-cbc",
    "pkeyid": "1",
    "pdata": {
        "random": 0.06610290085788617       // 自动插入的随机数
        "userID": "0123456789",             // 实际写入的数据
    },
    "iat": 1528190077,
    "exp": 1528197277,
    "aud": "TestUser",
    "iss": "WEDS",
    "sub": "Test",
    "jti": "fb92817b-a3c0-4416-9af9-5a0316cde7dc"
}

```
JWT（生成的结果，KeyID ： 0，使用的“123”用于签名，pkeyID ： “1”）
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjAifQ.eyJwYWxnIjoiYWVzLTI1Ni1jYmMiLCJwa2V5aWQiOiIxIiwicGRhdGEiOiI2OTFlMzFkMGEwNzdmYmIzMzM4Y2I1YTgyODYyOTNmZjgzYjNjNGQ3Y2FjNTgyYmIzOGM0NmU3MzViMGM2NGE2NjIyNjRjYjMwYWY4YjI4MzdiN2Q2NWUxMTM4NzJiNDJkMjQyNjAxZjA4YzdiYzY1YjUyNmNhMWU1YWJjNjZlNCIsImlhdCI6MTUyODE5MDA3NywiZXhwIjoxNTI4MTk3Mjc3LCJhdWQiOiJUZXN0VXNlciIsImlzcyI6IldFRFMiLCJzdWIiOiJUZXN0IiwianRpIjoiZmI5MjgxN2ItYTNjMC00NDE2LTlhZjktNWEwMzE2Y2RlN2RjIn0.iY9Od9lkpyFdPWfB43SCyBtiIVCxVgdYu8MHLxg_KBw
```
```
{
    "alg":"HS256",
    "typ":"JWT",
    "kid":"0"
}.{
    "palg":"aes-256-cbc",
    "pkeyid":"1",
    "pdata":"691e31d0a077fbb3338cb5a8286293ff83b3c4d7cac582bb38c46e735b0c64a662264cb30af8b2837b7d65e113872b42d242601f08c7bc65b526ca1e5abc66e4",
    "iat":1528190077,
    "exp":1528197277,
    "aud":"TestUser",
    "iss":"WEDS",
    "sub":"Test",
    "jti":"fb92817b-a3c0-4416-9af9-5a0316cde7dc"
}.iY9Od9lkpyFdPWfB43SCyBtiIVCxVgdYu8MHLxg_KBw
```

<h2>JWT失效/登录控制规范</h2>

### JWT失效黑名单  
JWT在签发token时，设置有效期后，无法对已失效的token进行失效处理，本规范在章节七中的token撤销基础上进行微调，以适应更多场景。  
1.所有微服务在校验token失效时，会校验两种规则，一是该用户是否是在某个应用下（app_no）token失效,二是该用户是否在整个系统下token失效。  
2.redis中存入某个应用下的token失效黑名单（值类型为string），key的命名规范为：用户ID+aud+invalid。值为token。  
3.redis中存入系统下该用户所有token失效黑名单（值类型为string），key的命名规范为：用户ID+invalid。  
__写入失效黑名单场景：__   
1.注销操作时，针对某个应用写入（有效期同token有效期）。  
2.删除系统用户时，针对系统下所有用户写入。  
3.登录时，如果已经存在登录用户，把原来用户的token写入黑名单。   
__校验token是否有效场景:__  
1.请求接口数据，微服务解析token成功后，再验证token黑名单，包括"用户ID+aud+invalid"&&"用户ID+invalid"。包括是否存在该key，以及前台传过来的token与redis中的是否一样（判断是否强制老用户下线，下面有解释）。  
__删除token黑名单场景：__  
1.登录时删除。  
### JWT登录黑名单  
可针对某些需要登录控制的应用，配置该黑名单，无登录控制的应用，忽律该规则即可。  
1.redis中存入某个应用下的登录黑名单（值为string），key的命名规范为：用户ID+aud+login。  
__写入登录黑名单场景：__  
1.登录成功后写入。（有效期同token有效期）  
__校验登录黑名单场景：__  
1.每次登录时校验。  
__删除登录黑名单场景：__  
1.注销时删除。  
##### 注：  
1.jwt规范中jti存入的值改为用户ID+aud+login  
2.用户已经登录时，允许当前新登录用户登录，使原登录用户token失效。具体实现为：  
从 用户ID+aud+login中获取到token，写入到 用户ID+aud+invalid中。