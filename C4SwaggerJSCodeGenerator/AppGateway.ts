import Request = require("request");
import {
    C4RESTFulClient,
    RequestOption
} from "c4restfulclient";
import {
    C4Logger
} from 'c4logger';
import {
    C4DependencyService,
    C4APIsClient
} from "c4apisclient";

export type BasicAccountSearchMediaDTO = {
    'basic_acc_no': string

    'int_code': number

};
export type AppAccountSearchDTO = {
    'app_account' ? : string

    'app_account_like' ? : string

    'app_account_status' ? : number

    'basic_acc_no' ? : string

    'basic_acc_no_like' ? : string

    'column1' ? : string

    'column1_like' ? : string

    'column2' ? : string

    'column2_like' ? : string

    'column3' ? : string

    'column3_like' ? : string

    'column4' ? : string

    'column4_like' ? : string

    'column5' ? : string

    'column5_like' ? : string

    'email' ? : string

    'email_like' ? : string

    'id_card' ? : string

    'id_card_like' ? : string

    'int_code' ? : number

    'label' ? : JsonMapEntity

    'mobilephone' ? : string

    'mobilephone_like' ? : string

    'name' ? : string

    'name_like' ? : string

    'role_nos' ? : string

    'role_nos_like' ? : string

    'sex' ? : number

    'telephone' ? : string

    'telephone_like' ? : string

};
export type AppRoleModofyDTO = {
    'access' ? : string

    'attached_info' ? : JsonMapEntity

    'is_enable': number

    'role_name': string

    'role_no': number

    'updated_by': string

};
export type AppAccountQueryDTO = {
    'app_account': string

    'app_account_status': number

    'basic_acc_no': string

    'column1' ? : string

    'column2' ? : string

    'column3' ? : string

    'column4' ? : string

    'column5' ? : string

    'email' ? : string

    'id_card' ? : string

    'int_code': number

    'label': JsonMapEntity

    'mobile_phone' ? : string

    'name': string

    'role_nos': string

    'sex': number

    'tele_phone' ? : string

};
export type AppRoleQueryDTO = {
    'access': string

    'attached_info' ? : JsonMapEntity

    'id': number

    'inserted_by': string

    'inserted_dt': string

    'is_enable': number

    'role_name': string

    'updated_by': string

    'updated_dt': string

};
export type JsonResult_string_ = {
    'code' ? : number

    'data' ? : string

    'msg' ? : string

};
export type ResourceMatrixDTO = {
    'action': {}

    'desc': string

    'resource': string

};
export type AppAccountAddDTO = {
    'app_account': string

    'basic_account_info': BaseBasicAccountDTO

    'column1' ? : string

    'column2' ? : string

    'column3' ? : string

    'column4' ? : string

    'column5' ? : string

    'inserted_by': string

    'label' ? : JsonMapEntity

    'password': string

    'role_nos' ? : string

};
export type BaseBasicAccountDTO = {
    'email' ? : string

    'id_card' ? : string

    'mobilephone' ? : string

    'name': string

    'sex': number

    'telephone' ? : string

};
export type CommPager_AppAccountQueryDTO_ = {
    'curren_records' ? : number

    'page_index' ? : number

    'page_size' ? : number

    'records' ? : Array < AppAccountQueryDTO >
        | AppAccountQueryDTO

    'total_page' ? : number

    'total_record' ? : number

};
export type AuthUserRoleNameDTO = {
    'id' ? : number

    'role_name' ? : string

    'user_id' ? : number

};
export type AppAccountLoginDTO = {
    'app_account': string

    'password': string

};
export type AppRoleAddDTO = {
    'access' ? : string

    'attached_info' ? : JsonMapEntity

    'inserted_by': string

    'role_name': string

};
export type AppAccountQueryOneDTO = {
    'app_account': string

    'app_account_status': number

    'basic_acc_no': string

    'column1' ? : string

    'column2' ? : string

    'column3' ? : string

    'column4' ? : string

    'column5' ? : string

    'email' ? : string

    'id_card' ? : string

    'int_code': number

    'label': JsonMapEntity

    'mobile_phone' ? : string

    'name': string

    'role_details': Array < AppAccountRoleDTO >
        | AppAccountRoleDTO

    'role_nos': string

    'sex': number

    'tele_phone' ? : string

};
export type JsonResult_List_AuthUserRoleNameDTO__ = {
    'code' ? : number

    'data' ? : Array < AuthUserRoleNameDTO >
        | AuthUserRoleNameDTO

    'msg' ? : string

};
export type JsonResult_AppAccountQueryOneDTO_ = {
    'code' ? : number

    'data' ? : AppAccountQueryOneDTO

    'msg' ? : string

};
export type BasicAccountAddDTO = {
    'email' ? : string

    'id_card' ? : string

    'inserted_by': string

    'mobilephone' ? : string

    'name': string

    'sex': number

    'telephone' ? : string

};
export type PageSearch_AppRoleSearchDTO_ = {
    'count' ? : boolean

    'order_by' ? : string

    'page_index' ? : number

    'page_size' ? : number

    'search' ? : AppRoleSearchDTO

};
export type JsonResult_List_ResourceDetailDTO__ = {
    'code' ? : number

    'data' ? : Array < ResourceDetailDTO >
        | ResourceDetailDTO

    'msg' ? : string

};
export type PageSearch_AppAccountSearchDTO_ = {
    'count' ? : boolean

    'order_by' ? : string

    'page_index' ? : number

    'page_size' ? : number

    'search' ? : AppAccountSearchDTO

};
export type AppAccountRoleDTO = {
    'access': string

    'attached_info' ? : JsonMapEntity

    'role_name': string

    'role_no': number

};
export type ResourceDetailDTO = {
    'action': {}

    'desc': string

    'location': string

};
export type AppRoleSearchDTO = {
    'access' ? : string

    'access_like' ? : string

    'attached_info' ? : JsonMapEntity

    'inserted_by' ? : string

    'inserted_dt_begin' ? : string

    'inserted_dt_end' ? : string

    'is_enable' ? : number

    'role_name' ? : string

    'role_name_like' ? : string

    'role_no' ? : number

    'updated_by' ? : string

    'updated_dt_begin' ? : string

    'updated_dt_end' ? : string

};
export type JsonResult_List_RoleResourceDTO__ = {
    'code' ? : number

    'data' ? : Array < RoleResourceDTO >
        | RoleResourceDTO

    'msg' ? : string

};
export type BasicAccountModifyMediaDTO = {
    'basic_acc_no': string

    'iden_medias': JsonMapEntity

    'int_code': number

    'updated_by': string

};
export type AppAccountModifyPassDTO = {
    'app_account': string

    'new_password': string

    'old_password': string

    'updated_by': string

};
export type RoleResourceDTO = {
    'name': string

    'resources': Array < ResourceDetailDTO >
        | ResourceDetailDTO

};
export type BasicAccountModifyDTO = {
    'basic_acc_no': string

    'email' ? : string

    'id_card' ? : string

    'mobilephone' ? : string

    'name': string

    'sex': number

    'telephone' ? : string

    'updated_by': string

};
export type AppAccountModifyDTO = {
    'app_account': string

    'column1' ? : string

    'column2' ? : string

    'column3' ? : string

    'column4' ? : string

    'column5' ? : string

    'label' ? : JsonMapEntity

    'role_nos' ? : string

    'updated_by': string

};
export type JsonResult = {
    'code' ? : number

    'data' ? : {}

    'msg' ? : string

};
export type JsonMapEntity = {};
export type JsonResult_AppRoleQueryDTO_ = {
    'code' ? : number

    'data' ? : AppRoleQueryDTO

    'msg' ? : string

};

