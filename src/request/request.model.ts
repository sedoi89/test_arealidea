import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Project} from "../project/project.model";



interface requestAttrs {
    title: string;
    description: string;
    project_ID: number;
    status: string
}


@Table({tableName: 'requests'})
export class RequestItem extends Model<RequestItem, requestAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @Column({type: DataType.STRING})
    status: string;

    @ForeignKey(() => Project)
    @Column({type: DataType.INTEGER, defaultValue: null})
    project_ID: number;
    @BelongsTo(() => Project)
    project: Project


}
