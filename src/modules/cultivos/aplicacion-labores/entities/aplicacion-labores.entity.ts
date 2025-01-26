import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Labores } from '../../labores/entities/labores.entity';
import { Corte } from '../../cortes/entities/corte.entity';

@ObjectType()
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'aplicacion_labores'
})
export class AplicacionLabores extends Model<AplicacionLabores> {
    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
    id_aplicacion_labores: number;

    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, type: DataType.INTEGER })
    @ForeignKey(() => Corte)
    corte_id: number;

    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, type: DataType.INTEGER })
    @ForeignKey(() => Labores)
    labor_id: number;

    @Field(() => Labores)
    @BelongsTo(() => Labores)
    labor: Labores;

    @Field(() => Corte)
    @BelongsTo(() => Corte)
    corte: Corte;
}
