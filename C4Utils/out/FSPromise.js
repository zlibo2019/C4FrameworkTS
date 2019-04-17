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
const FS = require("fs");
const Crypto = require("crypto");
const TypeUtils = require("./TypeUtils");
const Path = require("path");
const PathUtils = require("./PathUtils");
const glob = require("glob");
function WriteFile(filePath, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise((resolve, reject) => {
            FS.writeFile(filePath, data, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(filePath);
            });
        });
    });
}
exports.WriteFile = WriteFile;
function ReadFile(filePath, options) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield new Promise((resolve, reject) => {
            if (TypeUtils.isEmptyObj(options) === true) {
                options = {
                    flag: 'r',
                    encoding: 'utf8'
                };
            }
            FS.readFile(filePath, options, (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            });
        });
        return data;
    });
}
exports.ReadFile = ReadFile;
function Exists(AbsolutePath) {
    return __awaiter(this, void 0, void 0, function* () {
        let isExist = yield new Promise((resolve, reject) => {
            FS.exists(AbsolutePath, (exists) => {
                resolve(exists);
            });
        });
        return isExist;
    });
}
exports.Exists = Exists;
function Access(AbsolutePath, mode) {
    return __awaiter(this, void 0, void 0, function* () {
        let isAccess = yield new Promise((resolve, reject) => {
            if (TypeUtils.isEmptyObj(mode) === true) {
                mode = FS.constants.F_OK;
            }
            FS.access(AbsolutePath, mode, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
        return isAccess;
    });
}
exports.Access = Access;
function FileSize(AbsolutePath) {
    return __awaiter(this, void 0, void 0, function* () {
        let fileSize = yield new Promise((resolve, reject) => {
            FS.stat(AbsolutePath, (err, stats) => {
                if (err) {
                    return reject(err);
                }
                resolve(stats.size);
            });
        });
        return fileSize;
    });
}
exports.FileSize = FileSize;
function MD5Hash(AbsolutePath) {
    return __awaiter(this, void 0, void 0, function* () {
        let md5 = yield new Promise((resolve, reject) => {
            var Hash = Crypto.createHash('md5');
            var ReadStream = FS.createReadStream(AbsolutePath);
            ReadStream.on('data', Hash.update.bind(Hash));
            ReadStream.on('end', () => {
                var FileMD5 = Hash.digest('hex');
                resolve(FileMD5);
            });
        });
        return md5;
    });
}
exports.MD5Hash = MD5Hash;
function Stat(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        let Stats = yield new Promise((resolve, reject) => {
            FS.stat(filePath, (err, stats) => {
                if (err) {
                    return reject(err);
                }
                resolve(stats);
            });
        });
        return Stats;
    });
}
exports.Stat = Stat;
function ReadDir(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        let Files = yield new Promise((resolve, reject) => {
            FS.readdir(filePath, (err, files) => {
                if (err) {
                    return reject(err);
                }
                resolve(files);
            });
        });
        return Files;
    });
}
exports.ReadDir = ReadDir;
/**
 * 遍历指定目录下的所有文件（广度优先）
 * @param basePath 基本路径
 * @param filePath 目录路径
 * @param cb 回调方法，curDir为当前目录的完整路径，file为当前文件名
 */
