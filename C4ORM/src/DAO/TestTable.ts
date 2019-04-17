import { Sequelize, Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
    modelName : 'test_table',
    omitNull : true,
    paranoid : true
})
export default class TestTable extends Model<TestTable> {
    @Column({
        type : DataType.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false,
        field : "test_id"
    })
    id : number | undefined;

    @Column({
        type : DataType.JSONB,
        allowNull : false,
        defaultValue : {
            nickName : 'test_nickName',
            avatarURL : "http://12345",
            gender : 0,
            amount : 1000
        }
    })
    userInfo : any;

    @Column({
        type : DataType.DATE,
        allowNull : false
    })
    test_time : Date | undefined;

    @Column({
        type : DataType.JSONB,
        allowNull : false,
        defaultValue : []
    })
    records : any;
}