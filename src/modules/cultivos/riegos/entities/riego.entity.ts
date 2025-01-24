import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Corte } from '../../cortes/entities/corte.entity';
import { AplicacionRiego } from '../../aplicacion-riegos/entities/aplicacion-riego.entity';

@ObjectType()
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'Riegos'
})
export class Riego extends Model<Riego> {
    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
    id_riego: number;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.DATEONLY })
    fecha: string;

    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, type: DataType.INTEGER })
    num_riego: number;

    @Field(() => Int, { nullable: false })
    @ForeignKey(() => Corte)
    @Column({ allowNull: false, type: DataType.INTEGER })
    corte_id: number;

    @HasMany(() => AplicacionRiego)
    @Field(() => [AplicacionRiego])
    listAplicacionesRiegos: AplicacionRiego[];
}
