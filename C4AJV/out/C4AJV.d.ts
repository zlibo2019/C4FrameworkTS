import AJV = require('ajv');
export default class C4AJV {
    private m_ajv;
    constructor();
    init(loadPath?: string): Promise<void>;
    addSchema(key: string, schema: any): void;
    removeSchema(key: string): void;
    getSchema(key: string): AJV.ValidateFunction;
    validate(key: string, data: object): boolean | AJV.Thenable<any>;
}
