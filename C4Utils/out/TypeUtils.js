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
function isNullOrUndefined(obj) {
    return (obj === undefined || obj === null) ? true : false;
}
exports.isNullOrUndefined = isNullOrUndefined;
function isEmptyObj(obj) {
    return (obj === undefined || obj === null || Object.getOwnPropertyNames(obj).length === 0) ? true : false;
}
exports.isEmptyObj = isEmptyObj;
function isEmptyStr(str) {
    return (str === undefined || str === null || str === "") ? true : false;
}
exports.isEmptyStr = isEmptyStr;
function isEmptyArray(array) {
    return ((Object.prototype.toString.call(array) === '[object Array]') && array.length > 0) ? false : true;
}
exports.isEmptyArray = isEmptyArray;
function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}
exports.isArray = isArray;
function isNumber(obj) {
    return Object.prototype.toString.call(obj) === '[object Number]';
}
exports.isNumber = isNumber;
function isInt(obj) {
    if (Object.prototype.toString.call(obj) !== '[object Number]') {
        return false;
    }
    return parseInt(obj, 10) === obj;
}
exports.isInt = isInt;
function isBoolean(obj) {
    return Object.prototype.toString.call(obj) === '[object Boolean]';
}
exports.isBoolean = isBoolean;
function isString(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
}
exports.isString = isString;
function isNull(obj) {
    return Object.prototype.toString.call(obj) === '[object Null]';
}
exports.isNull = isNull;
function isUndefined(obj) {
    return Object.prototype.toString.call(obj) === '[object Undefined]';
}
exports.isUndefined = isUndefined;
function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
exports.isObject = isObject;
function isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
}
exports.isFunction = isFunction;
function checkType(obj, Type) {
    return obj instanceof Type;
}
exports.checkType = checkType;
function objectTrav(obj, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        if (null === obj || undefined === obj
            || (typeof obj) === 'string'
            || (typeof obj) === 'number'
            || (typeof obj) === 'boolean') {
            return;
        }
        let TravStats = [
            {
                object: obj,
                keys: Object.keys(obj),
                index: 0
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
                let CurKey = CurStats.keys[CurStats.index];
                let CurType = Object.prototype.toString.call(CurStats.object[CurKey]);
                if (CurType === '[object Object]'
                    || CurType === '[object Array]') {
                    if (typeof cb === 'function') {
                        yield cb(CurStats.object, TravStats.length, CurKey, CurType, CurStats.object[CurKey]);
                    }
                    TravStats.push({
                        object: CurStats.object,
                        keys: CurStats.keys,
                        index: (CurStats.index + 1)
                    });
                    TravStats.push({
                        object: CurStats.object[CurKey],
                        keys: Object.keys(CurStats.object[CurKey]),
                        index: 0
                    });
                    break;
                }
                else {
                    if (typeof cb === 'function') {
                        yield cb(CurStats.object, TravStats.length, CurKey, CurType, CurStats.object[CurKey]);
                    }
                }
            }
        } while (true);
    });
}
exports.objectTrav = objectTrav;
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
function configObj2JSObj(confiObj) {
    try {
        let Doc = {};
        for (let key in confiObj) {
            // 按照.号拆分
            let orgPaths = key.split('.');
            let Paths = [];
            let CurDoc = Doc;
            // 按照路径来还原对象
            for (let i = 0; i < orgPaths.length; i++) {
                let CurKey = orgPaths[i];
                // 对数组进行单独处理
                let CurMatch = CurKey.match(/\[\d+\]/g);
                if (CurMatch !== null) {
                    CurKey = CurKey.replace(/\[\d+\]/g, '');
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
                            CurDoc = CurDoc[CurIndex];
                        }
                        else {
                            if (CurDoc[CurIndex] === undefined) {
                                CurDoc[CurIndex] = {};
                            }
                            if (i < orgPaths.length - 1) {
                                CurDoc = CurDoc[CurIndex];
                            }
                        }
                    }
                }
                else {
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
    }
    catch (error) {
        throw error;
    }
}
exports.configObj2JSObj = configObj2JSObj;
//# sourceMappingURL=TypeUtils.js.map