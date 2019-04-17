import fs = require('fs');
import { CodeGen } from './codegen';

let FileName    = './swagger1.json';
let SwaggerData = JSON.parse(fs.readFileSync(FileName, 'utf-8'));
let ParseData   = CodeGen.getTypescriptCode({
    swagger : SwaggerData,
    className : "CTest",
    isES6 : false,
    beautify : true
});

fs.writeFileSync('./data.ts', ParseData);
