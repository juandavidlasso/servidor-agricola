import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@ObjectType()
@Table({
    timestamps: false,
    tableName: 'Usuarios'
})
export class Usuarios extends Model<Usuarios> {
    @Column({ allowNull: false, primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    @Field(() => Int, { nullable: false })
    id_usuario: number;

    @Column({ allowNull: false, type: DataType.STRING })
    @Field(() => String, { nullable: false })
    nombre: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @Field(() => String, { nullable: false })
    apellido: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @Field(() => String, { nullable: false })
    email: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @Field(() => String, { nullable: false })
    password: string;

    @Column({ allowNull: false, type: DataType.INTEGER })
    @Field(() => Int, { nullable: false })
    rol: number;

    @Column({ allowNull: true, type: DataType.STRING })
    @Field(() => String, { nullable: true })
    codigo?: string;
}
