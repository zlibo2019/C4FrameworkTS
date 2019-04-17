export declare function CheckPathExists(path: string): Promise<boolean>;
export declare function GetAbsolutePath(path: string): Promise<string>;
/**
 * 判断路径是否在rootDir下，rootDir会转换为绝对路径
 * @param rootDir 根路径
 * @param path 需要判断的路径
 */
export declare function PathInsideAc(rootDir: string, path: string): Promise<boolean>;
/**
 * 判断路径是否在rootDir下
 * @param rootDir 根路径
 * @param path 需要判断的路径
 */
export declare function PathInside(rootDir: string, path: string): boolean;
