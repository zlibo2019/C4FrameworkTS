import { Swagger2Object } from './C4SwaggerDefine';
import { Swagger2RenderData } from './C4SwaggerRenderDefine';
export declare function getViewForSwagger2(opts: {
    swagger: Swagger2Object;
    className: string;
    imports?: string[];
    isES6: boolean;
}, type: string): Swagger2RenderData;
export declare var CodeGen: {
    getTypescriptCode: (opts: {
        swagger: Swagger2Object;
        className: string;
        imports?: string[] | undefined;
        isES6: boolean;
        template?: any;
        mustache?: boolean | undefined;
        esnext?: boolean | undefined;
        beautify?: boolean | undefined;
    }) => string;
};
