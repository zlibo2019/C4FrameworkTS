export function isNullOrUndefined(obj : any) {
    return (obj === undefined || obj === null) ? true : false;
}

export function isEmptyObj(obj : any) {
    return (obj === undefined || obj === null || Object.getOwnPropertyNames(obj).length === 0) ? true : false;
}

export function isEmptyStr(str : any) {
    return (str === undefined || str === null || str === "") ? true : false;
}

export function isEmptyArray(array : any) {
    return ((Object.prototype.toString.call(array) === '[object Array]') && array.length > 0) ? false : true;
}

export function isArray(obj : any) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

export function isNumber(obj : any) {
    return Object.prototype.toString.call(obj) === '[object Number]';
}

export function isInt(obj : any) {
    if (Object.prototype.toString.call(obj) !== '[object Number]') {
        return false;
    }

    return parseInt(obj, 10) === obj;
}

export function isBoolean(obj : any) {
    return Object.prototype.toString.call(obj) === '[object Boolean]';
}

export function isString(obj : any) {
    return Object.prototype.toString.call(obj) === '[object String]';
}

export function isNull(obj : any) {
    return Object.prototype.toString.call(obj) === '[object Null]';
}

export function isUndefined(obj : any) {
    return Object.prototype.toString.call(obj) === '[object Undefined]';
}

export function isObject(obj : any) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

export function isFunction(obj : any) {
    return Object.prototype.toString.call(obj) === '[object Function]';
}

export function checkType(obj : any, Type : any) {
    return obj instanceof Type;
}

export async function objectTrav(obj : any,
    cb ?: (obj : any, deep : number, key : string, type : string, value : any) => void) {
    if (null === obj || undefined === obj
        || (typeof obj) === 'string'
        || (typeof obj) === 'number'
        || (typeof obj) === 'boolean') {
        return;
    }

    let TravStats   = [
        {
            object  : obj,
            keys    : Object.keys(obj),
            index   : 0
        }
    ];
    do {
        if (TravStats.length === 0) {
            break;
        }
        let CurStats = TravStats.pop();
        if (undefined === CurStats) {
            break;
        }
        for (; CurStats.index < CurStats.keys.length; CurStats.index++) {
            let CurKey  = CurStats.keys[CurStats.index]
            let CurType = Object.prototype.toString.call(CurStats.object[CurKey]);
            if (CurType === '[object Object]'
                || CurType === '[object Array]') {
                if (typeof cb === 'function') {
                    await cb(CurStats.object, TravStats.length, CurKey, CurType, CurStats.object[CurKey])
                }
                TravStats.push({
                    object  : CurStats.object,
                    keys    : CurStats.keys,
                    index   : (CurStats.index + 1)
                });
                TravStats.push({
                    object  : CurStats.object[CurKey],
                    keys    : Object.keys(CurStats.object[CurKey]),
                    index   : 0
                });
                break;
            } else {
                if (typeof cb === 'function') {
                    await cb(CurStats.object, TravStats.length, CurKey, CurType, CurStats.object[CurKey])
                }
            }
        }
    } while (true);
}

// {
//     name : 'sdfsdfsdf/app01-dev.yml',
//     source : {
//         "z":"d",
//         "b.a" : "cccc",
//         "c.d.e" : "aaaa",
//         "xxx[0].Path" : '123',
//         "xxx[1].main" : 'sadsd',
//         "oooo.host" : 'sdfdsf',
//         "a[0][0]" : "abcd",
//         "a[0][1].z" : "efg",
//         "a[1].zzz[2]" : "zzzz"
//     }
// }
export function configObj2JSObj(confiObj : any) {
    try {
        let Doc : any = {};
        for (let key in confiObj) {
            // 按照.号拆分
            let orgPaths            = key.split('.');
            let Paths : string[]    = [];
            let CurDoc              = Doc;
            // 按照路径来还原对象
            for (let i = 0; i < orgPaths.length; i++) {
                let CurKey      = orgPaths[i];
                // 对数组进行单独处理
                let CurMatch    = CurKey.match(/\[\d+\]/g);
                if (CurMatch !== null) {
                    CurKey  = CurKey.replace(/\[\d+\]/g, '');
                    Paths.push(CurKey);
                    if (CurDoc[CurKey] === undefined
                        || !Array.isArray(CurDoc[CurKey])) {
                        CurDoc[CurKey] = [];
                    }
                    CurDoc = CurDoc[CurKey];
                    for (let j = 0; j < CurMatch.length; j++) {
                        let CurIndex = parseInt(CurMatch[j].replace('[', '').replace(']', ''));
                        Paths.push(CurIndex.toString());
                        if (j < (CurMatch.length - 1)) {
                            if (CurDoc[CurIndex] === undefined
                                || !Array.isArray(CurDoc[CurIndex])) {
                                CurDoc[CurIndex] = [];
                            }
                            CurDoc = CurDoc[CurIndex]
                        } else {
                            if (CurDoc[CurIndex] === undefined) {
                                CurDoc[CurIndex] = {};
                            }
                            if (i < orgPaths.length - 1) {
                                CurDoc = CurDoc[CurIndex]
                            }
                        }
                    }
                } else {
                    Paths.push(CurKey);
                    if (CurDoc[CurKey] === undefined) {
                        CurDoc[CurKey] = {};
                    }

                    if (i < orgPaths.length - 1) {
                        CurDoc = CurDoc[CurKey];
                    }
                }
            }
            CurDoc[Paths[Paths.length - 1]] = confiObj[key];
        }
        return Doc;
    } catch (error) {
        throw error;
    }
}
