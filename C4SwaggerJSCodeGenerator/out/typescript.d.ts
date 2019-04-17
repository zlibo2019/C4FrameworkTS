import { Swagger2ParameterObject, SwaggerRef, Swagger2SchemaObject, Swagger2ItmesObject, typespec } from "./C4SwaggerDefine";
/**
 * Recursively converts a swagger type description into a typescript type, i.e., a model for our mustache
 * template.
 *
 * Not all type are currently supported, but they should be straightforward to add.
 *
 * @param swaggerType a swagger type definition, i.e., the right hand side of a swagger type definition.
 * @returns a recursive structure representing the type, which can be used as a template model.
 */
export declare function convertType(swaggerType: Swagger2ParameterObject | SwaggerRef | Swagger2SchemaObject | Swagger2ItmesObject | Swagger2ItmesObject[], swagger?: any): typespec;
