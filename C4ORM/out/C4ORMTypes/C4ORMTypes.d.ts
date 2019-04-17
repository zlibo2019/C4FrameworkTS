export declare type DialectType = 'mysql' | 'sqlite' | 'postgres' | 'mssql';
export declare type TransactionIsolationLevelReadUncommitted = 'READ UNCOMMITTED';
export declare type TransactionIsolationLevelReadCommitted = 'READ COMMITTED';
export declare type TransactionIsolationLevelRepeatableRead = 'REPEATABLE READ';
export declare type TransactionIsolationLevelSerializable = 'SERIALIZABLE';
export declare type TransactionIsolationLevel = TransactionIsolationLevelReadUncommitted | TransactionIsolationLevelReadCommitted | TransactionIsolationLevelRepeatableRead | TransactionIsolationLevelSerializable;
export declare type TransactionTypeDeferred = 'DEFERRED';
export declare type TransactionTypeImmediate = 'IMMEDIATE';
export declare type TransactionTypeExclusive = 'EXCLUSIVE';
export declare type TransactionType = TransactionTypeDeferred | TransactionTypeImmediate | TransactionTypeExclusive;
export interface PoolOptions {
    max?: number;
    min?: number;
    idle?: number;
    acquire?: number;
    validate?: (client?: any) => boolean;
    evict?: number;
}
export interface Options {
    dialect?: DialectType;
    dialectModulePath?: string;
    dialectOptions?: Object;
    storage?: string;
    host?: string;
    port?: number;
    protocol?: string;
    logging?: boolean | Function;
    omitNull?: boolean;
    native?: boolean;
    timezone?: string;
    typeValidation?: boolean;
    pool?: PoolOptions;
    quoteIdentifiers?: boolean;
    databaseVersion?: number;
    isolationLevel?: TransactionIsolationLevel;
    transactionType?: TransactionType;
    operatorsAliases?: boolean;
}
export interface IDBConnectionConfig extends Options {
    database: string;
    username: string;
    password: string;
}
export interface IDBUriConfig extends Options {
    url: string;
}
export declare type DBConnectionConfig = IDBConnectionConfig | IDBUriConfig;
