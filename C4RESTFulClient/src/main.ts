import C4RESTFulClient          from './C4RESTFulClient';
import { C4RESTFulClientConfig, C4RESTFulClientRequestConfig }  from './C4RESTFulClientConfig';

async function Launch() {
    let CurClient   = new C4RESTFulClient();
    CurClient.init();
    CurClient.init(<C4RESTFulClientConfig>{
        mimetypes : {
            json : ["application/json", "application/json;charset=utf-8"],
            xml : ["application/xml", "application/xml;charset=utf-8"],
            text : [ "", ""]
        }
    });
    CurClient.addParser({
        name : "text",
        contentTypes : ["text/html", "text/xml"],
        isDefault : true,
        parse: function(byteBuffer : Buffer, nrcEventEmitter : any, parsedCallback : any) {
            var data = byteBuffer.toString();

            parsedCallback(data);
        }
    })
    CurClient.registerMethod('baidu', 'https://wwww.baidu.com', "GET");
    CurClient.registerMethod('config', 'http://localhost:9001/test', "GET");
    let Res = await Promise.all([
        (<Promise<{}>>CurClient.methods('baidu', <any>{
            requestConfig : {
                rejectUnauthorized : true
            }})).catch((err) => {
            console.log(err);
            return {}
        })/*,
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
    })
    console.log(Res);
    // let Res = await CurClient.methods("baidu");
    // console.log(Res);
    // CurClient.registerMethod('config', 'http://localhost:7001/app01/dev', "GET");
    // let Config = await CurClient.methods('config');
    // console.log(Config);
}

Launch().catch((err) => {
    console.log(err);
});
