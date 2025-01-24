import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { AplicacionHerbicida } from '../../aplicacion-herbicidas/entities/aplicacion-herbicida.entity';

@ObjectType()
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'Tratamiento_herbicidas'
})
export class TratamientoHerbicida extends Model<TratamientoHerbicida> {
    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
    id_trahe: number;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.STRING })
    producto: string;

    @Field(() => Float, { nullable: false })
    @Column({ allowNull: false, type: DataType.FLOAT })
    dosis: number;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.STRING })
    presentacion: string;

    @Field(() => Float, { nullable: true })
    @Column({ allowNull: true, type: DataType.FLOAT })
    valor?: number;

    @Field(() => String, { nullable: true })
    @Column({ allowNull: true, type: DataType.STRING })
    aplico?: string;

    @Field(() => String, { nullable: true })
    @Column({ allowNull: true, type: DataType.STRING })
    nota?: string;

    @Field(() => Int, { nullable: false })
    @ForeignKey(() => AplicacionHerbicida)
    @Column({ allowNull: false, type: DataType.STRING })
    aphe_id: number;

    @Field(() => AplicacionHerbicida)
    @BelongsTo(() => AplicacionHerbicida)
    aplicacionHPadre: AplicacionHerbicida;
}
