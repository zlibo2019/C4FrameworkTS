import { Model } from 'sequelize-typescript';
export default class TestTable extends Model<TestTable> {
    id: number | undefined;
    userInfo: any;
    test_time: Date | undefined;
    records: any;
}
