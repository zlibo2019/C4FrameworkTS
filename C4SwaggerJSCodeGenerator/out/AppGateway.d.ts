/// <reference types="request" />
import Request = require("request");
import { C4APIsClient } from "c4apisclient";
export declare type BasicAccountSearchMediaDTO = {
    'basic_acc_no': string;
    'int_code': number;
};
export declare type AppAccountSearchDTO = {
    'app_account'?: string;
    'app_account_like'?: string;
    'app_account_status'?: number;
    'basic_acc_no'?: string;
    'basic_acc_no_like'?: string;
    'column1'?: string;
    'column1_like'?: string;
    'column2'?: string;
    'column2_like'?: string;
    'column3'?: string;
    'column3_like'?: string;
    'column4'?: string;
    'column4_like'?: string;
    'column5'?: string;
    'column5_like'?: string;
    'email'?: string;
    'email_like'?: string;
    'id_card'?: string;
    'id_card_like'?: string;
    'int_code'?: number;
    'label'?: JsonMapEntity;
    'mobilephone'?: string;
    'mobilephone_like'?: string;
    'name'?: string;
    'name_like'?: string;
    'role_nos'?: string;
    'role_nos_like'?: string;
    'sex'?: number;
    'telephone'?: string;
    'telephone_like'?: string;
};
export declare type AppRoleModofyDTO = {
    'access'?: string;
    'attached_info'?: JsonMapEntity;
    'is_enable': number;
    'role_name': string;
    'role_no': number;
    'updated_by': string;
};
export declare type AppAccountQueryDTO = {
    'app_account': string;
    'app_account_status': number;
    'basic_acc_no': string;
    'column1'?: string;
    'column2'?: string;
    'column3'?: string;
    'column4'?: string;
    'column5'?: string;
    'email'?: string;
    'id_card'?: string;
    'int_code': number;
    'label': JsonMapEntity;
    'mobile_phone'?: string;
    'name': string;
    'role_nos': string;
    'sex': number;
    'tele_phone'?: string;
};
export declare type AppRoleQueryDTO = {
    'access': string;
    'attached_info'?: JsonMapEntity;
    'id': number;
    'inserted_by': string;
    'inserted_dt': string;
    'is_enable': number;
    'role_name': string;
    'updated_by': string;
    'updated_dt': string;
};
export declare type JsonResult_string_ = {
    'code'?: number;
    'data'?: string;
    'msg'?: string;
};
export declare type ResourceMatrixDTO = {
    'action': {};
    'desc': string;
    'resource': string;
};
export declare type AppAccountAddDTO = {
    'app_account': string;
    'basic_account_info': BaseBasicAccountDTO;
    'column1'?: string;
    'column2'?: string;
    'column3'?: string;
    'column4'?: string;
    'column5'?: string;
    'inserted_by': string;
    'label'?: JsonMapEntity;
    'password': string;
    'role_nos'?: string;
};
export declare type BaseBasicAccountDTO = {
    'email'?: string;
    'id_card'?: string;
    'mobilephone'?: string;
    'name': string;
    'sex': number;
    'telephone'?: string;
};
export declare type CommPager_AppAccountQueryDTO_ = {
    'curren_records'?: number;
    'page_index'?: number;
    'page_size'?: number;
    'records'?: Array<AppAccountQueryDTO> | AppAccountQueryDTO;
    'total_page'?: number;
    'total_record'?: number;
};
export declare type AuthUserRoleNameDTO = {
    'id'?: number;
    'role_name'?: string;
    'user_id'?: number;
};
export declare type AppAccountLoginDTO = {
    'app_account': string;
    'password': string;
};
export declare type AppRoleAddDTO = {
    'access'?: string;
    'attached_info'?: JsonMapEntity;
    'inserted_by': string;
    'role_name': string;
};
export declare type AppAccountQueryOneDTO = {
    'app_account': string;
    'app_account_status': number;
    'basic_acc_no': string;
    'column1'?: string;
    'column2'?: string;
    'column3'?: string;
    'column4'?: string;
    'column5'?: string;
    'email'?: string;
    'id_card'?: string;
    'int_code': number;
    'label': JsonMapEntity;
    'mobile_phone'?: string;
    'name': string;
    'role_details': Array<AppAccountRoleDTO> | AppAccountRoleDTO;
    'role_nos': string;
    'sex': number;
    'tele_phone'?: string;
};
export declare type JsonResult_List_AuthUserRoleNameDTO__ = {
    'code'?: number;
    'data'?: Array<AuthUserRoleNameDTO> | AuthUserRoleNameDTO;
    'msg'?: string;
};
export declare type JsonResult_AppAccountQueryOneDTO_ = {
    'code'?: number;
    'data'?: AppAccountQueryOneDTO;
    'msg'?: string;
};
export declare type BasicAccountAddDTO = {
    'email'?: string;
    'id_card'?: string;
    'inserted_by': string;
    'mobilephone'?: string;
    'name': string;
    'sex': number;
    'telephone'?: string;
};
export declare type PageSearch_AppRoleSearchDTO_ = {
    'count'?: boolean;
    'order_by'?: string;
    'page_index'?: number;
    'page_size'?: number;
    'search'?: AppRoleSearchDTO;
};
export declare type JsonResult_List_ResourceDetailDTO__ = {
    'code'?: number;
    'data'?: Array<ResourceDetailDTO> | ResourceDetailDTO;
    'msg'?: string;
};
export declare type PageSearch_AppAccountSearchDTO_ = {
    'count'?: boolean;
    'order_by'?: string;
    'page_index'?: number;
    'page_size'?: number;
    'search'?: AppAccountSearchDTO;
};
export declare type AppAccountRoleDTO = {
    'access': string;
    'attached_info'?: JsonMapEntity;
    'role_name': string;
    'role_no': number;
};
export declare type ResourceDetailDTO = {
    'action': {};
    'desc': string;
    'location': string;
};
export declare type AppRoleSearchDTO = {
    'access'?: string;
    'access_like'?: string;
    'attached_info'?: JsonMapEntity;
    'inserted_by'?: string;
    'inserted_dt_begin'?: string;
    'inserted_dt_end'?: string;
    'is_enable'?: number;
    'role_name'?: string;
    'role_name_like'?: string;
    'role_no'?: number;
    'updated_by'?: string;
    'updated_dt_begin'?: string;
    'updated_dt_end'?: string;
};
export declare type JsonResult_List_RoleResourceDTO__ = {
    'code'?: number;
    'data'?: Array<RoleResourceDTO> | RoleResourceDTO;
    'msg'?: string;
};
export declare type BasicAccountModifyMediaDTO = {
    'basic_acc_no': string;
    'iden_medias': JsonMapEntity;
    'int_code': number;
    'updated_by': string;
};
export declare type AppAccountModifyPassDTO = {
    'app_account': string;
    'new_password': string;
    'old_password': string;
    'updated_by': string;
};
export declare type RoleResourceDTO = {
    'name': string;
    'resources': Array<ResourceDetailDTO> | ResourceDetailDTO;
};
export declare type BasicAccountModifyDTO = {
    'basic_acc_no': string;
    'email'?: string;
    'id_card'?: string;
    'mobilephone'?: string;
    'name': string;
    'sex': number;
    'telephone'?: string;
    'updated_by': string;
};
export declare type AppAccountModifyDTO = {
    'app_account': string;
    'column1'?: string;
    'column2'?: string;
    'column3'?: string;
    'column4'?: string;
    'column5'?: string;
    'label'?: JsonMapEntity;
    'role_nos'?: string;
    'updated_by': string;
};
export declare type JsonResult = {
    'code'?: number;
    'data'?: {};
    'msg'?: string;
};
export declare type JsonMapEntity = {};
export declare type JsonResult_AppRoleQueryDTO_ = {
    'code'?: number;
    'data'?: AppRoleQueryDTO;
    'msg'?: string;
};
/**
 * 威尔公司账户微服务系统
 * @class AppGateway
 * @param {(string)} [domainOrOptions] - The project domain.
 */