function ForeachFiles(basePath, filePath, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        let WorkPath = filePath || "";
        basePath = basePath || process.cwd();
        if (Path.isAbsolute(basePath) === false) {
            basePath = process.cwd();
        }
        if (Path.isAbsolute(filePath) === false) {
            WorkPath = Path.resolve(basePath, filePath);
        }
        let DirList = [WorkPath];
        do {
            if (DirList.length === 0) {
                break;
            }
            let CurDir = DirList.shift();
            if (!TypeUtils.isString(CurDir)
                || TypeUtils.isEmptyStr(CurDir)) {
                continue;
            }
            try {
                let Files = yield ReadDir(CurDir);
                for (let i = 0; i < Files.length; i++) {
                    let stats = yield Stat(Path.join(CurDir, Files[i]));
                    if (stats.isFile()) {
                        if (typeof cb === 'function') {
                            yield cb(undefined, CurDir, Files[i]);
                        }
                    }
                    else if (stats.isDirectory()) {
                        DirList.push(Path.join(CurDir, Files[i]));
                    }
                }
            }
            catch (error) {
                if (typeof cb === 'function') {
                    yield cb(error, undefined, undefined);
                }
            }
        } while (true);
    });
}
exports.ForeachFiles = ForeachFiles;
function isImportable(file) {
    const filePart = file.slice(-3);
    return filePart === '.js' || (filePart === '.ts' && file.slice(-5) !== '.d.ts');
}
function getFullfilepathWithoutExtension(file) {
    const parsedFile = Path.parse(file);
    return Path.join(parsedFile.dir, parsedFile.name);
}
function getFilenameWithoutExtension(file) {
    return Path.parse(file).name;
}
const uniqueFilter = (item, index, arr) => arr.indexOf(item) === index;
/**
 * 在指定目录下加载models
 * @param arg 输入为要加载的路径、文件或Model的数组
 * @param rule 文件匹配规则
 * @param debug 是否输出调试信息
 */
function getModules(arg, rule, debug = false) {
    if (arg && typeof arg[0] === "string") {
        return arg.reduce((models, dir) => {
            if (!glob.hasMagic(dir))
                dir = Path.join(dir, rule);
            // dir = Path.join(dir, '/*');
            if (debug)
                console.log("getModules loading from : " + dir);
            const _models = glob
                .sync(dir)
                .filter(isImportable)
                .map(getFullfilepathWithoutExtension)
                .filter(uniqueFilter)
                .map(fullPath => {
                if (debug)
                    console.log("getModules loading : " + fullPath);
                const module = require(fullPath);
                const fileName = getFilenameWithoutExtension(fullPath);
                if (!module[fileName] && !module.default) {
                    throw new Error(`No default export defined for file "${fileName}" or ` +
                        `export does not satisfy filename.`);
                }
                return module[fileName] || module.default;
            });
            models.push(..._models);
            return models;
        }, []);
    }
    return arg;
}
exports.getModules = getModules;
/**
 * 限制在指定目录下加载models
 * @param arg 输入为要加载的路径、文件或Model的数组
 * @param limitDirs 限制加载的目录数组（对arg为Model类型无效）
 * @param rule 文件匹配规则
 * @param debug 是否输出调试信息
 */
function getModulesEx(arg, limitDirs, rule, debug = false) {
    if (TypeUtils.isArray(limitDirs)
        && !TypeUtils.isEmptyArray(limitDirs)
        && TypeUtils.isString(limitDirs[0])
        && !TypeUtils.isEmptyStr(limitDirs[0])) {
        let Models = [];
        limitDirs.forEach((value, index, array) => {
            let loadPaths = arg.reduce((paths, dir) => {
                let isDir = dir.dir ? true : false;
                let tempPath = dir ? (dir.dir ? dir.dir : dir) : "";
                let curPath = Path.join(tempPath, rule);
                let fullPath = "";
                if (!glob.hasMagic(tempPath)) {
                    let parsedFile = Path.parse(tempPath);
                    curPath = Path.join(parsedFile.dir, parsedFile.name);
                    curPath = isDir ? Path.join(curPath, '*.*') : (curPath + '.*');
                }
                fullPath = Path.join(process.cwd(), value, curPath);
                PathUtils.PathInside(process.cwd(), fullPath) ? paths.push(fullPath) : "";
                return paths;
            }, []);
            Models.push(getModules(loadPaths, "", debug));
        });
        return Models;
    }
    else {
        return getModules(arg, rule, debug);
    }
}
exports.getModulesEx = getModulesEx;
//# sourceMappingURL=FSPromise.js.map