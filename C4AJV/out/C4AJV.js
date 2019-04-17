"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AJV = require("ajv");
const Path = require("path");
const Yaml = require("js-yaml");
const c4utils_1 = require("c4utils");
const StripJsonComments = require("strip-json-comments");
// 从schema目录下递归加载所有类型的Schema并编译
// Schema文件类型可能是json或yml格式
class C4AJV {
    constructor() {
        this.m_ajv = null;
    }
    init(loadPath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.m_ajv === null) {
                this.m_ajv = new AJV();
            }
            let CurPath = "";
            if (c4utils_1.TypeUtils.isString(loadPath)) {
                CurPath = yield c4utils_1.PathUtils.GetAbsolutePath(loadPath);
            }
            if (CurPath === "") {
                CurPath = yield c4utils_1.PathUtils.GetAbsolutePath('./schema');
            }
            let Self = this;
            // 遍历添加和解析
            yield c4utils_1.FSP.ForeachFiles(process.cwd(), CurPath, (err, curDir, file) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.log(err);
                    return;
                }
                let CurAbPath = Path.join(curDir, file);
                let Res = Path.parse(CurAbPath);
                if (Res.ext.toLowerCase() !== '.json'
                    && Res.ext.toLowerCase() !== '.yml'
                    && Res.ext.toLowerCase() !== '.yaml') {
                    return;
                }
                let TempSchema = null;
                let tempData;
                try {
                    // 读文件
                    tempData = (yield c4utils_1.FSP.ReadFile(CurAbPath, {
                        flag: 'r',
                        encoding: 'utf8'
                    }));
                    if (Res.ext.toLowerCase() === '.yml'
                        || Res.ext.toLowerCase() === '.yaml') {
                        // yml解析为js对象
                        TempSchema = Yaml.safeLoad(tempData);
                    }
                    else {
                        // json解析为js对象
                        TempSchema = JSON.parse(StripJsonComments(tempData));
                    }
                    if (!c4utils_1.TypeUtils.isString(TempSchema["$id"])
                        || c4utils_1.TypeUtils.isEmptyStr(TempSchema["$id"])) {
                        return;
                    }
                    // 获取schema文件中的id
                    let id = Path.parse(TempSchema["$id"]).name;
                    if (Self.m_ajv !== null) {
                        // 添加schema
                        Self.m_ajv.addSchema(TempSchema, id);
                    }
                }
                catch (error) {
                    console.log(error);
                    return;
                }
            }));
        });
    }
    addSchema(key, schema) {
        if (null === this.m_ajv) {
            throw new Error('C4AJV not init.');
        }
        if (!c4utils_1.TypeUtils.isString(key)
            || c4utils_1.TypeUtils.isEmptyStr(key)
            || c4utils_1.TypeUtils.isEmptyObj(schema)) {
            throw new Error('C4AJV bad params.');
        }
        if (!c4utils_1.TypeUtils.isString(schema["$id"])
            || c4utils_1.TypeUtils.isEmptyStr(schema["$id"])) {
            throw new Error('C4AJV bad schema format, not find $id.');
        }
        // 获取schema文件中的id
        let id = Path.parse(schema["$id"]).name;
        try {
            this.m_ajv.addSchema(schema, id);
        }
        catch (error) {
            throw error;
        }
    }
    removeSchema(key) {
        if (null === this.m_ajv) {
            throw new Error('C4AJV not init.');
        }
        if (!c4utils_1.TypeUtils.isString(key)
            || c4utils_1.TypeUtils.isEmptyStr(key)) {
            throw new Error('C4AJV bad params.');
        }
        this.m_ajv.removeSchema(key);
    }
    getSchema(key) {
        if (null === this.m_ajv) {
            throw new Error('C4AJV not init.');
        }
        if (!c4utils_1.TypeUtils.isString(key)
            || c4utils_1.TypeUtils.isEmptyStr(key)) {
            throw new Error('C4AJV bad params.');
        }
        return this.m_ajv.getSchema(key);
    }
    validate(key, data) {
        if (null === this.m_ajv) {
            throw new Error('C4AJV not init.');
        }
        if (!c4utils_1.TypeUtils.isString(key)
            || c4utils_1.TypeUtils.isEmptyStr(key)) {
            throw new Error('C4AJV bad params.');
        }
        try {
            let CurSchema = this.m_ajv.getSchema(key);
            let Res = CurSchema(data);
            return Res;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
exports.default = C4AJV;
//# sourceMappingURL=C4AJV.js.map