import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Mantenimiento } from 'src/modules/mantenimientos/entities/mantenimiento.entity';
import { Maquinaria } from 'src/modules/maquinaria/entities/maquinaria.entity';

@ObjectType()
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'aplicacion_mantenimientos'
})
export class AplicacionMantenimiento extends Model<AplicacionMantenimiento> {
    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
    idApMant: number;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.STRING })
    fecha: string;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.STRING })
    nombre: string;

    @Field(() => Int, { nullable: false })
    @ForeignKey(() => Maquinaria)
    @Column({ allowNull: false, type: DataType.INTEGER })
    maquinariaId: number;

    @HasMany(() => Mantenimiento)
    @Field(() => [Mantenimiento])
    listMantenimientos: Mantenimiento;
}
