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
const C4RESTFulClient_1 = __importDefault(require("./C4RESTFulClient"));
function Launch() {
    return __awaiter(this, void 0, void 0, function* () {
        let CurClient = new C4RESTFulClient_1.default();
        CurClient.init();
        CurClient.init({
            mimetypes: {
                json: ["application/json", "application/json;charset=utf-8"],
                xml: ["application/xml", "application/xml;charset=utf-8"],
                text: ["", ""]
            }
        });
        CurClient.addParser({
            name: "text",
            contentTypes: ["text/html", "text/xml"],
            isDefault: true,
            parse: function (byteBuffer, nrcEventEmitter, parsedCallback) {
                var data = byteBuffer.toString();
                parsedCallback(data);
            }
        });
        CurClient.registerMethod('baidu', 'https://wwww.baidu.com', "GET");
        CurClient.registerMethod('config', 'http://localhost:9001/test', "GET");
        let Res = yield Promise.all([
            CurClient.methods('baidu', {
                requestConfig: {
                    rejectUnauthorized: true
                }
            }).catch((err) => {
                console.log(err);
                return {};
            }) /*,
            (<Promise<{}>>CurClient.methods('config', <C4RESTFulClientRequestConfig>{
                requestConfig : {
                    timeout : 1000
                },
                responseConfig : {
                    timeout : 1000
                }
            })).catch((err) => {
                console.log(err);
                return null;
            })*/
        ]).catch((err) => {
            console.log(err);
        });
        console.log(Res);
        // let Res = await CurClient.methods("baidu");
        // console.log(Res);
        // CurClient.registerMethod('config', 'http://localhost:7001/app01/dev', "GET");
        // let Config = await CurClient.methods('config');
        // console.log(Config);
    });
}
Launch().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=main.js.map