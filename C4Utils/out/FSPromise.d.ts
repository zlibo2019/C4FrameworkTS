/// <reference types="node" />
import FS = require('fs');
export declare type PathLike = FS.PathLike;
export declare function WriteFile(filePath: PathLike | number, data: Buffer | string): Promise<void>;
export declare function ReadFile(filePath: PathLike | number, options?: {
    encoding?: string;
    flag?: string;
} | null): Promise<string | Buffer>;
export declare function Exists(AbsolutePath: PathLike): Promise<{}>;
export declare function Access(AbsolutePath: PathLike, mode?: number): Promise<{}>;
export declare function FileSize(AbsolutePath: PathLike): Promise<{}>;
export declare function MD5Hash(AbsolutePath: string): Promise<{}>;
export declare function Stat(filePath: string): Promise<FS.Stats>;
export declare function ReadDir(filePath: string): Promise<string[]>;
/**
 * 遍历指定目录下的所有文件（广度优先）
 * @param basePath 基本路径
 * @param filePath 目录路径
 * @param cb 回调方法，curDir为当前目录的完整路径，file为当前文件名
 */
export declare function ForeachFiles(basePath: string, filePath: string, cb?: (err: any | undefined, curDir: string | undefined, file: string | undefined) => void): Promise<void>;
/**
 * 在指定目录下加载models
 * @param arg 输入为要加载的路径、文件或Model的数组
 * @param rule 文件匹配规则
 * @param debug 是否输出调试信息
 */
export declare function getModules(arg: Array<any | string>, rule: string, debug?: boolean): any[];
export declare type ModulesInfo = {
    dir: string;
} | string | any;
/**
 * 限制在指定目录下加载models
 * @param arg 输入为要加载的路径、文件或Model的数组
 * @param limitDirs 限制加载的目录数组（对arg为Model类型无效）
 * @param rule 文件匹配规则
 * @param debug 是否输出调试信息
 */
export declare function getModulesEx(arg: Array<ModulesInfo>, limitDirs: string[], rule: string, debug?: boolean): any[];
