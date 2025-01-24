import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Corte } from '../../cortes/entities/corte.entity';
import { AplicacionPlagas } from '../../aplicacion-plagas/entities/aplicacion-plagas.entity';

@ObjectType()
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'Tablones'
})
export class Tablon extends Model<Tablon> {
    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
    id_tablon: number;

    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, type: DataType.INTEGER })
    numero: number;

    @Field(() => Number, { nullable: false })
    @Column({ allowNull: false, type: DataType.FLOAT })
    area: number;

    @Field(() => Boolean, { nullable: false })
    @Column({ allowNull: false, type: DataType.BOOLEAN })
    estado: boolean;

    @Field(() => Int, { nullable: false })
    @ForeignKey(() => Corte)
    @Column({ allowNull: false, type: DataType.INTEGER })
    corte_id: number;

    @BelongsTo(() => Corte)
    cortePapa: Corte;

    @HasMany(() => AplicacionPlagas)
    @Field(() => [AplicacionPlagas])
    listAplicacionesPlagas: AplicacionPlagas[];
}
