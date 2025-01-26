import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Corte } from '../../cortes/entities/corte.entity';
import { AplicacionHerbicida } from '../../aplicacion-herbicidas/entities/aplicacion-herbicida.entity';

@ObjectType()
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'aplicaciones_herbicidas'
})
export class AplicacionesHerbicida extends Model<AplicacionesHerbicida> {
    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
    id_aplicaciones_herbicidas: number;

    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, type: DataType.INTEGER })
    @ForeignKey(() => Corte)
    corte_id: number;

    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, type: DataType.INTEGER })
    @ForeignKey(() => AplicacionHerbicida)
    aphe_id: number;

    @Field(() => AplicacionHerbicida)
    @BelongsTo(() => AplicacionHerbicida)
    aplicacionHerbicida: AplicacionHerbicida;

    @Field(() => Corte)
    @BelongsTo(() => Corte)
    corte: Corte;
}