/**
 * 威尔公司账户微服务系统
 * @class AppGateway
 * @param {(string)} [domainOrOptions] - The project domain.
 */
export default class AppGateway extends C4APIsClient {

    /**
     * 
     * @param key 实例ID
     * @param domain 指定域名
     * @param logger 日志对象
     */
    constructor(key: string, domain ? : string, private logger ? : any) {
        super(key);
    }

    /**
     * 获取当前可用的服务的Host和Port
     * @param key 当前实例的ID
     */
    getDomain(key: string) {
        if (this.m_Service) {
            return this.m_Service.getDomain(key);
        }
        return "";
    }

    private async request(method: string, url: string, headers: any, qs: any, body: any, form: any, formData: any, fileName ? : string) {
        if (this.m_Logger) {
            this.m_Logger.info(`Call ${method} ${url}`);
        }
        if (this.m_RESTClient === null) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('RESTFulClient not init.') : ( < any > this.m_Logger).error('RESTFulClient not init.');
                return null;
            } else {
                throw new Error('RESTFulClient not init.');
            }
        }
        let curRequestOp: RequestOption = {};
        if (qs) {
            curRequestOp.qs = qs;
        }
        if (method.toLowerCase() !== "get" && body) {
            curRequestOp.body = body;
        }
        if (formData) {
            curRequestOp.formData = formData;
        } else if (form) {
            curRequestOp.form = form;
        }

        if (fileName) {
            curRequestOp.downloadFileName = fileName;
        }

        return await ( < C4RESTFulClient > this.m_RESTClient).request(url, method.toLowerCase(), curRequestOp).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    addUsingPUTURL(parameters: {
        'authorization': string,
        'req': AppAccountAddDTO,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/account/add';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 新增应用账户接口
     * @method
     * @name AppGateway#addUsingPUT
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    async addUsingPUT(parameters: {
        'authorization': string,
        'req': AppAccountAddDTO,
        $downloadFileName: string,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/account/add';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        downloadFileName = parameters.$downloadFileName;

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json,application/xml';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters['req'] !== undefined) {
            body = parameters['req'];
        }

        if (parameters['req'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: req') : ( < any > this.m_Logger).error('Missing required  parameter: req');
                return null;
            } else {
                throw new Error('Missing required  parameter: req');
            }
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('PUT', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    deleteUsingDELETEURL(parameters: {
        'authorization': string,
        'appAccount': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/account/delete/{app_account}';

        path = path.replace('{app_account}', `${parameters['appAccount']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 删除应用账户接口
     * @method
     * @name AppGateway#deleteUsingDELETE
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {string} appAccount - 应用账户
     */
    async deleteUsingDELETE(parameters: {
        'authorization': string,
        'appAccount': string,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/account/delete/{app_account}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        path = path.replace('{app_account}', `${parameters['appAccount']}`);

        if (parameters['appAccount'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: appAccount') : ( < any > this.m_Logger).error('Missing required  parameter: appAccount');
                return null;
            } else {
                throw new Error('Missing required  parameter: appAccount');
            }
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('DELETE', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    loginUsingPOSTURL(parameters: {
        'authorization': string,
        'req': AppAccountLoginDTO,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/account/login';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 应用账户登陆接口
     * @method
     * @name AppGateway#loginUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    async loginUsingPOST(parameters: {
        'authorization': string,
        'req': AppAccountLoginDTO,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/account/login';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters['req'] !== undefined) {
            body = parameters['req'];
        }

        if (parameters['req'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: req') : ( < any > this.m_Logger).error('Missing required  parameter: req');
                return null;
            } else {
                throw new Error('Missing required  parameter: req');
            }
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    modifyUsingPOSTURL(parameters: {
        'authorization': string,
        'req': AppAccountModifyDTO,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/account/modify';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 修改应用账户信息接口
     * @method
     * @name AppGateway#modifyUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    async modifyUsingPOST(parameters: {
        'authorization': string,
        'req': AppAccountModifyDTO,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/account/modify';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters['req'] !== undefined) {
            body = parameters['req'];
        }

        if (parameters['req'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: req') : ( < any > this.m_Logger).error('Missing required  parameter: req');
                return null;
            } else {
                throw new Error('Missing required  parameter: req');
            }
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    modifyPassUsingPOSTURL(parameters: {
        'authorization': string,
        'req': AppAccountModifyPassDTO,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/account/modify_pass';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 修改应用账户密码接口
     * @method
     * @name AppGateway#modifyPassUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    async modifyPassUsingPOST(parameters: {
        'authorization': string,
        'req': AppAccountModifyPassDTO,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/account/modify_pass';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters['req'] !== undefined) {
            body = parameters['req'];
        }

        if (parameters['req'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: req') : ( < any > this.m_Logger).error('Missing required  parameter: req');
                return null;
            } else {
                throw new Error('Missing required  parameter: req');
            }
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    searchUsingPOSTURL(parameters: {
        'authorization': string,
        'req': PageSearch_AppAccountSearchDTO_,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/account/search';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 可排序字段 id,app_no,basic_acc_no,app_account,inserted_dt,updated_dt,name,email
     * @method
     * @name AppGateway#searchUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - req
     */
    async searchUsingPOST(parameters: {
        'authorization': string,
        'req': PageSearch_AppAccountSearchDTO_,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/account/search';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters['req'] !== undefined) {
            body = parameters['req'];
        }

        if (parameters['req'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: req') : ( < any > this.m_Logger).error('Missing required  parameter: req');
                return null;
            } else {
                throw new Error('Missing required  parameter: req');
            }
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    searchOneUsingPOSTURL(parameters: {
        'authorization': string,
        'req': AppAccountSearchDTO,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/account/searchone';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 查询某个应用账户接口
     * @method
     * @name AppGateway#searchOneUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - req
     */
    async searchOneUsingPOST(parameters: {
        'authorization': string,
        'req': AppAccountSearchDTO,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/account/searchone';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters['req'] !== undefined) {
            body = parameters['req'];
        }

        if (parameters['req'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: req') : ( < any > this.m_Logger).error('Missing required  parameter: req');
                return null;
            } else {
                throw new Error('Missing required  parameter: req');
            }
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    addUsingPUT_1URL(parameters: {
        'authorization': string,
        'req': AppRoleAddDTO,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/role/add';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 新增应用角色接口
     * @method
     * @name AppGateway#addUsingPUT_1
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    async addUsingPUT_1(parameters: {
        'authorization': string,
        'req': AppRoleAddDTO,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/role/add';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters['req'] !== undefined) {
            body = parameters['req'];
        }

        if (parameters['req'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: req') : ( < any > this.m_Logger).error('Missing required  parameter: req');
                return null;
            } else {
                throw new Error('Missing required  parameter: req');
            }
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('PUT', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    modifyUsingPOST_1URL(parameters: {
        'authorization': string,
        'req': AppRoleModofyDTO,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/role/modify';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 修改应用角色接口
     * @method
     * @name AppGateway#modifyUsingPOST_1
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    async modifyUsingPOST_1(parameters: {
        'authorization': string,
        'req': AppRoleModofyDTO,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/role/modify';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters['req'] !== undefined) {
            body = parameters['req'];
        }

        if (parameters['req'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: req') : ( < any > this.m_Logger).error('Missing required  parameter: req');
                return null;
            } else {
                throw new Error('Missing required  parameter: req');
            }
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    searchUsingPOST_1URL(parameters: {
        'authorization': string,
        'req': PageSearch_AppRoleSearchDTO_,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/role/search';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 可排序字段 id,role_name;access,is_enable,inserted_dt,updated_dt
     * @method
     * @name AppGateway#searchUsingPOST_1
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - req
     */
    async searchUsingPOST_1(parameters: {
        'authorization': string,
        'req': PageSearch_AppRoleSearchDTO_,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/role/search';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters['req'] !== undefined) {
            body = parameters['req'];
        }

        if (parameters['req'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: req') : ( < any > this.m_Logger).error('Missing required  parameter: req');
                return null;
            } else {
                throw new Error('Missing required  parameter: req');
            }
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    searchByRoleNosUsingGETURL(parameters: {
        'authorization': string,
        'roleNos': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/role/search_by_role_nos/{role_nos}';

        path = path.replace('{role_nos}', `${parameters['roleNos']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 根据 ;role_no1;role_no2; 形式的字符串查询权限
     * @method
     * @name AppGateway#searchByRoleNosUsingGET
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {string} roleNos - role_nos
     */
    async searchByRoleNosUsingGET(parameters: {
        'authorization': string,
        'roleNos': string,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/role/search_by_role_nos/{role_nos}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        path = path.replace('{role_nos}', `${parameters['roleNos']}`);

        if (parameters['roleNos'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: roleNos') : ( < any > this.m_Logger).error('Missing required  parameter: roleNos');
                return null;
            } else {
                throw new Error('Missing required  parameter: roleNos');
            }
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('GET', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    searchOneUsingPOST_1URL(parameters: {
        'authorization': string,
        'req': AppRoleSearchDTO,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/role/searchone';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 查询某个应用角色接口
     * @method
     * @name AppGateway#searchOneUsingPOST_1
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - req
     */
    async searchOneUsingPOST_1(parameters: {
        'authorization': string,
        'req': AppRoleSearchDTO,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/app/role/searchone';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters['req'] !== undefined) {
            body = parameters['req'];
        }

        if (parameters['req'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: req') : ( < any > this.m_Logger).error('Missing required  parameter: req');
                return null;
            } else {
                throw new Error('Missing required  parameter: req');
            }
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    addResourcesUsingPOSTURL(parameters: {
        'authorization': string,
        'param': Array < ResourceMatrixDTO >
            | ResourceMatrixDTO

            ,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/auth/addResources';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 增加资源矩阵
     * @method
     * @name AppGateway#addResourcesUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} param - param
     */
    async addResourcesUsingPOST(parameters: {
        'authorization': string,
        'param': Array < ResourceMatrixDTO >
            | ResourceMatrixDTO

            ,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/auth/addResources';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters['param'] !== undefined) {
            body = parameters['param'];
        }

        if (parameters['param'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: param') : ( < any > this.m_Logger).error('Missing required  parameter: param');
                return null;
            } else {
                throw new Error('Missing required  parameter: param');
            }
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    addRoleMatrixUsingPOSTURL(parameters: {
        'authorization': string,
        'param': Array < RoleResourceDTO >
            | RoleResourceDTO

            ,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/auth/addRoleMatrix';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 增加角色资源矩阵
     * @method
     * @name AppGateway#addRoleMatrixUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} param - param
     */
    async addRoleMatrixUsingPOST(parameters: {
        'authorization': string,
        'param': Array < RoleResourceDTO >
            | RoleResourceDTO

            ,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/auth/addRoleMatrix';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters['param'] !== undefined) {
            body = parameters['param'];
        }

        if (parameters['param'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: param') : ( < any > this.m_Logger).error('Missing required  parameter: param');
                return null;
            } else {
                throw new Error('Missing required  parameter: param');
            }
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    getResourceUsingGETURL(parameters: {
        'authorization': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/auth/getResource';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 获取资源矩阵
     * @method
     * @name AppGateway#getResourceUsingGET
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     */
    async getResourceUsingGET(parameters: {
        'authorization': string,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/auth/getResource';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('GET', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    getRoleMatrixUsingGETURL(parameters: {
        'authorization': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/auth/getRoleMatrix';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 暂时不支持条件查询，默认获取所有
     * @method
     * @name AppGateway#getRoleMatrixUsingGET
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     */
    async getRoleMatrixUsingGET(parameters: {
        'authorization': string,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/auth/getRoleMatrix';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('GET', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    getUserRolesUsingGETURL(parameters: {
        'authorization': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/auth/getUserRoles';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 获取用户角色信息
     * @method
     * @name AppGateway#getUserRolesUsingGET
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     */
    async getUserRolesUsingGET(parameters: {
        'authorization': string,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/auth/getUserRoles';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('GET', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    addUsingPUT_2URL(parameters: {
        'authorization': string,
        'req': BasicAccountAddDTO,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/basic/account/add';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 新增基础账户接口
     * @method
     * @name AppGateway#addUsingPUT_2
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    async addUsingPUT_2(parameters: {
        'authorization': string,
        'req': BasicAccountAddDTO,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/basic/account/add';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters['req'] !== undefined) {
            body = parameters['req'];
        }

        if (parameters['req'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: req') : ( < any > this.m_Logger).error('Missing required  parameter: req');
                return null;
            } else {
                throw new Error('Missing required  parameter: req');
            }
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('PUT', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    getMediaUsingPOSTURL(parameters: {
        'authorization': string,
        'req': BasicAccountSearchMediaDTO,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/basic/account/get_media';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 根据基础账户INT编号查询基础账户介质接口
     * @method
     * @name AppGateway#getMediaUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    async getMediaUsingPOST(parameters: {
        'authorization': string,
        'req': BasicAccountSearchMediaDTO,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/basic/account/get_media';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters['req'] !== undefined) {
            body = parameters['req'];
        }

        if (parameters['req'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: req') : ( < any > this.m_Logger).error('Missing required  parameter: req');
                return null;
            } else {
                throw new Error('Missing required  parameter: req');
            }
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    modifyUsingPOST_2URL(parameters: {
        'authorization': string,
        'req': BasicAccountModifyDTO,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/basic/account/modify';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 修改基础账户信息接口
     * @method
     * @name AppGateway#modifyUsingPOST_2
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    async modifyUsingPOST_2(parameters: {
        'authorization': string,
        'req': BasicAccountModifyDTO,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/basic/account/modify';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters['req'] !== undefined) {
            body = parameters['req'];
        }

        if (parameters['req'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: req') : ( < any > this.m_Logger).error('Missing required  parameter: req');
                return null;
            } else {
                throw new Error('Missing required  parameter: req');
            }
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    modifyMediaUsingPOSTURL(parameters: {
        'authorization': string,
        'req': BasicAccountModifyMediaDTO,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/basic/account/modify_media';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 维护基础账户身份识别介质接口
     * @method
     * @name AppGateway#modifyMediaUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    async modifyMediaUsingPOST(parameters: {
        'authorization': string,
        'req': BasicAccountModifyMediaDTO,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/basic/account/modify_media';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters['req'] !== undefined) {
            body = parameters['req'];
        }

        if (parameters['req'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: req') : ( < any > this.m_Logger).error('Missing required  parameter: req');
                return null;
            } else {
                throw new Error('Missing required  parameter: req');
            }
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    searchByBasicAccNoUsingGETURL(parameters: {
        'authorization': string,
        'basicAccNo': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/basic/account/searchbybasic_acc_no/{basic_acc_no}';

        path = path.replace('{basic_acc_no}', `${parameters['basicAccNo']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * 根据基础账户基础档案编号查询基础账户接口
     * @method
     * @name AppGateway#searchByBasicAccNoUsingGET
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {string} basicAccNo - 基础账户基础档案编号
     */
    async searchByBasicAccNoUsingGET(parameters: {
        'authorization': string,
        'basicAccNo': string,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/basic/account/searchbybasic_acc_no/{basic_acc_no}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        path = path.replace('{basic_acc_no}', `${parameters['basicAccNo']}`);

        if (parameters['basicAccNo'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: basicAccNo') : ( < any > this.m_Logger).error('Missing required  parameter: basicAccNo');
                return null;
            } else {
                throw new Error('Missing required  parameter: basicAccNo');
            }
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('GET', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    registeredEventUsingGETURL(parameters: {
        'authorization': string,
        'id' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/event/callback/register';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * registeredEvent
     * @method
     * @name AppGateway#registeredEventUsingGET
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} id - id
     */
    async registeredEventUsingGET(parameters: {
        'authorization': string,
        'id' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/event/callback/register';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = '*/*';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters['id'] !== undefined) {
            body = parameters['id'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('GET', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    registeredEventUsingHEADURL(parameters: {
        'authorization': string,
        'id' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/event/callback/register';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * registeredEvent
     * @method
     * @name AppGateway#registeredEventUsingHEAD
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} id - id
     */
    async registeredEventUsingHEAD(parameters: {
        'authorization': string,
        'id' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/event/callback/register';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = '*/*';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters['id'] !== undefined) {
            body = parameters['id'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('HEAD', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    registeredEventUsingPOSTURL(parameters: {
        'authorization': string,
        'id' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/event/callback/register';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * registeredEvent
     * @method
     * @name AppGateway#registeredEventUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} id - id
     */
    async registeredEventUsingPOST(parameters: {
        'authorization': string,
        'id' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/event/callback/register';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = '*/*';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters['id'] !== undefined) {
            body = parameters['id'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('POST', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    registeredEventUsingPUTURL(parameters: {
        'authorization': string,
        'id' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/event/callback/register';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * registeredEvent
     * @method
     * @name AppGateway#registeredEventUsingPUT
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} id - id
     */
    async registeredEventUsingPUT(parameters: {
        'authorization': string,
        'id' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/event/callback/register';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = '*/*';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters['id'] !== undefined) {
            body = parameters['id'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('PUT', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    registeredEventUsingDELETEURL(parameters: {
        'authorization': string,
        'id' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/event/callback/register';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * registeredEvent
     * @method
     * @name AppGateway#registeredEventUsingDELETE
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} id - id
     */
    async registeredEventUsingDELETE(parameters: {
        'authorization': string,
        'id' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/event/callback/register';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = '*/*';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters['id'] !== undefined) {
            body = parameters['id'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('DELETE', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    registeredEventUsingOPTIONSURL(parameters: {
        'authorization': string,
        'id' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/event/callback/register';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * registeredEvent
     * @method
     * @name AppGateway#registeredEventUsingOPTIONS
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} id - id
     */
    async registeredEventUsingOPTIONS(parameters: {
        'authorization': string,
        'id' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/event/callback/register';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = '*/*';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters['id'] !== undefined) {
            body = parameters['id'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('OPTIONS', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    registeredEventUsingPATCHURL(parameters: {
        'authorization': string,
        'id' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/event/callback/register';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * registeredEvent
     * @method
     * @name AppGateway#registeredEventUsingPATCH
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} id - id
     */
    async registeredEventUsingPATCH(parameters: {
        'authorization': string,
        'id' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/event/callback/register';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = '*/*';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters['id'] !== undefined) {
            body = parameters['id'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('PATCH', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

    specUsingGETURL(parameters: {
        'authorization': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return "";
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/spec';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * spec
     * @method
     * @name AppGateway#specUsingGET
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     */
    async specUsingGET(parameters: {
        'authorization': string,
        $queryParameters ? : any,
        $domain ? : string
    }) {
        const domain = parameters.$domain ? parameters.$domain : this.getDomain(this.m_InstanceID);
        if (domain === "") {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Invalid domain.') : ( < any > this.m_Logger).error('Invalid domain.');
                return null;
            } else {
                throw new Error('Invalid domain.');
            }
        }
        let path = '/spec';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        let formData: any = {};
        let downloadFileName: string | undefined = undefined;

        headers['Accept'] = '*/*';
        headers['Content-Type'] = 'application/json';

        if (parameters['authorization'] !== undefined) {
            headers['Authorization'] = parameters['authorization'];
        }

        if (parameters['authorization'] === undefined) {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err('Missing required  parameter: authorization') : ( < any > this.m_Logger).error('Missing required  parameter: authorization');
                return null;
            } else {
                throw new Error('Missing required  parameter: authorization');
            }
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        return await this.request('GET', domain + path, headers, queryParameters, body, form, formData, downloadFileName).catch((err) => {
            if (this.m_Logger) {
                ( < any > this.m_Logger).err ? ( < any > this.m_Logger).err(err) : ( < any > this.m_Logger).error(err);
                return null;
            } else {
                throw err;
            }
        });
    }

}