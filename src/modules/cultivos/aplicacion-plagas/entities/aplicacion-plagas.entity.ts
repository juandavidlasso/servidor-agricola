import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Corte } from '../../cortes/entities/corte.entity';
import { Tablon } from '../../tablones/entities/tablon.entity';
import { TratamientoPlagas } from '../../tratamiento-plagas/entities/tratamiento-plagas.entity';

@ObjectType()
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'aplicacion_plagas'
})
export class AplicacionPlagas extends Model<AplicacionPlagas> {
    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
    id_apla: number;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.DATEONLY })
    fecha: string;

    @Field(() => Int, { nullable: false })
    @ForeignKey(() => Corte)
    @Column({ allowNull: false, type: DataType.INTEGER })
    corte_id: number;

    @Field(() => Int, { nullable: false })
    @ForeignKey(() => Tablon)
    @Column({ allowNull: false, type: DataType.INTEGER })
    tablon_id: number;

    @Field(() => Int, { nullable: false })
    @ForeignKey(() => TratamientoPlagas)
    @Column({ allowNull: false, type: DataType.INTEGER })
    trapl_id: number;

    @BelongsTo(() => Tablon)
    @Field(() => Tablon)
    tablon: Tablon;

    @BelongsTo(() => TratamientoPlagas)
    @Field(() => TratamientoPlagas)
    tratamientoPlagaPadre: TratamientoPlagas;
}
