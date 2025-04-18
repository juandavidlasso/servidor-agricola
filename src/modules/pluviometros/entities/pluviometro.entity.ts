import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { AplicacionLluvia } from 'src/modules/cultivos/aplicacion_lluvias/entities/aplicacion_lluvia.entity';

@ObjectType()
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'pluviometros'
})
export class Pluviometro extends Model<Pluviometro> {
    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
    id_pluviometro: number;

    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, type: DataType.INTEGER })
    nombre: number;

    @Field(() => String, { nullable: true })
    @Column({ allowNull: true, type: DataType.STRING })
    suertesAsociadas?: string;

    @Field(() => Float, { nullable: true })
    @Column({ allowNull: true, type: DataType.FLOAT })
    totalMes?: number;

    @Field(() => [AplicacionLluvia])
    @HasMany(() => AplicacionLluvia)
    listAplicacionesLluvias?: AplicacionLluvia[];
}
