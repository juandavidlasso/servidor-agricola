import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { AplicacionPlagas } from '../../aplicacion-plagas/entities/aplicacion-plagas.entity';

@ObjectType()
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'Tratamiento_plagas'
})
export class TratamientoPlagas extends Model<TratamientoPlagas> {
    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
    id_trapl: number;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.STRING })
    producto: string;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.STRING })
    unidad: string;

    @Field(() => Float, { nullable: false })
    @Column({ allowNull: false, type: DataType.FLOAT })
    cantidad: number;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.STRING })
    tiempo: string;

    @HasMany(() => AplicacionPlagas)
    @Field(() => [AplicacionPlagas])
    listAplicacionesPlagas: AplicacionPlagas[];
}
