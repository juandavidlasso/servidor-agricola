import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@ObjectType()
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'Insumos'
})
export class Insumo extends Model<Insumo> {
    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
    idInsumo: number;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.STRING })
    nombre: string;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.STRING })
    referencia: string;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.STRING })
    marca: string;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.STRING })
    cantidad: string;
}
