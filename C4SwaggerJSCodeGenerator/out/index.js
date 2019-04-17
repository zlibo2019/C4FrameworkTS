"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const codegen_1 = require("./codegen");
let FileName = './swagger1.json';
let SwaggerData = JSON.parse(fs.readFileSync(FileName, 'utf-8'));
let ParseData = codegen_1.CodeGen.getTypescriptCode({
    swagger: SwaggerData,
    className: "CTest",
    isES6: false,
    beautify: true
});
fs.writeFileSync('./data.ts', ParseData);
//# sourceMappingURL=index.js.map