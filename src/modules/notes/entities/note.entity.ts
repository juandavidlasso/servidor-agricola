import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@ObjectType()
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'notas'
})
export class Note extends Model<Note> {
    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
    id_note: number;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.STRING })
    date: string;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.STRING })
    description: string;

    @Field(() => Int, { nullable: true })
    @Column({ allowNull: true, type: DataType.INTEGER })
    cost?: number;
}
