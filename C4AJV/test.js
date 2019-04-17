var Yaml    = require('js-yaml');
var FS      = require('fs');
var AJV     = require('ajv');

// function Test() {
//     let doc = null;
//     try {
//         doc = Yaml.safeLoad(FS.readFileSync('./Configger.yml', 'utf8'));
//     } catch (error) {
//         console.log(error);
//         process.exit(-1);
//     }

//     for (let i in doc) {
//         console.log(i);
//     }

//     let Schema = JSON.parse(FS.readFileSync('./schema/ConfiggerConfig.json', 'utf8'));

//     let CurAjv = new AJV();
//     let Validate    = CurAjv.compile(Schema);
//     let Valid = Validate(doc);
//     if (!Valid) {
//         console.log(Validate.errors);
//     } else {
//         console.log("Succeed");
//     }
// }

// Test();

// var Path    = require('path');
// var CO      = require('co');

// function ReadDir(filePath) {
//     return new Promise((resolve, reject) => {
//         FS.readdir(filePath, (err, files) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve(files);
//         });
//     });
// }

// function FSStat(filePath) {
//     return new Promise((resolve, reject) => {
//         FS.stat(filePath, (err, stats) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve(stats);
//         });
//     });
// }

// function ForeachFiles(basePath, filePath, cb) {
//     CO(function *() {
//         let WorkPath        = filePath || "";
//         basePath            = basePath || process.cwd();
//         if (Path.isAbsolute(basePath) === false) {
//             basePath    = process.cwd();
//         }
//         if (Path.isAbsolute(filePath) === false) {
//             WorkPath    = Path.resolve(basePath, filePath);
//         }

//         let DirList = [WorkPath];
//         do {
//             if (DirList.length === 0) {
//                 break;
//             }
//             let CurDir = DirList.shift();
//             try {
//                 let Files = yield ReadDir(CurDir);
//                 for (let i = 0; i < Files.length; i++) {
//                     let stats = yield FSStat(Path.join(CurDir, Files[i]));
//                     if (stats.isFile()) {
//                         if (typeof cb === 'function') {
//                             cb(CurDir, Files[i]);
//                         }
//                     } else if (stats.isDirectory()) {
//                         DirList.push(Path.join(CurDir, Files[i]));
//                     }
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
            
//         } while (true);
//     });
// }

// ForeachFiles('./', 'src', (curDir, file) => {
//     console.log(Path.join(curDir, file));
// });


function objectTrav(obj, cb) {
    if (null === obj || undefined === obj) {
        return;
    }

    let TravStats   = [
        {
            object : obj,
            keys : Object.keys(obj),
            index : 0
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
                if (typeof cb === 'function') {
                    cb(CurStats.object, TravStats.length, CurKey, CurType, CurStats.object[CurKey]);
                }
                break;
            } else {
                if (typeof cb === 'function') {
                    cb(CurStats.object, TravStats.length, CurKey, CurType, CurStats.object[CurKey]);
                }
            }
        }
    } while (true);
}

class Test {
    constructor() {
        this.g = 5;
        this.h = { i : 6};
    }
}

function TestTrav() {
    objectTrav(true, (Obj, Deep, Key, Type, Value) => {
            if (Type === '[object Object]') {
                let PerStr = '';
                for (let i = 0; i < Deep - 1; i++) {
                    PerStr += '  ';
                }
                console.log(PerStr + '[' + Key + '] : {');
            } else if (Type === '[object Array]') {
                let PerStr = '';
                for (let i = 0; i < Deep - 1; i++) {
                    PerStr += '  ';
                }
                console.log(PerStr + '[' + Key + '] : [');
            } else {
                let PerStr = '';
                for (let i = 0; i < Deep; i++) {
                    PerStr += '  ';
                }
                console.log(PerStr + '[' + Key + '] -> ' + Value);
            }
        });
    // console.log('>>>>>>>>>>>>>>>>>>')
    // objectTrav({
    //     a : 1,
    //     b : {
    //         c : 2
    //     },
    //     d : [ 3, { e : 4}],
    //     f : new Test(),
    //     j : 7
    // }, (Obj, Deep, Key, Type, Value) => {
    //     if (Type === '[object Object]') {
    //         let PerStr = '';
    //         for (let i = 0; i < Deep - 1; i++) {
    //             PerStr += '  ';
    //         }
    //         console.log(PerStr + '[' + Key + '] : {');
    //     } else if (Type === '[object Array]') {
    //         let PerStr = '';
    //         for (let i = 0; i < Deep - 1; i++) {
    //             PerStr += '  ';
    //         }
    //         console.log(PerStr + '[' + Key + '] : [');
    //     } else {
    //         let PerStr = '';
    //         for (let i = 0; i < Deep; i++) {
    //             PerStr += '  ';
    //         }
    //         console.log(PerStr + '[' + Key + '] -> ' + Value);
    //     }
    // });
    // console.log('>>>>>>>>>>>>>>>>>>')
    // objectTrav([
    //     1,
    //     {
    //         a : 2,
    //         b : {
    //             c : 3
    //         }
    //     }
    // ], (Obj, Deep, Key, Type, Value) => {
    //     if (Type === '[object Object]') {
    //         let PerStr = '';
    //         for (let i = 0; i < Deep - 1; i++) {
    //             PerStr += '  ';
    //         }
    //         console.log(PerStr + '[' + Key + '] : {');
    //     } else if (Type === '[object Array]') {
    //         let PerStr = '';
    //         for (let i = 0; i < Deep - 1; i++) {
    //             PerStr += '  ';
    //         }
    //         console.log(PerStr + '[' + Key + '] : [');
    //     } else {
    //         let PerStr = '';
    //         for (let i = 0; i < Deep; i++) {
    //             PerStr += '  ';
    //         }
    //         console.log(PerStr + '[' + Key + '] -> ' + Value);
    //     }
    // });
}

TestTrav();

