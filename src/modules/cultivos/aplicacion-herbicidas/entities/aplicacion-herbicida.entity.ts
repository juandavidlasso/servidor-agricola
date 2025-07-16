import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { TratamientoHerbicida } from '../../tratamiento-herbicidas/entities/tratamiento-herbicida.entity';
import { AplicacionesHerbicida } from '../../aplicaciones_herbicidas/entities/aplicaciones_herbicida.entity';

@ObjectType()
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'aplicacion_herbicidas'
})
export class AplicacionHerbicida extends Model<AplicacionHerbicida> {
    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
    id_aphe: number;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.DATEONLY })
    fecha: string;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.STRING })
    tipo: string;

    @Field(() => String, { nullable: true })
    @Column({ allowNull: true, type: DataType.STRING })
    suertes?: string;

    @Field(() => [TratamientoHerbicida])
    @HasMany(() => TratamientoHerbicida)
    listTratamientoHerbicida: TratamientoHerbicida[];

    @Field(() => [AplicacionesHerbicida])
    @HasMany(() => AplicacionesHerbicida)
    listAplicacionesHerbicidas: AplicacionesHerbicida[];
}
