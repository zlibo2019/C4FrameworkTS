import { Swagger2ParameterObject, SwaggerRef, Swagger2ParameterBodyObject, Swagger2SchemaObject, Swagger2ParameterNotBodyObject, Swagger2ItmesObject, typespec, propertyspec } from "./C4SwaggerDefine";

// 'use strict';

import _ = require('lodash');



/**
 * Recursively converts a swagger type description into a typescript type, i.e., a model for our mustache
 * template.
 *
 * Not all type are currently supported, but they should be straightforward to add.
 *
 * @param swaggerType a swagger type definition, i.e., the right hand side of a swagger type definition.
 * @returns a recursive structure representing the type, which can be used as a template model.
 */
export function convertType(swaggerType : Swagger2ParameterObject | SwaggerRef | Swagger2SchemaObject | Swagger2ItmesObject | Swagger2ItmesObject[], swagger ?: any) : typespec {

    var typespec : typespec = {
        description: (<Swagger2ParameterObject>swaggerType).description,
        isEnum: false
    };

    if (swaggerType.hasOwnProperty('schema')) {
        return convertType((<Swagger2ParameterBodyObject>swaggerType).schema);
    } else if (_.isString((<any>swaggerType).$ref)) {
        typespec.tsType = 'ref';
        typespec.target = (<any>swaggerType).$ref.substring((<any>swaggerType).$ref.lastIndexOf('/') + 1);
    } else if (swaggerType.hasOwnProperty('enum')) {
        typespec.tsType = (<any>swaggerType).enum.map(function(str : string) { return JSON.stringify(str); }).join(' | ');
        typespec.isAtomic = true;
        typespec.isEnum = true;
    } else if ((<Swagger2ParameterNotBodyObject>swaggerType).type === 'string') {
        typespec.tsType = 'string';
    } else if ((<Swagger2ParameterNotBodyObject>swaggerType).type === 'number' || (<Swagger2ParameterNotBodyObject>swaggerType).type === 'integer') {
        typespec.tsType = 'number';
    } else if ((<Swagger2ParameterNotBodyObject>swaggerType).type === 'boolean') {
        typespec.tsType = 'boolean';
    } else if ((<Swagger2ParameterNotBodyObject>swaggerType).type === 'array') {
        typespec.tsType = 'array';
        typespec.elementType = convertType((<any>swaggerType).items);
    } else /*if (swaggerType.type === 'object')*/ { //remaining types are created as objects
        if (<number>(<Swagger2ItmesObject>swaggerType).minItems >= 0 && swaggerType.hasOwnProperty('title') && !(<SwaggerRef>swaggerType).$ref) {
            typespec.tsType = 'any';
        } else {
            typespec.tsType = 'object';
            typespec.properties = [];
            if ((<Swagger2SchemaObject>swaggerType).allOf) {
                _.forEach((<Swagger2SchemaObject>swaggerType).allOf, function (ref : any) {
                    if(ref.$ref) {
                        var refSegments = ref.$ref.split('/');
                        var name = refSegments[refSegments.length - 1];
                        _.forEach(swagger.definitions, function (definition : any, definitionName : any) {
                            if (definitionName === name) {
                                var property = convertType(definition, swagger);
                                Array.prototype.push.apply(typespec.properties, property.properties);
                            }
                        });
                    } else {
                        let property = convertType(ref);
                        Array.prototype.push.apply(typespec.properties, property.properties);
                    }
                });
            }

            _.forEach((<Swagger2SchemaObject>swaggerType).properties, function (propertyType : any, propertyName : any) {
                
                let property : propertyspec = convertType(propertyType);
                property.name = propertyName;

                property.optional = true;
                if ((<any>swaggerType).required && (<any>swaggerType).required.indexOf(propertyName) !== -1) {
                  property.optional = false;
                }

                (<propertyspec[]>typespec.properties).push(property);
            });
        }
    } /*else {
     // type unknown or unsupported... just map to 'any'...
     typespec.tsType = 'any';
     }*/

    // Since Mustache does not provide equality checks, we need to do the case distinction via explicit booleans
    typespec.isRef = typespec.tsType === 'ref';
    typespec.isObject = typespec.tsType === 'object';
    typespec.isArray = typespec.tsType === 'array';
    typespec.isAtomic = typespec.isAtomic || _.includes(['string', 'number', 'boolean', 'any'], typespec.tsType);

    return typespec;
}

// module.exports.convertType = convertType;
