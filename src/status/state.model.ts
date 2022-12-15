import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {RequestItem} from "../request/request.model";
import {RequestState} from "./request-states.model";




interface requestAttrs {
   cod: string;
   title: string
}


@Table({tableName: 'state'})
export class State extends Model<State, requestAttrs> {


    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;


    @Column({type:DataType.STRING, defaultValue: 'preform'})
    cod: string


    @Column({type:DataType.STRING, defaultValue: 'Заготовка'})
    title: string


    @BelongsToMany(() => RequestItem, ()=> RequestState)
    currentStatus: RequestItem[]

    @ForeignKey(() => RequestItem)
    @Column({type: DataType.INTEGER, defaultValue: null})
    request_ID: number;
}
