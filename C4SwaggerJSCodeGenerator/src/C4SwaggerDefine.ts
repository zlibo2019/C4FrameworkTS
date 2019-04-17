export type Swagger2Schemes                   = 'http'| 'https'| 'ws'| 'wss';
export type Swagger2ParameterIn               = 'query' | 'header' | 'path' | 'body' | 'formData';
export type Swagger2ParameterType             = 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'file';
export type Swagger2ParameterFormat           = 'int32' | 'int64' | 'float' | 'double' | 'string' | 'byte' | 'binary' | 'boolean' | 'date' | 'date-time' | 'passwor';
export type Swagger2ParameterCollectionFormat = 'csv' | 'ssv' | 'tsv' | 'pipes' | 'multi';
export type Swagger2SecurifyType              = "basic" | 'apiKey' | 'oauth2';

export interface typespec {
    description ?: string;
    isEnum : boolean;
    tsType ?: string;
    target ?: string;
    isAtomic ?: boolean;
    elementType ?: typespec;
    properties ?: propertyspec[];
    isRef ?: boolean;
    isObject ?: boolean;
    isArray ?: boolean;
};

export interface propertyspec extends typespec {
    name ?: string;
    optional ?: boolean;
};

export interface Swagger2Info {
    itle : string;
    version : string;
    description ?: string;
    termsOfService ?: string;       // 服务条款
    contact ?: {
        name ?: string;
        url ?: string;
        email ?: string;
    },
    license ?: {
        name : string;
        url ?: string;
    }
};

export interface Swagger2ExternalDocsObject {
    description ?: string;
    url : string;
};

export interface Swagger2BaseItemObject {
    format ?: Swagger2ParameterFormat;
    allowEmptyValue ?: boolean;
    itmes ?: Swagger2ItmesObject | Swagger2ItmesObject[];
    collectionFormat ?: Swagger2ParameterCollectionFormat;
    default ?: any;
    maximum ?: number;
    exclusiveMaximum ?: boolean;
    minimum ?: number;
    exclusiveMinimum ?: boolean;
    maxLength ?: number;
    minLength ?: number;
    pattern ?: string;
    maxItems ?: number;
    minItems ?: number;
    uniqueItems ?: boolean;
    enum ?: any[];
    multipleOf ?: number;
}

export interface Swagger2ItmesObject extends Swagger2BaseItemObject {
    type : Swagger2ParameterType;
};

export interface Swagger2SchemaObject extends Swagger2BaseItemObject {
    $ref ?: string;
    title ?: string;
    description ?: string;
    maxProperties ?: number;
    minProperties ?: number;
    required ?: boolean;
    type ?: Swagger2ParameterType;
    allOf ?: any[];
    properties ?: {
        [key : string] : Swagger2SchemaObject;
    }
    additionalProperties ?: boolean | Swagger2SchemaObject;
    discriminator ?: string;
    readOnly ?: boolean;
    xml ?: any;
    example ?: any;
}

export interface Swagger2ParameterBasicObject {
    name : string;
    in : Swagger2ParameterIn;
    description ?: string;
    "x-exclude-from-bindings" ?: boolean;
    'x-proxy-header' ?: any;
    'x-name-pattern' ?: any;
};

export interface Swagger2ParameterBodyObject extends Swagger2ParameterBasicObject {
    required ?: boolean;
    schema : Swagger2SchemaObject;
};

export interface Swagger2ParameterBasicExObject extends Swagger2ParameterBasicObject, Swagger2BaseItemObject {
    type : string;
};

export interface Swagger2ParameterPathObject extends Swagger2ParameterBasicExObject {
    required ?: true;
};

export interface Swagger2ParameterOtherObject extends Swagger2ParameterBasicExObject {
    required ?: boolean;
};

export interface SwaggerRef {
    $ref : string;
}

export type Swagger2ParameterNotBodyObject = Swagger2ParameterPathObject | Swagger2ParameterOtherObject;
export type Swagger2ParameterObject = Swagger2ParameterBodyObject | Swagger2ParameterNotBodyObject;

