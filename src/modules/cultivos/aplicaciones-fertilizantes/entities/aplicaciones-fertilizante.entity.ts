import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Corte } from '../../cortes/entities/corte.entity';
import { AplicacionFertilizante } from '../../aplicacion-fertilizantes/entities/aplicacion-fertilizante.entity';

@ObjectType()
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'aplicaciones_fertilizantes'
})
export class AplicacionesFertilizante extends Model<AplicacionesFertilizante> {
    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
    id_aplicaciones_fertilizantes: number;

    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, type: DataType.INTEGER })
    @ForeignKey(() => Corte)
    corte_id: number;

    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, type: DataType.INTEGER })
    @ForeignKey(() => AplicacionFertilizante)
    apfe_id: number;

    @Field(() => String, { nullable: true })
    @Column({ allowNull: true, type: DataType.STRING })
    suertes?: string;

    @Field(() => AplicacionFertilizante)
    @BelongsTo(() => AplicacionFertilizante)
    aplicacionFertilizante: AplicacionFertilizante;

    @Field(() => Corte)
    @BelongsTo(() => Corte)
    corte: Corte;
}
