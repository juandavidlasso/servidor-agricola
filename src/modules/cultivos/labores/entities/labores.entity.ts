import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { AplicacionLabores } from '../../aplicacion-labores/entities/aplicacion-labores.entity';

@ObjectType()
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'labores'
})
export class Labores extends Model<Labores> {
    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
    id_labor: number;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.DATE })
    fecha: string;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.STRING })
    actividad: string;

    @Field(() => String, { nullable: true })
    @Column({ allowNull: true, type: DataType.STRING })
    equipo?: string;

    @Field(() => String, { nullable: true })
    @Column({ allowNull: true, type: DataType.STRING })
    estado?: string;

    @Field(() => Number, { nullable: true })
    @Column({ allowNull: true, type: DataType.INTEGER })
    pases?: number;

    @Field(() => String, { nullable: true })
    @Column({ allowNull: true, type: DataType.STRING })
    aplico?: string;

    @Field(() => Number, { nullable: true })
    @Column({ allowNull: true, type: DataType.FLOAT })
    costo?: number;

    @Field(() => String, { nullable: true })
    @Column({ allowNull: true, type: DataType.STRING })
    nota?: string;

    @Field(() => String, { nullable: true })
    @Column({ allowNull: true, type: DataType.STRING })
    suertes?: string;

    @HasMany(() => AplicacionLabores)
    listAplicacionLabores: AplicacionLabores[];
}