// export interface Swagger2ParameterObject extends Swagger2BaseItemObject {
//     name : string;
//     in : Swagger2ParameterIn;
//     description ?: string;
//     required ?: boolean;
//     schema ?: Swagger2SchemaObject;
//     type ?: Swagger2ParameterType;
// };

export interface Swagger2HeaderObject extends Swagger2BaseItemObject {
    description ?: string;
    type : Swagger2ParameterType;
};

export interface Swagger2ResponseObject {
    description : string;
    schema ?: Swagger2SchemaObject;
    headers ?: {
        [key : string] : Swagger2HeaderObject;
    };
    examples ?: any;
};

export interface Swagger2ResponsesObject {
    default ?: Swagger2ResponseObject | SwaggerRef;
    [key : number] : Swagger2ResponseObject | {
        $ref : string;
    }
};

export interface Swagger2SecurifyBasicSchemeObject {
    type : Swagger2SecurifyType;
    description ?: string;
};

export interface Swagger2SecurifyAPIKeySchemeObject extends Swagger2SecurifyBasicSchemeObject {
    name : string;
    in : string;
};

export interface Swagger2SecurifyOauth2SchemeObjcet extends Swagger2SecurifyBasicSchemeObject {
    flow : string;
    authorizationUrl : string;
    tokenUrl : string;
    scopes : {
        [key : string] : string;
    }
};

export type Swagger2SecurifySchemeObject = Swagger2SecurifyBasicSchemeObject | Swagger2SecurifyAPIKeySchemeObject | Swagger2SecurifyOauth2SchemeObjcet;

export interface Swagger2SecurityDefinitionsObject {
    [key : string] : Swagger2SecurifySchemeObject;
};

export interface Swagger2SecurityRequirementObject {
    [key : string] : string[];

};

export interface Swagger2OperationObject {
    tags ?: string[];
    summary ?: string;
    description ?: string;
    externalDocs ?: Swagger2ExternalDocsObject;
    operationId ?: string;
    consumes ?: string[];
    produces ?: string[];
    parameters ?: (Swagger2ParameterObject | SwaggerRef)[];
    responses : Swagger2ResponsesObject;
    schemes ?: Swagger2Schemes[];
    deprecated ?: boolean;
    security ?: Swagger2SecurityRequirementObject;
};

export interface Swagger2PathItemObject {
    $ref    ?: string;
    get     ?: Swagger2OperationObject;
    put     ?: Swagger2OperationObject;
    post    ?: Swagger2OperationObject;
    delete  ?: Swagger2OperationObject;
    options ?: Swagger2OperationObject;
    head    ?: Swagger2OperationObject;
    patch   ?: Swagger2OperationObject;
    parameters ?: (Swagger2ParameterObject | SwaggerRef)[];
};

export interface Swagger2TagObject {
    name : string;
    description : string;
    externalDocs ?: Swagger2ExternalDocsObject;
};

export interface Swagger2Object {
    swagger : "2.0";
    info : Swagger2Info;
    host ?: string;
    basePath ?: string;
    schemes : Swagger2Schemes[];
    consumes ?: string[];
    produces ?: string[];
    paths : {
        [key : string] : Swagger2PathItemObject
    };
    definitions ?: {
        [key : string] : Swagger2SchemaObject;
    };
    parameters ?: {
        [key : string] : Swagger2ParameterObject
    };
    responses ?: {
        [key : string] : Swagger2ResponseObject;
    };
    securityDefinitions : {
        [key : string] : Swagger2SecurifySchemeObject;
    },
    security ?: Swagger2SecurityRequirementObject[];
    tags ?: Swagger2TagObject[];
    externalDocs ?: Swagger2ExternalDocsObject;
};

export interface Swagger2ParameterObjectExtInfo {
    camelCaseName       : string;
    isSingleton         : boolean;
    isBodyParameter     : boolean;
    isPathParameter     : boolean;
    isPatternType       : boolean;
    isQueryParameter    : boolean;
    isHeaderParameter   : boolean;
    isFormParameter     : boolean;
    isMultiPart         : boolean;
    tsType              : typespec;
    cardinality         : '' | '?';
    pattern            ?: string;
    singleton          ?: any;
}
