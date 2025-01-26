import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Riego } from '../../riegos/entities/riego.entity';
import { Tablon } from '../../tablones/entities/tablon.entity';

@ObjectType()
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'aplicacion_riegos'
})
export class AplicacionRiego extends Model<AplicacionRiego> {
    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
    id_apriego: number;

    @Field(() => Int, { nullable: false })
    @ForeignKey(() => Riego)
    @Column({ allowNull: false, type: DataType.INTEGER })
    riego_id: number;

    @Field(() => Int, { nullable: false })
    @ForeignKey(() => Tablon)
    @Column({ allowNull: false, type: DataType.INTEGER })
    tablon_id: number;

    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, type: DataType.INTEGER })
    num_tablon: number;

    @BelongsTo(() => Riego)
    @Field(() => Riego)
    riegoPadre: Riego;
}
