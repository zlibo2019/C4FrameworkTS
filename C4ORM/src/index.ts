// import { Sequelize, Table, Model, Column, DataType } from 'sequelize-typescript';

// const sequelize = new Sequelize({
//     database : 'C4Framework',
//     dialect : 'postgres',
//     username : 'postgres',
//     password : '123456',
//     host : '10.0.0.102',
//     port : 5390,
//     pool : {
//         max : 10,
//         min : 0,
//         acquire : 3000,
//         idle : 10000
//     },
//     logging : false,
//     operatorsAliases : false,
//     // timezone : "+08:00"
// });


// sequelize.addModels([__dirname + '/DAO/*.js']);

// async function launch() {
//     sequelize.models
//     // await TestTable.sync();
//     // await TestTable.create({
//     //     test_time : (new Date())
//     // });

//     // let QueryRes = await TestTable.findAll();
//     // console.log(JSON.stringify(QueryRes, null, 4));
// }

// launch();

import {
    DialectType, TransactionIsolationLevel,
    TransactionType, PoolOptions,
    DBConnectionConfig
} from './C4ORMTypes/C4ORMTypes';

export {
    DialectType, TransactionIsolationLevel,
    TransactionType, PoolOptions,
    DBConnectionConfig
};
