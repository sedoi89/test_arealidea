import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {RequestItem} from "../request/request.model";




interface requestAttrs {
   cod: string;
   title: string
}


@Table({tableName: 'state'})
export class State extends Model<State, requestAttrs> {

    @ForeignKey(() => RequestItem)
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type:DataType.STRING, defaultValue: 'begins'})
    cod: string


    @Column({type:DataType.STRING, defaultValue: 'Заготовка'})
    title: string

}
