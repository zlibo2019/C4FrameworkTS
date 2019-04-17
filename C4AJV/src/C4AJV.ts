import AJV      = require('ajv');
import Path     = require('path');
import Yaml     = require('js-yaml');

import { FSP, PathUtils, TypeUtils } from 'c4utils';

import StripJsonComments = require('strip-json-comments');

// 从schema目录下递归加载所有类型的Schema并编译
// Schema文件类型可能是json或yml格式

export default class C4AJV {

    private m_ajv   : AJV.Ajv | null;

    constructor() {
        this.m_ajv  = null;
    }

    async init(loadPath ?: string) {
        if (this.m_ajv === null) {
            this.m_ajv  = new AJV();
        }
        let CurPath     = "";
        if (TypeUtils.isString(loadPath)) {
            CurPath    = await PathUtils.GetAbsolutePath(<string>loadPath);
        }
        if (CurPath === "") {
            CurPath     = await PathUtils.GetAbsolutePath('./schema');
        }

        let Self = this;
        // 遍历添加和解析
        await FSP.ForeachFiles(process.cwd(), CurPath, async (err, curDir, file) => {
            if (err) {
                console.log(err);
                return;
            }
            let CurAbPath   = Path.join(<string>curDir, <string>file);
            let Res = Path.parse(CurAbPath);
            if (Res.ext.toLowerCase() !== '.json'
                && Res.ext.toLowerCase() !== '.yml'
                && Res.ext.toLowerCase() !== '.yaml') {
                return;
            }

            let TempSchema  = null;
            let tempData : string;
            try {
                // 读文件
                tempData = <string>await FSP.ReadFile(CurAbPath, {
                    flag: 'r',
                    encoding: 'utf8'
                });
                if (Res.ext.toLowerCase() === '.yml'
                    || Res.ext.toLowerCase() === '.yaml') {
                    // yml解析为js对象
                    TempSchema  = Yaml.safeLoad(tempData);
                } else {
                    // json解析为js对象
                    TempSchema  = JSON.parse(StripJsonComments(tempData));
                }
                if (!TypeUtils.isString(TempSchema["$id"])
                    || TypeUtils.isEmptyStr(TempSchema["$id"])) {
                    return;
                }
                // 获取schema文件中的id
                let id = Path.parse(TempSchema["$id"]).name;
                if (Self.m_ajv !== null) {
                    // 添加schema
                    Self.m_ajv.addSchema(TempSchema, id);
                }
            } catch (error) {
                console.log(error);
                return;
            }
        });
    }

    addSchema(key : string, schema : any) {
        if (null === this.m_ajv) {
            throw new Error('C4AJV not init.');
        }

        if (!TypeUtils.isString(key)
            || TypeUtils.isEmptyStr(key)
            || TypeUtils.isEmptyObj(schema)) {
            throw new Error('C4AJV bad params.');
        }

        if (!TypeUtils.isString(schema["$id"])
            || TypeUtils.isEmptyStr(schema["$id"])) {
            throw new Error('C4AJV bad schema format, not find $id.');
        }
        // 获取schema文件中的id
        let id = Path.parse(schema["$id"]).name;

        try {
            this.m_ajv.addSchema(schema, id);
        } catch (error) {
            throw error;
        }
    }

    removeSchema(key : string) {
        if (null === this.m_ajv) {
            throw new Error('C4AJV not init.');
        }
        if (!TypeUtils.isString(key)
            || TypeUtils.isEmptyStr(key)) {
            throw new Error('C4AJV bad params.');
        }

        this.m_ajv.removeSchema(key);
    }

    getSchema(key : string) {
        if (null === this.m_ajv) {
            throw new Error('C4AJV not init.');
        }
        if (!TypeUtils.isString(key)
            || TypeUtils.isEmptyStr(key)) {
            throw new Error('C4AJV bad params.');
        }

        return this.m_ajv.getSchema(key);
    }

    validate(key : string, data : object) {
        if (null === this.m_ajv) {
            throw new Error('C4AJV not init.');
        }
        if (!TypeUtils.isString(key)
            || TypeUtils.isEmptyStr(key)) {
            throw new Error('C4AJV bad params.');
        }

        try {
            let CurSchema = this.m_ajv.getSchema(key);
            let Res = CurSchema(data);
            return Res;
        } catch (error) {
            console.log(error);
            return false
        }
    }
}
