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
};
Object.defineProperty(exports, "__esModule", { value: true });
const C4AJV_1 = __importDefault(require("./C4AJV"));
const Yaml = require("js-yaml");
const c4utils_1 = require("c4utils");
function Launch() {
    return __awaiter(this, void 0, void 0, function* () {
        let CurAJV = new C4AJV_1.default();
        yield CurAJV.init('./schema');
        // http://weds.com/C4Framework/ConfiggerConfig.json
        let doc = null;
        try {
            // let data = await FSP.ReadFile('./Configger.yml', {
            //     encoding : 'utf8',
            //     flag : 'r'
            // });
            let data = yield c4utils_1.FSP.ReadFile('./C4Logger.yml', {
                encoding: 'utf8',
                flag: 'r'
            });
            doc = Yaml.safeLoad(data);
            // doc.ConfigService.push({
            //     host : '123'
            // })
            // let Res = CurAJV.validate('http://weds.com/C4Framework/ConfiggerConfig.json', doc);
            let Res = CurAJV.validate('http://weds.com/C4Framework/LoggerConfig.json', doc);
            console.log(Res);
        }
        catch (error) {
            console.log(error);
        }
    });
}
Launch();
//# sourceMappingURL=main.js.map