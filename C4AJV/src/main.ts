import C4AJV from './C4AJV'
import Yaml = require('js-yaml');
import { FSP } from 'c4utils';

async function Launch() {
    let CurAJV  = new C4AJV();
    await CurAJV.init('./schema');
    // http://weds.com/C4Framework/ConfiggerConfig.json
    let doc = null;
    try {
        // let data = await FSP.ReadFile('./Configger.yml', {
        //     encoding : 'utf8',
        //     flag : 'r'
        // });

        let data = await FSP.ReadFile('./C4Logger.yml', {
            encoding : 'utf8',
            flag : 'r'
        });

        doc = Yaml.safeLoad(<string>data);
        // doc.ConfigService.push({
        //     host : '123'
        // })

        // let Res = CurAJV.validate('http://weds.com/C4Framework/ConfiggerConfig.json', doc);
        let Res = CurAJV.validate('http://weds.com/C4Framework/LoggerConfig.json', doc);
        console.log(Res);
    } catch (error) {
        console.log(error);
    }
}


Launch();
