"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Mustache = require("mustache");
const beautify = require("js-beautify");
// import JSHINT = require('jshint');
const _ = require("lodash");
const ts = require("./typescript");
function normalizeName(id) {
    return id.replace(/\.|\-|\{|\}|\s/g, '_');
}
;
function getPathToMethodName(opts, m, path) {
    if (path === '/' || path === '') {
        return m;
    }
    // clean url path for requests ending with '/'
    var cleanPath = path.replace(/\/$/, '');
    var segments = cleanPath.split('/').slice(1);
    segments = _.transform(segments, function (result, segment) {
        if (segment[0] === '{' && segment[segment.length - 1] === '}') {
            segment = 'by' + segment[1].toUpperCase() + segment.substring(2, segment.length - 1);
        }
        result.push(segment);
    });
    var result = _.camelCase(segments.join('-'));
    return m.toLowerCase() + result[0].toUpperCase() + result.substring(1);
}
;
function getSchemaType(schema, swagger) {
    if (schema.type)
        return schema.type;
    if (schema.$ref) {
        let segments = schema.$ref.split('/');
        let tempRef = {};
        if (segments.length === 3) {
            if (segments[1] === "parameters") {
                if (swagger.parameters)
                    tempRef = swagger.parameters[segments[2]];
            }
            else if (segments[1] === 'definitions') {
                if (swagger.definitions)
                    tempRef = swagger.definitions[segments[2]];
            }
        }
        if (tempRef.$ref) {
            return getSchemaType(tempRef, swagger);
        }
        if (tempRef.type)
            return tempRef.type;
    }
    return "";
}
function getViewForSwagger2(opts, type) {
    let swagger = opts.swagger;
    let methods = [];
    let authorizedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'COPY', 'HEAD', 'OPTIONS', 'LINK', 'UNLIK', 'PURGE', 'LOCK', 'UNLOCK', 'PROPFIND'];
    let data = {
        isNode: type === 'node' || type === 'react',
        isES6: opts.isES6 || type === 'react',
        description: swagger.info.description,
        isSecure: swagger.securityDefinitions !== undefined,
        className: opts.className,
        imports: opts.imports,
        domain: (swagger.schemes && swagger.schemes.length > 0 && swagger.host && swagger.basePath) ? swagger.schemes[0] + '://' + swagger.host + swagger.basePath.replace(/\/+$/g, '') : '',
        methods: [],
        definitions: []
    };
    /**
     *  TODO:
     * 增加对response的处理
     * swagger.responses
     * globalResponse
     * */
    let globalResponse = swagger.responses;
    let globalDownloadFile = false;
    _.forEach(globalResponse, function (rep, name) {
        if (name === "200") {
            let CurType = "";
            if (rep.schema) {
                if (rep.schema.$ref)
                    CurType = getSchemaType(rep.schema, swagger);
                else if (rep.schema.type) {
                    CurType = rep.schema.type;
                }
            }
            if (CurType === 'file') {
                globalDownloadFile = true;
            }
        }
    });
    _.forEach(swagger.paths, function (api, path) {
        let globalParams = [];
        /**
         * @param {Object} op - meta data for the request
         * @param {string} m - HTTP method name - eg: 'get', 'post', 'put', 'delete'
         */
        // 处理所有Method的公共参数
        _.forEach(api, function (op, m) {
            if (m.toLowerCase() === 'parameters') {
                globalParams = op;
            }
        });
        _.forEach(api, function (opt, m) {
            let M = m.toUpperCase();
            if (M === '' || authorizedMethods.indexOf(M) === -1) {
                return;
            }
            let op = opt;
            let secureTypes = [];
            // 合并一下security
            if (swagger.securityDefinitions !== undefined || op.security !== undefined) {
                let mergedSecurity = _.merge([], swagger.security, op.security).map(function (security) {
                    return Object.keys(security);
                });
                if (swagger.securityDefinitions) {
                    for (let sk in swagger.securityDefinitions) {
                        if (mergedSecurity.join(',').indexOf(sk) !== -1) {
                            secureTypes.push(swagger.securityDefinitions[sk].type);
                        }
                    }
                }
            }
            let methodName = (op.operationId ? normalizeName(op.operationId) : getPathToMethodName(opts, m, path));
            // Make sure the method name is unique
            if (methods.indexOf(methodName) !== -1) {
                let i = 1;
                while (true) {
                    if (methods.indexOf(methodName + '_' + i) !== -1) {
                        i++;
                    }
                    else {
                        methodName = methodName + '_' + i;
                        break;
                    }
                }
            }
            methods.push(methodName);
            let method = {
                path: path,
                className: opts.className,
                methodName: methodName,
                method: M,
                isGET: M === 'GET',
                isPOST: M === 'POST',
                summary: op.description || op.summary,
                externalDocs: op.externalDocs,
                isSecure: swagger.security !== undefined || op.security !== undefined,
                isSecureToken: secureTypes.indexOf('oauth2') !== -1,
                isSecureApiKey: secureTypes.indexOf('apiKey') !== -1,
                isSecureBasic: secureTypes.indexOf('basic') !== -1,
                isDownloadFile: false,
                parameters: [],
                headers: []
            };
            if (method.isSecure && method.isSecureToken) {
                data.isSecureToken = method.isSecureToken;
            }
            if (method.isSecure && method.isSecureApiKey) {
                data.isSecureApiKey = method.isSecureApiKey;
            }
            if (method.isSecure && method.isSecureBasic) {
                data.isSecureBasic = method.isSecureBasic;
            }
            let produces = op.produces || swagger.produces;
            if (produces) {
                method.headers.push({
                    name: 'Accept',
                    value: `'${produces.map(function (value) { return value; }).join(', ')}'`,
                });
            }
            let consumes = op.consumes || swagger.consumes;
            let isMultiPart = false;
            if (consumes) {
                method.headers.push({ name: 'Content-Type', value: '\'' + consumes + '\'' });
                if ((consumes.join(',').toLowerCase()).match(/multipart\/form-data/g)) {
                    isMultiPart = true;
                }
            }
            let responses = op.responses;
            let isDownloadFile = false;
            _.forEach(responses, function (rep, name) {
                if (name === "200") {
                    let CurType = "";
                    if (rep) {
                        if (rep.schema) {
                            if (rep.schema.$ref)
                                CurType = getSchemaType(rep.schema, swagger);
                            else if (rep.schema.type) {
                                CurType = rep.schema.type;
                            }
                        }
                        else if (rep.$ref) {
                            CurType = getSchemaType(rep, swagger);
                        }
                        if (CurType === 'file') {
                            isDownloadFile = true;
                        }
                    }
                }
            });
            if (globalDownloadFile)
                isDownloadFile = true;
            let params = [];
            if (_.isArray(op.parameters)) {
                params = op.parameters;
            }
            params = params.concat(globalParams);
            _.forEach(params, function (parameter) {
                //Ignore parameters which contain the x-exclude-from-bindings extension
                if (parameter['x-exclude-from-bindings']
                    && parameter['x-exclude-from-bindings'] === true) {
                    return;
                }
                // Ignore headers which are injected by proxies & app servers
                // eg: https://cloud.google.com/appengine/docs/go/requests#Go_Request_headers
                if (parameter['x-proxy-header'] && !data.isNode) {
                    return;
                }
                if (_.isString(parameter.$ref)) {
                    let segments = parameter.$ref.split('/');
                    if (swagger.parameters)
                        parameter = swagger.parameters[segments.length === 1 ? segments[0] : segments[2]];
                }
                let parameterExtInfo = {
                    camelCaseName: "",
                    isSingleton: false,
                    isBodyParameter: false,
                    isPathParameter: false,
                    isPatternType: false,
                    isQueryParameter: false,
                    isHeaderParameter: false,
                    isFormParameter: false,
                    isMultiPart: false,
                    tsType: {
                        isEnum: false
                    },
                    cardinality: ''
                };
                parameterExtInfo.camelCaseName = _.camelCase(parameter.name);
                if (parameter.enum) {
                    if (parameter.enum.length === 1) {
                        parameterExtInfo.isSingleton = true;
                        parameterExtInfo.singleton = parameter.enum[0];
                    }
                }
                if (parameter.in === 'body') {
                    parameterExtInfo.isBodyParameter = true;
                }
                else if (parameter.in === 'path') {
                    parameterExtInfo.isPathParameter = true;
                }
                else if (parameter.in === 'query') {
                    if (parameter['x-name-pattern']) {
                        parameterExtInfo.isPatternType = true;
                        parameterExtInfo.pattern = parameter['x-name-pattern'];
                    }
                    parameterExtInfo.isQueryParameter = true;
                }
                else if (parameter.in === 'header') {
                    parameterExtInfo.isHeaderParameter = true;
                }
                else if (parameter.in === 'formData') {
                    parameterExtInfo.isFormParameter = true;
                    parameterExtInfo.isMultiPart = isMultiPart;
                }
                parameterExtInfo.tsType = ts.convertType(parameter);
                parameterExtInfo.cardinality = parameter.required ? '' : '?';
                let CurRenderParams = _.assign(parameter, parameterExtInfo);
                method.parameters.push(CurRenderParams);
            });
            method.isDownloadFile = isDownloadFile;
            data.methods.push(method);
        });
    });
    _.forEach(swagger.definitions, function (definition, name) {
        let temp = name.replace(/«/g, '_').replace(/»/g, '_');
        data.definitions.push({
            name: temp,
            description: definition.description,
            tsType: ts.convertType(definition, swagger)
        });
    });
    return data;
}
exports.getViewForSwagger2 = getViewForSwagger2;
;
// var getViewForSwagger1 = function(opts, type){
//     var swagger = opts.swagger;
//     var data = {
//         isNode: type === 'node' || type === 'react',
//         isES6: opts.isES6 || type === 'react',
//         description: swagger.description,
//         moduleName: opts.moduleName,
//         className: opts.className,
//         domain: swagger.basePath ? swagger.basePath : '',
//         methods: []
//     };
//     swagger.apis.forEach(function(api){
//         api.operations.forEach(function(op){
//             if (op.method === 'OPTIONS') {
//                 return;
//             }
//             var method = {
//                 path: api.path,
//                 className: opts.className,
//                 methodName: op.nickname,
//                 method: op.method,
//                 isGET: op.method === 'GET',
//                 isPOST: op.method.toUpperCase() === 'POST',
//                 summary: op.summary,
//                 parameters: op.parameters,
//                 headers: []
//             };
//             if(op.produces) {
//                 var headers = [];
//                 headers.value = [];
//                 headers.name = 'Accept';
//                 headers.value.push(op.produces.map(function(value) { return '\'' + value + '\''; }).join(', '));
//                 method.headers.push(headers);
//             }
//             op.parameters = op.parameters ? op.parameters : [];
//             op.parameters.forEach(function(parameter) {
//                 parameter.camelCaseName = _.camelCase(parameter.name);
//                 if(parameter.enum && parameter.enum.length === 1) {
//                     parameter.isSingleton = true;
//                     parameter.singleton = parameter.enum[0];
//                 }
//                 if(parameter.paramType === 'body'){
//                     parameter.isBodyParameter = true;
//                 } else if(parameter.paramType === 'path'){
//                     parameter.isPathParameter = true;
//                 } else if(parameter.paramType === 'query'){
//                     if(parameter['x-name-pattern']){
//                         parameter.isPatternType = true;
//                         parameter.pattern = parameter['x-name-pattern'];
//                     }
//                     parameter.isQueryParameter = true;
//                 } else if(parameter.paramType === 'header'){
//                     parameter.isHeaderParameter = true;
//                 } else if(parameter.paramType === 'form'){
//                     parameter.isFormParameter = true;
//                 }
//             });
//             data.methods.push(method);
//         });
//     });
//     return data;
// };
function getCode(opts, type) {
    // For Swagger Specification version 2.0 value of field 'swagger' must be a string '2.0'
    if (opts.swagger.swagger !== '2.0') {
        throw new Error('Typescript is only supported for Swagger 2.0 specs.');
    }
    var data = getViewForSwagger2(opts, type);
    if (type === 'custom') {
        if (!_.isObject(opts.template) || !_.isString(opts.template.class) || !_.isString(opts.template.method)) {
            throw new Error('Unprovided custom template. Please use the following template: template: { class: "...", method: "...", request: "..." }');
        }
    }
    else {
        if (!_.isObject(opts.template)) {
            opts.template = {};
        }
        var templates = __dirname + '/../templates/';
        opts.template.class = opts.template.class || fs.readFileSync(templates + type + '-class.mustache', 'utf-8');
        opts.template.method = opts.template.method || fs.readFileSync(templates + (type === 'typescript' ? 'typescript-' : '') + 'method.mustache', 'utf-8');
        if (type === 'typescript') {
            opts.template.type = opts.template.type || fs.readFileSync(templates + 'type.mustache', 'utf-8');
        }
    }
    if (opts.mustache) {
        _.assign(data, opts.mustache);
    }
    var source = Mustache.render(opts.template.class, data, opts.template);
    var lintOptions = {
        node: type === 'node' || type === 'custom',
        browser: type === 'angular' || type === 'custom' || type === 'react',
        undef: true,
        strict: true,
        trailing: true,
        smarttabs: true,
        maxerr: 999,
        esnext: false
    };
    if (opts.esnext) {
        lintOptions.esnext = true;
    }
    // if(type === 'typescript') {
    //     opts.lint = false;
    // }
    // if (opts.lint === undefined || opts.lint === true) {
    //     lint(source, lintOptions);
    //     lint.errors.forEach(function(error) {
    //         if (error.code[0] === 'E') {
    //             throw new Error(error.reason + ' in ' + error.evidence + ' (' + error.code + ')');
    //         }
    //     });
    // }
    if (opts.beautify === undefined || opts.beautify === true) {
        return beautify(source, { indent_size: 4, max_preserve_newlines: 2 });
    }
    else {
        return source;
    }
}
;
exports.CodeGen = {
    getTypescriptCode: function (opts) {
        if (opts.swagger.swagger !== '2.0') {
            throw 'Typescript is only supported for Swagger 2.0 specs.';
        }
        return getCode(opts, 'typescript');
    }
    // getAngularCode: function(opts){
    //     return getCode(opts, 'angular');
    // },
    // getNodeCode: function(opts){
    //     return getCode(opts, 'node');
    // },
    // getReactCode: function(opts){
    //     return getCode(opts, 'react');
    // },
    // getCustomCode: function(opts){
    //     return getCode(opts, 'custom');
    // }
};
//# sourceMappingURL=codegen.js.map