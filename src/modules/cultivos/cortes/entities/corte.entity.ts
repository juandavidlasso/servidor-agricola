import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Suerte } from '../../suertes/entities/suerte.entity';
import { Tablon } from '../../tablones/entities/tablon.entity';
import { AplicacionLabores } from '../../aplicacion-labores/entities/aplicacion-labores.entity';
import { AplicacionesHerbicida } from '../../aplicaciones_herbicidas/entities/aplicaciones_herbicida.entity';
import { AplicacionesFertilizante } from '../../aplicaciones-fertilizantes/entities/aplicaciones-fertilizante.entity';
import { Cosecha } from '../../cosechas/entities/cosecha.entity';

@ObjectType()
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'cortes'
})
export class Corte extends Model<Corte> {
    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id_corte: number;

    @Field(() => Int, { nullable: false })
    @Column({ allowNull: false, type: DataType.INTEGER })
    numero: number;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.DATEONLY })
    fecha_siembra: string;

    @Field(() => String, { nullable: false })
    @Column({ allowNull: false, type: DataType.DATEONLY })
    fecha_inicio: string;

    @Field(() => String, { nullable: true })
    @Column({ allowNull: true, type: DataType.DATEONLY })
    fecha_corte?: string;

    @Field(() => Boolean, { nullable: true })
    @Column({ allowNull: true, type: DataType.BOOLEAN })
    activo?: boolean;

    @Field(() => Boolean, { nullable: false })
    @Column({ allowNull: false, type: DataType.BOOLEAN })
    estado: boolean;

    @Field(() => Float, { nullable: true })
    @Column({ allowNull: true, type: DataType.FLOAT })
    area?: number;

    @Field(() => Int, { nullable: false })
    @ForeignKey(() => Suerte)
    @Column({ allowNull: false, type: DataType.INTEGER })
    suerte_id: number;

    @Field(() => Suerte)
    @BelongsTo(() => Suerte, {
        foreignKey: 'suerte_id'
    })
    suertePadre: Suerte;

    @Field(() => [Tablon])
    @HasMany(() => Tablon, {
        foreignKey: 'corte_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    listTablones: Tablon[];

    @HasMany(() => AplicacionLabores, {
        foreignKey: 'corte_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    listAplicacionLabores: AplicacionLabores[];

    @HasMany(() => AplicacionesHerbicida, {
        foreignKey: 'corte_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    listAplicacionesHerbicidas: AplicacionesHerbicida[];

    @HasMany(() => AplicacionesFertilizante, {
        foreignKey: 'corte_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    listAplicacionesFertilizantes: AplicacionesFertilizante[];

    @Field(() => Cosecha)
    @HasMany(() => Cosecha, {
        foreignKey: 'corte_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    listCosechas: Cosecha[];
}
