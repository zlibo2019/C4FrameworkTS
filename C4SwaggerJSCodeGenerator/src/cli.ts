import fs = require('fs');
const pkg = require('../package.json');
import cli = require('commander');
import yaml = require('js-yaml');
import { CodeGen } from './codegen';

cli
    .version(pkg.version)
    .command('generate [imports...]')
    .alias('gen')
    .description('Generate from Swagger file')
    .option('-f, --file <file>', 'Input file.')
    .option('-c, --class <class>', 'Class name [Test]', 'Test')
    .option('-b, --beautify', 'Whether or not to beautify the generated code [false]')
    .option('-o, --out <out>', 'Out file name.')
    .action((imports : string[], options : any) => {
        const fnName = 'get Typescript Code';
        const fn = CodeGen.getTypescriptCode;
        options.beautify = options.beautify || false;

        const content = fs.readFileSync(options.file, 'utf-8');

        var swagger;
        try {
            swagger = JSON.parse(content);
        } catch (e) {
            swagger = yaml.safeLoad(content);
        }

        const result = fn({
            imports : imports.slice(1),
            className: options.class,
            swagger: swagger,
            isES6 : false,
            beautify: options.beautify
        });

        // console.log(result);
        console.log(process.cwd());
        fs.writeFileSync(options.out, result);
    });

cli.parse(process.argv);

if (!cli.args.length) {
    cli.help();
}
