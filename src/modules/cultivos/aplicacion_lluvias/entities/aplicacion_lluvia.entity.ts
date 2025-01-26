import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Lluvia } from 'src/modules/lluvias/entities/lluvia.entity';
import { Pluviometro } from 'src/modules/pluviometros/entities/pluviometro.entity';

@ObjectType()
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'aplicacion_lluvias'
})
export class AplicacionLluvia extends Model<AplicacionLluvia> {
    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
    id_aplicacion_lluvia: number;

    @Field(() => Int, { nullable: false })
    @ForeignKey(() => Pluviometro)
    @Column({ allowNull: false, type: DataType.INTEGER })
    pluviometro_id: number;

    @Field(() => Int, { nullable: false })
    @ForeignKey(() => Lluvia)
    @Column({ allowNull: false, type: DataType.INTEGER })
    lluvia_id: number;

    @Field(() => Pluviometro)
    @BelongsTo(() => Pluviometro)
    pluviometroPadre: Pluviometro;

    @Field(() => Lluvia)
    @BelongsTo(() => Lluvia)
    lluviaPadre?: Lluvia;

    @Field(() => String, { nullable: true })
    fecha?: string;

    @Field(() => Int, { nullable: true })
    cantidad?: number;
}
