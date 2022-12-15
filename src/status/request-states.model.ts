import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {RequestItem} from "../request/request.model";
import {State} from "./state.model";







@Table({tableName: 'requestState', createdAt:false, updatedAt: false})
export class RequestState extends Model<RequestState> {


    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => State)
    @Column({type:DataType.INTEGER})
    state_ID: number

    @ForeignKey(() => RequestItem)
    @Column({type:DataType.INTEGER})
    request_ID: number





}
