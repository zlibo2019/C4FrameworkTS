"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FSP = require("./FSPromise");
exports.FSP = FSP;
const PathUtils = require("./PathUtils");
exports.PathUtils = PathUtils;
const TypeUtils = require("./TypeUtils");
exports.TypeUtils = TypeUtils;
// import { configObj2JSObj } from './TypeUtils';
// import { getModules, getModulesEx } from './FSPromise' ;
// var TestData = {
//     name : "sdfsdfsdf/app01-dev.yml",
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
// var Res = {};
// try {
//     Res = configObj2JSObj(TestData.source);
//     console.log(JSON.stringify(Res));
// } catch (error) {
//     console.log(error);
// }
// import Path = require('path')
// let res = getModules([Path.join(process.cwd(), './src/PathUtils.ts')], "");
// let res1 = getModulesEx(['*'], ["./out"], "");
// console.log(res);
// console.log(res1);
//# sourceMappingURL=index.js.map