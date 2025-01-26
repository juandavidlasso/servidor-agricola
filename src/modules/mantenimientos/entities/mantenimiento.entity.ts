import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { AplicacionMantenimiento } from 'src/modules/aplicacion-mantenimientos/entities/aplicacion-mantenimiento.entity';
import { Insumo } from 'src/modules/insumos/entities/insumo.entity';

@ObjectType()
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'mantenimientos'
})
export class Mantenimiento extends Model<Mantenimiento> {
    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
    idMantenimiento: number;

    @Field(() => String, { nullable: true })
    @Column({ allowNull: true, type: DataType.STRING })
    detalle?: string;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.STRING })
    horaCambio: string;

    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, type: DataType.INTEGER })
    proximoCambio: number;

    @Field(() => Boolean, { nullable: false })
    @Column({ allowNull: false, type: DataType.BOOLEAN })
    tipoCambio: boolean;

    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, type: DataType.INTEGER })
    cantidad: number;

    @Field(() => Int, { nullable: false })
    @ForeignKey(() => Insumo)
    @Column({ allowNull: false, type: DataType.INTEGER })
    insumoId: number;

    @Field(() => Int, { nullable: false })
    @ForeignKey(() => AplicacionMantenimiento)
    @Column({ allowNull: false, type: DataType.INTEGER })
    ApMantId: number;

    @BelongsTo(() => AplicacionMantenimiento)
    aplicacionMantenimientoPadre: AplicacionMantenimiento;
}
