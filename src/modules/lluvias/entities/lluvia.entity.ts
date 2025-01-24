import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { AplicacionLluvia } from 'src/modules/cultivos/aplicacion_lluvias/entities/aplicacion_lluvia.entity';

@ObjectType()
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'Lluvias'
})
export class Lluvia extends Model<Lluvia> {
    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
    id_lluvia: number;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.STRING })
    fecha: string;

    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, type: DataType.INTEGER })
    cantidad: number;

    @Field(() => [AplicacionLluvia])
    @HasMany(() => AplicacionLluvia)
    listAplicacionesLluvias?: AplicacionLluvia[];
}
