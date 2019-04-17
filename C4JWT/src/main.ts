import C4JWT from './C4JWT';
import Redis from "ioredis";
import { RedisStore } from '.';
import { decodeToken } from './C4JWT'

var CurJWT: C4JWT | null = null;
var RedisClient: Redis.Redis | null = null;

async function Test() {
    CurJWT = new C4JWT();
    RedisClient = new Redis(
        6379,
        "10.0.0.102",
        {
            family: 4,
            connectionName: "TestJWT",
            db: 1
        }
    )

    await new Promise((resolve, reject) => {
        (<Redis.Redis>RedisClient).on('ready', () => {
            resolve();
        });

        (<Redis.Redis>RedisClient).on('error', (err) => {
            reject(err);
        });
    }).catch((err) => {
        console.log(err);
        RedisClient = null;
    })

    if (null === RedisClient) {
        process.exit(-1);
    }

    let CurRedisStore = new RedisStore();
    await CurRedisStore.init({
        client: RedisClient,
        prefix: "jwt_",
        clockTolerance: 30
    });

    CurJWT.init({
        authField: "Token",
        keys: [
            "123",
            "456"
        ],
        algorithm: "HS256",
        expiresIn: "2h",
        issuer: "WEDS",
        subject: "Test",
        clockTolerance: 30,
        store: CurRedisStore,
        payloadAlgorithm: "aes-256-cbc",
        payloadKeys: {
            "0": {
                key: "01234567890123456789012345678901",
                iv: "0123456789012345"
            },
            "1": {
                key: "12345678901234567890123456789012",
                iv: "1234567890123456"
            }
        }
    });

    console.log("m_keys:" + CurJWT.getKeyIDs());
    let payload: any = await CurJWT.setJWT(null, "userID", "0123456789");


    let CurToken = await CurJWT.generateJWT("TestUser", payload);
    console.log("CurToken:" + CurToken);





    let VerifyToken = await CurJWT.verifyJWT(CurToken);
    console.log("----------Verify Result----------");
    console.log("VerifyToken:" + JSON.stringify(VerifyToken, null, 4));
    await Sleep(60000);
    let Token = await CurJWT.refreshJWT(CurToken);
    console.log("----------Refresh Result----------");
    console.log("decodeToken(Token):" + JSON.stringify(decodeToken(Token), null, 4));
    await CurJWT.revokeJWT(Token);
    VerifyToken = await CurJWT.verifyJWT(CurToken);
    console.log("----------Verify Result----------");
    console.log("VerifyToken:" + JSON.stringify(VerifyToken, null, 4));
}

function Sleep(ms: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms)
    })
}

Test().catch((err) => {
    console.log(err);
});
