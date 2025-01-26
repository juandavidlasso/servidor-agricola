import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTabloneInput } from './dto/create-tablon.input';
import { UpdateTablonInput } from './dto/update-tablon.input';
import { Tablon } from './entities/tablon.entity';
import { Corte } from '../cortes/entities/corte.entity';
import { Suerte } from '../suertes/entities/suerte.entity';
import { AplicacionPlagas } from '../aplicacion-plagas/entities/aplicacion-plagas.entity';
import { TratamientoPlagas } from '../tratamiento-plagas/entities/tratamiento-plagas.entity';

@Injectable()
export class TablonesService {
    constructor(
        @InjectModel(Tablon)
        private readonly tablonRepository: typeof Tablon
    ) {}

    async agregarTablonService(createTabloneInput: CreateTabloneInput[]): Promise<number[]> {
        try {
            const tablonesRegistrados: number[] = [];
            for (let index = 0; index < createTabloneInput.length; index++) {
                const tablon = await this.tablonRepository.findOne({
                    where: { numero: createTabloneInput[index].numero, corte_id: createTabloneInput[index].corte_id }
                });

                if (!tablon) {
                    await this.tablonRepository.create(createTabloneInput[index]);
                    tablonesRegistrados.push(createTabloneInput[index].corte_id);
                }
            }
            return tablonesRegistrados;
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerTablonesPorCorteService(id_corte: number): Promise<Tablon[]> {
        try {
            return await this.tablonRepository.findAll({ where: { corte_id: id_corte }, order: [['numero', 'ASC']] });
        } catch (error) {
            throw new Error(error);
        }
    }

    async actualizarTablonService(id: number, updateTablonInput: UpdateTablonInput): Promise<Tablon> {
        try {
            const tablon = await this.tablonRepository.findOne({ where: { id_tablon: id } });

            if (!tablon) throw new Error('El tablón no esta registrado.');

            return await tablon.update(updateTablonInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async eliminarTablonService(id: number): Promise<boolean> {
        let successOperation: boolean = false;
        try {
            return await this.tablonRepository.destroy({ where: { id_tablon: id } }).then((rows) => {
                if (rows === 1) {
                    successOperation = true;
                }
                return successOperation;
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async countTablonesPorSuerteService(id_suerte: number): Promise<number> {
        try {
            return await this.tablonRepository.count({
                include: [
                    {
                        model: Corte,
                        as: 'cortePapa',
                        required: true,
                        where: {
                            activo: true
                        },
                        attributes: [],
                        include: [
                            {
                                model: Suerte,
                                as: 'suertePadre',
                                required: true,
                                where: {
                                    id_suerte
                                },
                                attributes: []
                            }
                        ]
                    }
                ]
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerTablonesYAplicacionesPlagasService(id_corte: number): Promise<Tablon[]> {
        try {
            return await this.tablonRepository.findAll({
                where: { corte_id: id_corte },
                include: [
                    {
                        model: AplicacionPlagas,
                        required: false,
                        include: [
                            {
                                model: TratamientoPlagas,
                                required: true
                            }
                        ]
                    }
                ]
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async obtenerTotalHectareasSuertesService(): Promise<Tablon> {
        try {
            return await this.tablonRepository.findOne({
                attributes: [
                    [
                        this.tablonRepository.sequelize.literal(
                            `(SELECT SUM(tablones.area) as area FROM tablones INNER JOIN cortes ON corte_id = id_corte AND activo = true)`
                        ),
                        'area'
                    ]
                ],
                include: [
                    {
                        model: Corte,
                        required: true,
                        attributes: [],
                        where: {
                            activo: true
                        }
                    }
                ]
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}
