import {Column, DataType,  HasMany, Model, Table} from "sequelize-typescript";
import {RequestItem} from "../request/request.model";




interface projectAttrs {
    title: string;


}


@Table({tableName: 'project'})
export class Project extends Model<Project, projectAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @HasMany(() => RequestItem)
    requests: RequestItem[]


}
