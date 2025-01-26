import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Corte } from '../../cortes/entities/corte.entity';

@ObjectType()
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'cosechas'
})
export class Cosecha extends Model<Cosecha> {
    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id_cosecha: number;

    @Field(() => Float, { nullable: false })
    @Column({ allowNull: false, type: DataType.FLOAT })
    peso: number;

    @Field(() => Float, { nullable: true })
    @Column({ allowNull: true, type: DataType.FLOAT })
    rendimiento?: number;

    @Field(() => Int, { nullable: true })
    @Column({ allowNull: true, type: DataType.INTEGER })
    numeroVagones?: number;

    @Field(() => Int, { nullable: true })
    @Column({ allowNull: true, type: DataType.INTEGER })
    numeroMulas?: number;

    @Field(() => Int, { nullable: false })
    @ForeignKey(() => Corte)
    @Column({ allowNull: false, type: DataType.INTEGER })
    corte_id: number;

    @BelongsTo(() => Corte)
    @Field(() => Corte)
    cortePadre: Corte;
}
