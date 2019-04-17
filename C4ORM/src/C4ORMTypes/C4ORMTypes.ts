// 支持的数据库类型
export type DialectType = 'mysql' | 'sqlite' | 'postgres' | 'mssql';

// 事务隔离级别
export type TransactionIsolationLevelReadUncommitted = 'READ UNCOMMITTED';
export type TransactionIsolationLevelReadCommitted   = 'READ COMMITTED';
export type TransactionIsolationLevelRepeatableRead  = 'REPEATABLE READ';
export type TransactionIsolationLevelSerializable    = 'SERIALIZABLE';
export type TransactionIsolationLevel = TransactionIsolationLevelReadUncommitted | TransactionIsolationLevelReadCommitted | TransactionIsolationLevelRepeatableRead | TransactionIsolationLevelSerializable;

// 事务类型
export type TransactionTypeDeferred  = 'DEFERRED';
export type TransactionTypeImmediate = 'IMMEDIATE';
export type TransactionTypeExclusive = 'EXCLUSIVE';
export type TransactionType = TransactionTypeDeferred | TransactionTypeImmediate | TransactionTypeExclusive;

// 连接池配置
export interface PoolOptions {
    max     ?: number;                          // 最大连接数
    min     ?: number;                          // 最小连接数
    idle    ?: number;                          // 连接最长空闲时间，单位毫秒
    acquire ?: number;                          // 获取连接超时时间，单位毫秒
    validate?: (client?: any) => boolean;       // 验证连接可用的回调方法
    evict   ?: number;                          // 剔去过期连接的间隔，单位毫秒
}

// 数据库基本配置
export interface Options {
    dialect             ?: DialectType;                 // 默认为"mysql"
    dialectModulePath   ?: string;                      // 指定底层的方言库（一般不需要设置）
    dialectOptions      ?: Object;                      // 用于传递给底层方言库的扩展配置项（默认为空，当前支持：'mysql','postgres', 'mssql'）
    storage             ?: string;                      // 设置sqlite的存储引擎，默认':memory:'
    host                ?: string;                      // 数据库Host，默认是'localhost'
    port                ?: number;                      // 数据库的端口，默认是方言的默认端口
    protocol            ?: string;                      // 通信协议，默认是'tcp'，postgres专属，（一般不需要设置）
    logging             ?: boolean | Function;          // 设置日志方法，默认console.log，false关闭日志输出
    omitNull            ?: boolean;                     // 禁止将undefined转换为NULL，默认是false
    native              ?: boolean;                     // 标记是否使用Native的库，posgres专属
    timezone            ?: string;
    typeValidation      ?: boolean;                     // 在insert和update时启用内建的校验，默认false
    pool                ?: PoolOptions;                 // 连接池配置
    quoteIdentifiers    ?: boolean;                     // false会使postgres的表名不区分大小写，并且忽略双引号，默认true
    databaseVersion     ?: number;                      // 数据库的版本，通常自动获取，不需要设置
    isolationLevel      ?: TransactionIsolationLevel;   // 事务隔离级别，默认为可重复读
    transactionType     ?: TransactionType;             // 事务类型，DEFERRED，IMMEDIATE，EXCLUSIVE，默认DEFERRED
    operatorsAliases    ?: boolean;                     // 操作别名，默认false
};

// DBConnectionConfig
export interface IDBConnectionConfig extends Options {
    database    : string;               // 数据库名
    username    : string;               // 用户名
    password    : string;               // 密码
};

export interface IDBUriConfig extends Options {
    url : string;
}

export type DBConnectionConfig = IDBConnectionConfig | IDBUriConfig;
