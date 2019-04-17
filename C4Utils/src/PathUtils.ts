import Path         = require('path');
import Process      = require('process');
import TypeUtils    = require('./TypeUtils');
import FSP          = require('./FSPromise');

export async function CheckPathExists(path : string) {
    if (!TypeUtils.isString(path)
        || TypeUtils.isEmptyStr(path)) {
        return false;
    }

    let AbsolutePath    = path;
    if (Path.isAbsolute(path) === false) {
        let BasePath    = Process.cwd();
        AbsolutePath    = Path.join(BasePath, path);
    }

    let IsExists    = await FSP.Access(AbsolutePath);
    if (IsExists === true) {
        return true;
    }

    return false;
}

export async function GetAbsolutePath(path : string) {
    if (!TypeUtils.isString(path)
        || TypeUtils.isEmptyStr(path)) {
        return ""
    }

    let AbsolutePath    = path;
    if (Path.isAbsolute(path) === false) {
        let BasePath    = Process.cwd();
        AbsolutePath    = Path.join(BasePath, path);
    }

    let IsExists    = await FSP.Access(AbsolutePath, undefined);
    if (IsExists === true) {
        return AbsolutePath;
    }

    return "";
}

/**
 * 判断路径是否在rootDir下，rootDir会转换为绝对路径
 * @param rootDir 根路径
 * @param path 需要判断的路径
 */
export async function PathInsideAc(rootDir : string, path : string) {
    rootDir = await GetAbsolutePath(rootDir);
    return PathInside(rootDir, path);
}

/**
 * 判断路径是否在rootDir下
 * @param rootDir 根路径
 * @param path 需要判断的路径
 */
export function PathInside(rootDir : string, path : string) {
    if (rootDir === "") {
        rootDir = process.cwd();
    }

    let TempPath    = Path.resolve(rootDir, path);
    let CurReg      = new RegExp('^' + rootDir.replace(/\\/g, '\\\\'), "g");
    let MatchRes    = CurReg.exec(TempPath);
    if (null === MatchRes
        || MatchRes[0] !== rootDir
        || MatchRes.index !== 0) {
        return false;
    }

    return true;
}