export default class AppGateway extends C4APIsClient {
    private logger;
    /**
     *
     * @param key 实例ID
     * @param domain 指定域名
     * @param logger 日志对象
     */
    constructor(key: string, domain?: string, logger?: any);
    /**
     * 获取当前可用的服务的Host和Port
     * @param key 当前实例的ID
     */
    getDomain(key: string): string;
    private request(method, url, headers, qs, body, form, formData, fileName?);
    addUsingPUTURL(parameters: {
        'authorization': string;
        'req': AppAccountAddDTO;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * 新增应用账户接口
     * @method
     * @name AppGateway#addUsingPUT
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    addUsingPUT(parameters: {
        'authorization': string;
        'req': AppAccountAddDTO;
        $downloadFileName: string;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    deleteUsingDELETEURL(parameters: {
        'authorization': string;
        'appAccount': string;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * 删除应用账户接口
     * @method
     * @name AppGateway#deleteUsingDELETE
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {string} appAccount - 应用账户
     */
    deleteUsingDELETE(parameters: {
        'authorization': string;
        'appAccount': string;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    loginUsingPOSTURL(parameters: {
        'authorization': string;
        'req': AppAccountLoginDTO;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * 应用账户登陆接口
     * @method
     * @name AppGateway#loginUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    loginUsingPOST(parameters: {
        'authorization': string;
        'req': AppAccountLoginDTO;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    modifyUsingPOSTURL(parameters: {
        'authorization': string;
        'req': AppAccountModifyDTO;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * 修改应用账户信息接口
     * @method
     * @name AppGateway#modifyUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    modifyUsingPOST(parameters: {
        'authorization': string;
        'req': AppAccountModifyDTO;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    modifyPassUsingPOSTURL(parameters: {
        'authorization': string;
        'req': AppAccountModifyPassDTO;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * 修改应用账户密码接口
     * @method
     * @name AppGateway#modifyPassUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    modifyPassUsingPOST(parameters: {
        'authorization': string;
        'req': AppAccountModifyPassDTO;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    searchUsingPOSTURL(parameters: {
        'authorization': string;
        'req': PageSearch_AppAccountSearchDTO_;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * 可排序字段 id,app_no,basic_acc_no,app_account,inserted_dt,updated_dt,name,email
     * @method
     * @name AppGateway#searchUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - req
     */
    searchUsingPOST(parameters: {
        'authorization': string;
        'req': PageSearch_AppAccountSearchDTO_;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    searchOneUsingPOSTURL(parameters: {
        'authorization': string;
        'req': AppAccountSearchDTO;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * 查询某个应用账户接口
     * @method
     * @name AppGateway#searchOneUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - req
     */
    searchOneUsingPOST(parameters: {
        'authorization': string;
        'req': AppAccountSearchDTO;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    addUsingPUT_1URL(parameters: {
        'authorization': string;
        'req': AppRoleAddDTO;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * 新增应用角色接口
     * @method
     * @name AppGateway#addUsingPUT_1
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    addUsingPUT_1(parameters: {
        'authorization': string;
        'req': AppRoleAddDTO;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    modifyUsingPOST_1URL(parameters: {
        'authorization': string;
        'req': AppRoleModofyDTO;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * 修改应用角色接口
     * @method
     * @name AppGateway#modifyUsingPOST_1
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    modifyUsingPOST_1(parameters: {
        'authorization': string;
        'req': AppRoleModofyDTO;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    searchUsingPOST_1URL(parameters: {
        'authorization': string;
        'req': PageSearch_AppRoleSearchDTO_;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * 可排序字段 id,role_name;access,is_enable,inserted_dt,updated_dt
     * @method
     * @name AppGateway#searchUsingPOST_1
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - req
     */
    searchUsingPOST_1(parameters: {
        'authorization': string;
        'req': PageSearch_AppRoleSearchDTO_;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    searchByRoleNosUsingGETURL(parameters: {
        'authorization': string;
        'roleNos': string;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * 根据 ;role_no1;role_no2; 形式的字符串查询权限
     * @method
     * @name AppGateway#searchByRoleNosUsingGET
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {string} roleNos - role_nos
     */
    searchByRoleNosUsingGET(parameters: {
        'authorization': string;
        'roleNos': string;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    searchOneUsingPOST_1URL(parameters: {
        'authorization': string;
        'req': AppRoleSearchDTO;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * 查询某个应用角色接口
     * @method
     * @name AppGateway#searchOneUsingPOST_1
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - req
     */
    searchOneUsingPOST_1(parameters: {
        'authorization': string;
        'req': AppRoleSearchDTO;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    addResourcesUsingPOSTURL(parameters: {
        'authorization': string;
        'param': Array<ResourceMatrixDTO> | ResourceMatrixDTO;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * 增加资源矩阵
     * @method
     * @name AppGateway#addResourcesUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} param - param
     */
    addResourcesUsingPOST(parameters: {
        'authorization': string;
        'param': Array<ResourceMatrixDTO> | ResourceMatrixDTO;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    addRoleMatrixUsingPOSTURL(parameters: {
        'authorization': string;
        'param': Array<RoleResourceDTO> | RoleResourceDTO;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * 增加角色资源矩阵
     * @method
     * @name AppGateway#addRoleMatrixUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} param - param
     */
    addRoleMatrixUsingPOST(parameters: {
        'authorization': string;
        'param': Array<RoleResourceDTO> | RoleResourceDTO;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    getResourceUsingGETURL(parameters: {
        'authorization': string;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * 获取资源矩阵
     * @method
     * @name AppGateway#getResourceUsingGET
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     */
    getResourceUsingGET(parameters: {
        'authorization': string;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    getRoleMatrixUsingGETURL(parameters: {
        'authorization': string;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * 暂时不支持条件查询，默认获取所有
     * @method
     * @name AppGateway#getRoleMatrixUsingGET
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     */
    getRoleMatrixUsingGET(parameters: {
        'authorization': string;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    getUserRolesUsingGETURL(parameters: {
        'authorization': string;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * 获取用户角色信息
     * @method
     * @name AppGateway#getUserRolesUsingGET
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     */
    getUserRolesUsingGET(parameters: {
        'authorization': string;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    addUsingPUT_2URL(parameters: {
        'authorization': string;
        'req': BasicAccountAddDTO;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * 新增基础账户接口
     * @method
     * @name AppGateway#addUsingPUT_2
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    addUsingPUT_2(parameters: {
        'authorization': string;
        'req': BasicAccountAddDTO;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    getMediaUsingPOSTURL(parameters: {
        'authorization': string;
        'req': BasicAccountSearchMediaDTO;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * 根据基础账户INT编号查询基础账户介质接口
     * @method
     * @name AppGateway#getMediaUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    getMediaUsingPOST(parameters: {
        'authorization': string;
        'req': BasicAccountSearchMediaDTO;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    modifyUsingPOST_2URL(parameters: {
        'authorization': string;
        'req': BasicAccountModifyDTO;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * 修改基础账户信息接口
     * @method
     * @name AppGateway#modifyUsingPOST_2
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    modifyUsingPOST_2(parameters: {
        'authorization': string;
        'req': BasicAccountModifyDTO;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    modifyMediaUsingPOSTURL(parameters: {
        'authorization': string;
        'req': BasicAccountModifyMediaDTO;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * 维护基础账户身份识别介质接口
     * @method
     * @name AppGateway#modifyMediaUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} req - 入参
     */
    modifyMediaUsingPOST(parameters: {
        'authorization': string;
        'req': BasicAccountModifyMediaDTO;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    searchByBasicAccNoUsingGETURL(parameters: {
        'authorization': string;
        'basicAccNo': string;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * 根据基础账户基础档案编号查询基础账户接口
     * @method
     * @name AppGateway#searchByBasicAccNoUsingGET
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {string} basicAccNo - 基础账户基础档案编号
     */
    searchByBasicAccNoUsingGET(parameters: {
        'authorization': string;
        'basicAccNo': string;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    registeredEventUsingGETURL(parameters: {
        'authorization': string;
        'id'?: string;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * registeredEvent
     * @method
     * @name AppGateway#registeredEventUsingGET
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} id - id
     */
    registeredEventUsingGET(parameters: {
        'authorization': string;
        'id'?: string;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    registeredEventUsingHEADURL(parameters: {
        'authorization': string;
        'id'?: string;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * registeredEvent
     * @method
     * @name AppGateway#registeredEventUsingHEAD
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} id - id
     */
    registeredEventUsingHEAD(parameters: {
        'authorization': string;
        'id'?: string;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    registeredEventUsingPOSTURL(parameters: {
        'authorization': string;
        'id'?: string;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * registeredEvent
     * @method
     * @name AppGateway#registeredEventUsingPOST
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} id - id
     */
    registeredEventUsingPOST(parameters: {
        'authorization': string;
        'id'?: string;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    registeredEventUsingPUTURL(parameters: {
        'authorization': string;
        'id'?: string;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * registeredEvent
     * @method
     * @name AppGateway#registeredEventUsingPUT
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} id - id
     */
    registeredEventUsingPUT(parameters: {
        'authorization': string;
        'id'?: string;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    registeredEventUsingDELETEURL(parameters: {
        'authorization': string;
        'id'?: string;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * registeredEvent
     * @method
     * @name AppGateway#registeredEventUsingDELETE
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} id - id
     */
    registeredEventUsingDELETE(parameters: {
        'authorization': string;
        'id'?: string;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    registeredEventUsingOPTIONSURL(parameters: {
        'authorization': string;
        'id'?: string;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * registeredEvent
     * @method
     * @name AppGateway#registeredEventUsingOPTIONS
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} id - id
     */
    registeredEventUsingOPTIONS(parameters: {
        'authorization': string;
        'id'?: string;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    registeredEventUsingPATCHURL(parameters: {
        'authorization': string;
        'id'?: string;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * registeredEvent
     * @method
     * @name AppGateway#registeredEventUsingPATCH
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     * @param {} id - id
     */
    registeredEventUsingPATCH(parameters: {
        'authorization': string;
        'id'?: string;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
    specUsingGETURL(parameters: {
        'authorization': string;
        $queryParameters?: any;
        $domain?: string;
    }): string;
    /**
     * spec
     * @method
     * @name AppGateway#specUsingGET
     * @param {string} authorization - 提供的JWT Token,格式 'Token {TOKEN}'
     */
    specUsingGET(parameters: {
        'authorization': string;
        $queryParameters?: any;
        $domain?: string;
    }): Promise<Request.Response | null>;
}
