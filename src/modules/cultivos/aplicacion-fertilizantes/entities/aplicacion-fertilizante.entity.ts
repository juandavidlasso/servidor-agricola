import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { TratamientoFertilizante } from '../../tratamiento-fertilizantes/entities/tratamiento-fertilizante.entity';
import { AplicacionesFertilizante } from '../../aplicaciones-fertilizantes/entities/aplicaciones-fertilizante.entity';

@ObjectType()
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'aplicacion_fertilizantes'
})
export class AplicacionFertilizante extends Model<AplicacionFertilizante> {
    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
    id_apfe: number;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.DATEONLY })
    fecha: string;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.STRING })
    tipo: string;

    @Field(() => String, { nullable: true })
    @Column({ allowNull: true, type: DataType.STRING })
    suertes?: string;

    @Field(() => [TratamientoFertilizante])
    @HasMany(() => TratamientoFertilizante)
    listTratamientoFertilizante: TratamientoFertilizante[];

    @Field(() => [AplicacionesFertilizante])
    @HasMany(() => AplicacionesFertilizante)
    listAplicacionesFertilizantes: AplicacionesFertilizante[];
}
