import { Swagger2ExternalDocsObject, Swagger2ParameterOtherObject, Swagger2SchemaObject, Swagger2ParameterObjectExtInfo, typespec } from "./C4SwaggerDefine";

export interface Swagger2RenderData {
    isNode : boolean;
    isES6  : boolean;
    description ?: string;
    isSecure    : boolean;
    className   : string;
    imports    ?: string[];
    domain      : string;
    methods     : Swagger2RenderMethodData[];
    definitions : {
        name : string;
        description ?: string;
        tsType : typespec;
    }[];
    isSecureToken  ?: boolean;
    isSecureApiKey ?: boolean;
    isSecureBasic  ?: boolean;
};

export interface Swagger2RenderParameter extends Swagger2ParameterOtherObject, Swagger2ParameterObjectExtInfo {
    schema ?: Swagger2SchemaObject;
}

export interface Swagger2RenderMethodData {
    path            : string;
    className       : string;
    methodName      : string;
    method          : string;
    isGET           : boolean;
    isPOST          : boolean;
    summary         ?: string;
    externalDocs    ?: Swagger2ExternalDocsObject;
    isSecure        : boolean;
    isSecureToken   : boolean;
    isSecureApiKey  : boolean;
    isSecureBasic   : boolean;
    isDownloadFile  : boolean;
    parameters      : Swagger2RenderParameter[];
    headers         : {
        name : string;
        value : string;
    }[];
}
