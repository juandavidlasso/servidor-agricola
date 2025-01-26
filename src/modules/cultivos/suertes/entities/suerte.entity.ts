import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Corte } from '../../cortes/entities/corte.entity';

@ObjectType()
@Table({
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: 'suertes'
})
export class Suerte extends Model<Suerte> {
    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
    id_suerte: number;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.STRING })
    nombre: string;

    @Field(() => Number, { nullable: true })
    @Column({ allowNull: true, type: DataType.FLOAT })
    area?: number;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.STRING })
    variedad: string;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.STRING })
    zona: string;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.STRING })
    renovada: string;

    @Field(() => String, { nullable: true })
    @Column({ allowNull: false, type: DataType.DATEONLY, defaultValue: DataType.NOW })
    createdAt?: string;

    @Field(() => String, { nullable: true })
    @Column({ allowNull: false, type: DataType.DATEONLY, defaultValue: DataType.NOW })
    updatedAt?: string;

    @Field(() => [Corte])
    @HasMany(() => Corte)
    listcortes: Corte[];
}
