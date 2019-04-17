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
const Path = require("path");
const Process = require("process");
const TypeUtils = require("./TypeUtils");
const FSP = require("./FSPromise");
function CheckPathExists(path) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!TypeUtils.isString(path)
            || TypeUtils.isEmptyStr(path)) {
            return false;
        }
        let AbsolutePath = path;
        if (Path.isAbsolute(path) === false) {
            let BasePath = Process.cwd();
            AbsolutePath = Path.join(BasePath, path);
        }
        let IsExists = yield FSP.Access(AbsolutePath);
        if (IsExists === true) {
            return true;
        }
        return false;
    });
}
exports.CheckPathExists = CheckPathExists;
function GetAbsolutePath(path) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!TypeUtils.isString(path)
            || TypeUtils.isEmptyStr(path)) {
            return "";
        }
        let AbsolutePath = path;
        if (Path.isAbsolute(path) === false) {
            let BasePath = Process.cwd();
            AbsolutePath = Path.join(BasePath, path);
        }
        let IsExists = yield FSP.Access(AbsolutePath, undefined);
        if (IsExists === true) {
            return AbsolutePath;
        }
        return "";
    });
}
exports.GetAbsolutePath = GetAbsolutePath;
/**
 * 判断路径是否在rootDir下，rootDir会转换为绝对路径
 * @param rootDir 根路径
 * @param path 需要判断的路径
 */
function PathInsideAc(rootDir, path) {
    return __awaiter(this, void 0, void 0, function* () {
        rootDir = yield GetAbsolutePath(rootDir);
        return PathInside(rootDir, path);
    });
}
exports.PathInsideAc = PathInsideAc;
/**
 * 判断路径是否在rootDir下
 * @param rootDir 根路径
 * @param path 需要判断的路径
 */
function PathInside(rootDir, path) {
    if (rootDir === "") {
        rootDir = process.cwd();
    }
    let TempPath = Path.resolve(rootDir, path);
    let CurReg = new RegExp('^' + rootDir.replace(/\\/g, '\\\\'), "g");
    let MatchRes = CurReg.exec(TempPath);
    if (null === MatchRes
        || MatchRes[0] !== rootDir
        || MatchRes.index !== 0) {
        return false;
    }
    return true;
}
exports.PathInside = PathInside;
//# sourceMappingURL=PathUtils.js.map