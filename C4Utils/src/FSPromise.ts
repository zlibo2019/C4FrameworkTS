import FS           = require('fs');
import Crypto       = require('crypto');
import TypeUtils    = require('./TypeUtils');
import Path         = require('path');
import PathUtils    = require('./PathUtils');
import glob         = require('glob');

export type PathLike = FS.PathLike;

export async function WriteFile(filePath : PathLike | number, data : Buffer | string) {
    await new Promise((resolve, reject) => {
        FS.writeFile(filePath, data, (err) => {
            if (err) {
                return reject(err);
            }
            resolve(filePath);
        });
    });
}

export async function ReadFile(filePath : PathLike | number, options ?: { encoding?: string; flag?: string; } | null) :Promise<string | Buffer> {
    let data : string | Buffer = await new Promise<string | Buffer>((resolve, reject) => {
        if (TypeUtils.isEmptyObj(options) === true) {
            options = {
                flag: 'r',
                encoding: 'utf8'
            }
        }
        FS.readFile(filePath, options, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        })
    });

    return data;
}

export async function Exists(AbsolutePath : PathLike) {
    let isExist = await new Promise((resolve, reject) => {
        FS.exists(AbsolutePath, (exists) => {
            resolve(exists);
        })
    });

    return isExist;
}

export async function Access(AbsolutePath : PathLike, mode ?: number) {
    let isAccess = await new Promise((resolve, reject) => {
        if (TypeUtils.isEmptyObj(mode) === true) {
            mode = FS.constants.F_OK;
        }
        FS.access(AbsolutePath, mode, (err) => {
            if (err) {
                return reject(err);
            }
            resolve(true);
        })
    });

    return isAccess;
}

export async function FileSize(AbsolutePath : PathLike) {
    let fileSize = await new Promise((resolve, reject) => {
        FS.stat(AbsolutePath, (err, stats) => {
            if (err) {
                return reject(err);
            }
            resolve(stats.size);
        })
    });

    return fileSize;
}

export async function MD5Hash(AbsolutePath : string) {
    let md5 = await new Promise((resolve, reject) => {
        var Hash        = Crypto.createHash('md5');
        var ReadStream  = FS.createReadStream(AbsolutePath);
        ReadStream.on('data', Hash.update.bind(Hash));
        ReadStream.on('end', () => {
            var FileMD5 = Hash.digest('hex');
            resolve(FileMD5);
        });
    });

    return md5;
}

export async function Stat(filePath : string) {
    let Stats = await new Promise<FS.Stats>((resolve, reject) => {
        FS.stat(filePath, (err, stats) => {
            if (err) {
                return reject(err);
            }
            resolve(stats);
        });
    });

    return Stats;
}

export async function ReadDir(filePath : string) {
    let Files = await new Promise<string[]>((resolve, reject) => {
        FS.readdir(filePath, (err, files) => {
            if (err) {
                return reject(err);
            }
            resolve(files);
        });
    });

    return Files;
}

/**
 * 遍历指定目录下的所有文件（广度优先）
 * @param basePath 基本路径
 * @param filePath 目录路径
 * @param cb 回调方法，curDir为当前目录的完整路径，file为当前文件名
 */
export async function ForeachFiles(basePath : string, filePath : string,
    cb ?: (err : any | undefined, curDir : string | undefined, file : string | undefined) => void) {
    let WorkPath    = filePath || "";
    basePath        = basePath || process.cwd();
    if (Path.isAbsolute(basePath) === false) {
        basePath    = process.cwd();
    }
    if (Path.isAbsolute(filePath) === false) {
        WorkPath    = Path.resolve(basePath, filePath);
    }

    let DirList = [ WorkPath ];
    do {
        if (DirList.length === 0) {
            break;
        }

        let CurDir  = DirList.shift();
        if (!TypeUtils.isString(CurDir)
            || TypeUtils.isEmptyStr(CurDir)) {
            continue;
        }
        try {
            let Files   = await ReadDir(<string>CurDir);
            for (let i = 0; i < Files.length; i++) {
                let stats = await Stat(Path.join(<string>CurDir, Files[i]));
                if (stats.isFile()) {
                    if (typeof cb === 'function') {
                        await cb(undefined, <string>CurDir, Files[i]);
                    }
                } else if (stats.isDirectory()) {
                    DirList.push(Path.join(<string>CurDir, Files[i]));
                }
            }
        } catch (error) {
            if (typeof cb === 'function') {
                await cb(error, undefined, undefined);
            }
        }
    } while (true);
}

function isImportable(file : string) : boolean {
    const filePart = file.slice(-3);
    return filePart === '.js' || (filePart === '.ts' && file.slice(-5) !== '.d.ts');
}

function getFullfilepathWithoutExtension(file: string): string {
    const parsedFile = Path.parse(file);
    return Path.join(parsedFile.dir, parsedFile.name);
}

function getFilenameWithoutExtension(file: string): string {
    return Path.parse(file).name;
}

const uniqueFilter = (item : any, index : any, arr : any) => arr.indexOf(item) === index;

/**
 * 在指定目录下加载models
 * @param arg 输入为要加载的路径、文件或Model的数组
 * @param rule 文件匹配规则
 * @param debug 是否输出调试信息
 */
export function getModules(arg : Array<any | string>, rule : string, debug : boolean = false) {
    if (arg && typeof arg[0] === "string") {
        return arg.reduce((models: any[], dir) => {
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

    return arg as Array<any>;
}

export type ModulesInfo = {
    dir : string;
} | string | any;

/**
 * 限制在指定目录下加载models
 * @param arg 输入为要加载的路径、文件或Model的数组
 * @param limitDirs 限制加载的目录数组（对arg为Model类型无效）
 * @param rule 文件匹配规则
 * @param debug 是否输出调试信息
 */
export function getModulesEx(arg : Array<ModulesInfo>, limitDirs : string[], rule : string, debug : boolean = false) {
    if (TypeUtils.isArray(limitDirs)
        && !TypeUtils.isEmptyArray(limitDirs)
        && TypeUtils.isString(limitDirs[0])
        && !TypeUtils.isEmptyStr(limitDirs[0])
    ) {
        let Models : any[] = [];
        limitDirs.forEach((value, index, array) => {
            let loadPaths = arg.reduce((paths : string[], dir) => {
                let isDir    = dir.dir ? true : false;
                let tempPath = dir ? (dir.dir ? dir.dir : dir) : "";
                let curPath  = Path.join(tempPath, rule);
                let fullPath = "";
                if (!glob.hasMagic(tempPath)) {
                    let parsedFile  = Path.parse(tempPath);
                    curPath         = Path.join(parsedFile.dir, parsedFile.name);
                    curPath         = isDir ? Path.join(curPath, '*.*') : (curPath + '.*');
                }
                fullPath        = Path.join(process.cwd(), value, curPath);
                PathUtils.PathInside(process.cwd(), fullPath) ? paths.push(fullPath) : "";
                return paths;
            }, []);

            Models.push(getModules(loadPaths, "", debug));
        });
        return Models;
    } else {
        return getModules(arg, rule, debug);
    }
}
