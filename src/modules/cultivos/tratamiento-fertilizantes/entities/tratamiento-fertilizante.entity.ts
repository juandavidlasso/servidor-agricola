import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { AplicacionFertilizante } from '../../aplicacion-fertilizantes/entities/aplicacion-fertilizante.entity';

@ObjectType()
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'tratamiento_fertilizantes'
})
export class TratamientoFertilizante extends Model<TratamientoFertilizante> {
    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
    id_trafe: number;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.STRING })
    producto: string;

    @Field(() => Float, { nullable: false })
    @Column({ allowNull: false, type: DataType.FLOAT })
    dosis: number;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.STRING })
    presentacion: string;

    @Field(() => Float, { nullable: true })
    @Column({ allowNull: true, type: DataType.FLOAT })
    valor?: number;

    @Field(() => String, { nullable: true })
    @Column({ allowNull: true, type: DataType.STRING })
    aplico?: string;

    @Field(() => String, { nullable: true })
    @Column({ allowNull: true, type: DataType.STRING })
    nota?: string;

    @Field(() => Int, { nullable: false })
    @ForeignKey(() => AplicacionFertilizante)
    @Column({ allowNull: false, type: DataType.STRING })
    apfe_id: number;

    @Field(() => AplicacionFertilizante)
    @BelongsTo(() => AplicacionFertilizante)
    aplicacionFPadre: AplicacionFertilizante;
}
