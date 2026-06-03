import { InjectModel } from '@nestjs/sequelize';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSuerteInput, ProntuarioInput } from './dto/create-suerte.input';
import { UpdateSuerteInput } from './dto/update-suerte.input';
import { Suerte } from './entities/suerte.entity';
import { Op, QueryTypes } from 'sequelize';
import { Tablon } from '../tablones/entities/tablon.entity';
import { Corte } from '../cortes/entities/corte.entity';
import sequelize from 'sequelize';
import { CortesService } from '../cortes/cortes.service';
import { Cosecha } from '../cosechas/entities/cosecha.entity';

@Injectable()
export class SuertesService {
    constructor(
        @InjectModel(Suerte)
        private readonly suerteRepository: typeof Suerte,
        private readonly corteRepository: CortesService,
        @InjectModel(Cosecha)
        private readonly cosechaRepository: typeof Cosecha
    ) {}

    async agregarSuerteService(createSuerteInput: CreateSuerteInput): Promise<Suerte> {
        try {
            const suerte = await this.suerteRepository.findOne({ where: { nombre: createSuerteInput.nombre } });

            if (suerte) throw new Error('La suerte ya esta registrada.');

            return await this.suerteRepository.create(createSuerteInput);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async agregarSuerteRenovadaService(createSuerteInput: CreateSuerteInput): Promise<Suerte> {
        try {
            return await this.suerteRepository
                .count({
                    where: {
                        nombre: createSuerteInput.nombre
                    }
                })
                .then(async (count) => {
                    if (count != 0) {
                        return await this.suerteRepository
                            .findAll({
                                where: {
                                    createdAt: [
                                        this.suerteRepository.sequelize.literal(`(
								SELECT MAX(createdAt)
								FROM suertes AS suerte
								WHERE
								suerte.nombre = '${createSuerteInput.nombre}'
								)`),
                                        'MaxCreatedAt'
                                    ],
                                    nombre: createSuerteInput.nombre
                                },
                                attributes: ['id_suerte']
                            })
                            .then(async (suertecita) => {
                                return await this.suerteRepository
                                    .update(
                                        {
                                            renovada: 'NO'
                                        },
                                        {
                                            where: {
                                                id_suerte: suertecita[suertecita.length - 1].id_suerte,
                                                renovada: 'SI'
                                            }
                                        }
                                    )
                                    .then(async () => {
                                        createSuerteInput.renovada = 'SI';
                                        return await this.suerteRepository
                                            .create({
                                                ...createSuerteInput
                                            })
                                            .then(async (newSuerte) => {
                                                return newSuerte;
                                            });
                                    });
                            });
                    } else {
                        createSuerteInput.renovada = 'SI';
                        return await this.suerteRepository
                            .create({
                                ...createSuerteInput
                            })
                            .then(async (newSuerte) => {
                                return newSuerte;
                            });
                    }
                });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async obtenerSuertesRenovadasService(): Promise<Suerte[]> {
        try {
            return await this.suerteRepository.sequelize.query(
                `select id_suerte, nombre, area, variedad, zona, renovada, createdAt, updatedAt from suertes where renovada='SI' order by nombre + 0, nombre`,
                { type: QueryTypes.SELECT }
            );
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async obtenerSuerteService(id_suerte: number): Promise<Suerte> {
        try {
            const suerte = await this.suerteRepository.findOne({ where: { id_suerte } });

            if (!suerte) throw new Error('La suerte no esta registrada.');

            return suerte;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async actualizarSuerteService(id: number, updateSuerteInput: UpdateSuerteInput): Promise<Suerte> {
        try {
            const suerte = await this.suerteRepository.findOne({ where: { id_suerte: id } });

            if (!suerte) throw new Error('La suerte no existe.');

            return await suerte.update(updateSuerteInput);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async eliminarSuerteService(id_suerte: number): Promise<boolean> {
        let successOperation: boolean = false;
        try {
            return await this.suerteRepository
                .destroy({
                    where: {
                        id_suerte
                    }
                })
                .then((rows) => {
                    if (rows === 1) {
                        successOperation = true;
                    } else {
                        successOperation = false;
                    }
                    return successOperation;
                });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async obtenerAreaSuerteService(id_suerte: number): Promise<number> {
        try {
            const suerte = await this.suerteRepository.findOne({ where: { id_suerte } });

            if (!suerte) throw new Error('La suerte no esta registrada.');

            const corteActivo = await this.corteRepository.obtenerCorteActualService(id_suerte);

            if (!corteActivo) throw new Error('No hay cortes registrados.');

            const [result]: any = await this.suerteRepository.sequelize.query(
                `
            	SELECT SUM(tablones.area) AS totalArea
            	FROM tablones
            	INNER JOIN cortes AS cortePapa ON cortePapa.id_corte = tablones.corte_id
            	INNER JOIN suertes AS suertePadre ON suertePadre.id_suerte = cortePapa.suerte_id
            	WHERE suertePadre.id_suerte = :id_suerte
            	AND cortePapa.activo = true
            	`,
                {
                    replacements: { id_suerte },
                    type: sequelize.QueryTypes.SELECT
                }
            );
            if (result.totalArea === null) {
                return 0;
            } else if (Number.isInteger(result.totalArea)) {
                return result.totalArea.toString();
            } else {
                return result.totalArea.toFixed(2);
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async obtenerSuertesRenovadasYCortesService(): Promise<Suerte[]> {
        try {
            return await this.suerteRepository.findAll({
                order: [[this.suerteRepository.sequelize.literal('nombre + 0, nombre'), 'ASC']],
                where: {
                    renovada: 'SI'
                },
                include: [
                    {
                        model: Corte,
                        required: true,
                        where: {
                            estado: true
                        }
                    }
                ]
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async obtenerSuertesRenovadasCortesTablonesService(): Promise<Suerte[]> {
        try {
            return await this.suerteRepository.findAll({
                order: [[this.suerteRepository.sequelize.literal('nombre + 0, nombre'), 'ASC']],
                where: {
                    renovada: 'SI'
                },
                attributes: ['id_suerte', 'nombre'],
                include: [
                    {
                        model: Corte,
                        required: true,
                        attributes: ['id_corte', 'numero', 'suerte_id'],
                        where: { activo: true },
                        include: [
                            {
                                model: Tablon,
                                required: true,
                                attributes: ['id_tablon', 'numero', 'area', 'corte_id']
                            }
                        ]
                    }
                ]
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async consultarProntuarioService(prontuarioInput: ProntuarioInput): Promise<Cosecha[]> {
        try {
            const nombres =
                prontuarioInput.nombre?.trim() !== '' ? prontuarioInput.nombre.split(',').map((nombre) => nombre.trim()) : null;

            return await this.cosechaRepository.findAll({
                order: [
                    this.cosechaRepository.sequelize.literal(`
                    CASE
                        WHEN \`cortePadre->suertePadre\`.\`nombre\` REGEXP '^[0-9]+$'
                        THEN 1
                        ELSE 0
                    END
                `),
                    this.cosechaRepository.sequelize.literal(`
                    CASE
                        WHEN \`cortePadre->suertePadre\`.\`nombre\` REGEXP '^[0-9]+$'
                        THEN CAST(\`cortePadre->suertePadre\`.\`nombre\` AS UNSIGNED)
                    END
                `),
                    [{ model: Corte, as: 'cortePadre' }, { model: Suerte, as: 'suertePadre' }, 'nombre', 'ASC']
                ],
                include: [
                    {
                        model: Corte,
                        as: 'cortePadre',
                        required: true,
                        attributes: {
                            include: [
                                [
                                    this.cosechaRepository.sequelize.literal(`
                                    (
                                        SELECT COALESCE(SUM(t.area), 0)
                                        FROM tablones t
                                        WHERE t.corte_id = cortePadre.id_corte
                                    )
                                `),
                                    'area'
                                ]
                            ]
                        },
                        where: {
                            fecha_corte: {
                                [Op.between]: [prontuarioInput.fecha_inicio, prontuarioInput.fecha_fin]
                            }
                        },
                        include: [
                            {
                                model: Suerte,
                                as: 'suertePadre',
                                required: true,
                                ...(nombres && {
                                    where: {
                                        nombre: {
                                            [Op.in]: nombres
                                        }
                                    }
                                })
                            }
                        ]
                    }
                ]
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    // Datos actuales con sumatoria de cosechas
    async obtenerDatosActualesService(nombres: string): Promise<Suerte[]> {
        try {
            const whereCondition: any = {
                renovada: 'SI'
            };

            if (nombres) {
                whereCondition.nombre = {
                    [Op.in]: nombres.split(',').map((n) => n.trim())
                };
            }

            return await this.suerteRepository.findAll({
                where: whereCondition,
                order: [this.suerteRepository.sequelize.literal('nombre + 0, nombre')],
                attributes: [
                    'id_suerte',
                    'nombre',
                    'variedad',
                    'zona',
                    [
                        this.suerteRepository.sequelize.literal(
                            `(SELECT MAX(fecha_corte) FROM cortes WHERE suerte_id = Suerte.id_suerte)`
                        ),
                        'createdAt'
                    ],
                    [
                        this.suerteRepository.sequelize.literal(
                            `(SELECT COALESCE(SUM(co.peso),0) FROM cosechas co INNER JOIN cortes c ON co.corte_id = c.id_corte WHERE c.suerte_id = Suerte.id_suerte AND c.fecha_corte = (SELECT MAX(fecha_corte) FROM cortes WHERE suerte_id = Suerte.id_suerte))`
                        ),
                        'area'
                    ],
                    [
                        this.suerteRepository.sequelize.literal(
                            `(SELECT COALESCE(SUM(t.area),0) FROM tablones t INNER JOIN cortes c ON t.corte_id = c.id_corte WHERE c.suerte_id = Suerte.id_suerte AND c.fecha_corte = (SELECT MAX(fecha_corte) FROM cortes WHERE suerte_id = Suerte.id_suerte))`
                        ),
                        'renovada'
                    ]
                ],

                include: [
                    {
                        model: Corte,
                        as: 'listcortes',
                        required: true,
                        where: {
                            activo: true
                        },
                        attributes: ['id_corte', 'numero', 'fecha_inicio'],
                        include: [
                            {
                                model: Tablon,
                                as: 'listTablones',
                                required: false
                            }
                        ]
                    }
                ]
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    // Datos actuales con filas individuales por cada cosecha
    // async obtenerDatosActualesService(nombres: string): Promise<Cosecha[]> {
    //     try {
    //         const whereSuerte: any = {
    //             renovada: 'SI'
    //         };

    //         if (nombres) {
    //             whereSuerte.nombre = {
    //                 [Op.in]: nombres.split(',').map((n) => n.trim())
    //             };
    //         }

    //         return await this.cosechaRepository.findAll({
    //             attributes: ['id_cosecha', 'peso', 'rendimiento', 'numeroVagones', 'numeroMulas'],
    //             include: [
    //                 {
    //                     model: Corte,
    //                     as: 'cortePadre',
    //                     required: true,
    //                     where: {
    //                         activo: true
    //                     },
    //                     include: [
    //                         {
    //                             model: Suerte,
    //                             as: 'suertePadre',
    //                             required: true,
    //                             where: whereSuerte
    //                         },
    //                         {
    //                             model: Tablon,
    //                             as: 'listTablones',
    //                             required: false
    //                         }
    //                     ]
    //                 }
    //             ],
    //             order: [[{ model: Corte, as: 'cortePadre' }, { model: Suerte, as: 'suertePadre' }, 'nombre', 'ASC']]
    //         });
    //     } catch (error) {
    //         throw new InternalServerErrorException(error);
    //     }
    // }

    // Consultas anteriores para una sola cosecha por corte
    // async consultarProntuarioService(prontuarioInput: ProntuarioInput): Promise<Cosecha[]> {
    //     try {
    //         if (prontuarioInput.nombre.trim() !== '') {
    //             return await this.suerteRepository
    //                 .count({
    //                     where: {
    //                         nombre: {
    //                             [Op.in]: prontuarioInput.nombre.split(',')
    //                         }
    //                     }
    //                 })
    //                 .then(async (count) => {
    //                     if (count != 0) {
    //                         return await this.suerteRepository.sequelize
    //                             .query(
    //                                 'select count(*) as conteo from `cosechas` c INNER JOIN `cortes` o ON o.id_corte=c.corte_id INNER JOIN `suertes` s ON s.id_suerte=o.suerte_id where s.nombre IN(:nombr) and o.fecha_corte BETWEEN :inicia AND :fina',
    //                                 {
    //                                     replacements: {
    //                                         nombr: prontuarioInput.nombre.split(','),
    //                                         inicia: prontuarioInput.fecha_inicio,
    //                                         fina: prontuarioInput.fecha_fin
    //                                     },
    //                                     type: QueryTypes.SELECT
    //                                 }
    //                             )
    //                             .then(async (cuente: any) => {
    //                                 if (cuente[0].conteo != 0) {
    //                                     return await this.cosechaRepository.findAll({
    //                                         order: [
    //                                             [
    //                                                 { model: Corte, as: 'cortePadre' },
    //                                                 { model: Suerte, as: 'suertePadre' },
    //                                                 this.suerteRepository.sequelize.literal('nombre + 0, nombre')
    //                                             ]
    //                                         ],
    //                                         include: [
    //                                             {
    //                                                 model: Corte,
    //                                                 required: true,
    //                                                 // raw: true,
    //                                                 attributes: {
    //                                                     include: [
    //                                                         [
    //                                                             this.suerteRepository.sequelize.literal(
    //                                                                 `(SELECT SUM(area) FROM tablones WHERE corte_id=id_corte)`
    //                                                             ),
    //                                                             'area'
    //                                                         ]
    //                                                     ]
    //                                                 },
    //                                                 where: {
    //                                                     fecha_corte: {
    //                                                         [Op.between]: [
    //                                                             prontuarioInput.fecha_inicio,
    //                                                             prontuarioInput.fecha_fin
    //                                                         ]
    //                                                     }
    //                                                 },
    //                                                 include: [
    //                                                     {
    //                                                         model: Suerte,
    //                                                         required: true,
    //                                                         where: {
    //                                                             nombre: {
    //                                                                 [Op.in]: prontuarioInput.nombre.split(',')
    //                                                             }
    //                                                         }
    //                                                     }
    //                                                 ]
    //                                             }
    //                                         ]
    //                                     });
    //                                 }
    //                             });
    //                     }
    //                 });
    //         } else {
    //             return await this.cosechaRepository.findAll({
    //                 order: [
    //                     [
    //                         { model: Corte, as: 'cortePadre' },
    //                         { model: Suerte, as: 'suertePadre' },
    //                         this.suerteRepository.sequelize.literal('nombre + 0, nombre')
    //                     ]
    //                 ],
    //                 include: [
    //                     {
    //                         model: Corte,
    //                         required: true,
    //                         //   raw: true,
    //                         attributes: {
    //                             include: [
    //                                 [
    //                                     this.suerteRepository.sequelize.literal(
    //                                         `(SELECT SUM(area) FROM tablones WHERE corte_id=id_corte)`
    //                                     ),
    //                                     'area'
    //                                 ]
    //                             ]
    //                         },
    //                         where: {
    //                             fecha_corte: {
    //                                 [Op.between]: [prontuarioInput.fecha_inicio, prontuarioInput.fecha_fin]
    //                             }
    //                         },
    //                         include: [
    //                             {
    //                                 model: Suerte,
    //                                 required: true
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             });
    //         }
    //     } catch (error) {
    //         throw new InternalServerErrorException(error);
    //     }
    // }

    // async obtenerDatosActualesService(nombres: string): Promise<Suerte[]> {
    //     try {
    //         if (!nombres) {
    //             return await this.suerteRepository.findAll({
    //                 where: {
    //                     renovada: 'SI'
    //                 },
    //                 order: [this.suerteRepository.sequelize.literal('nombre + 0, nombre')],
    //                 attributes: [
    //                     'id_suerte',
    //                     'nombre',
    //                     'variedad',
    //                     'zona',
    //                     [
    //                         this.suerteRepository.sequelize.literal(
    //                             '(SELECT MAX(fecha_corte) from cortes where suerte_id = Suerte.id_suerte)'
    //                         ),
    //                         'createdAt'
    //                     ],
    //                     [
    //                         this.suerteRepository.sequelize.literal(
    //                             '(SELECT peso FROM cosechas INNER JOIN cortes ON cosechas.corte_id = cortes.id_corte WHERE cortes.suerte_id = Suerte.id_suerte AND cortes.fecha_corte = (SELECT MAX(fecha_corte) FROM cortes WHERE suerte_id = Suerte.id_suerte) LIMIT 1)'
    //                         ),
    //                         'area'
    //                     ],
    //                     [
    //                         this.suerteRepository.sequelize.literal(
    //                             '(SELECT COALESCE(SUM(tablones.area), 0) FROM tablones INNER JOIN cortes ON tablones.corte_id = cortes.id_corte WHERE cortes.suerte_id = Suerte.id_suerte AND cortes.fecha_corte = (SELECT MAX(fecha_corte) FROM cortes WHERE suerte_id = Suerte.id_suerte))'
    //                         ),
    //                         'renovada'
    //                     ]
    //                 ],
    //                 include: [
    //                     {
    //                         model: Corte,
    //                         required: true,
    //                         where: {
    //                             activo: true
    //                         },
    //                         attributes: ['id_corte', 'numero', 'fecha_inicio'],
    //                         include: [
    //                             {
    //                                 model: Tablon,
    //                                 required: false
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             });
    //         } else {
    //             return await this.suerteRepository.findAll({
    //                 where: {
    //                     renovada: 'SI',
    //                     nombre: {
    //                         [Op.in]: nombres.split(',')
    //                     }
    //                 },
    //                 order: [this.suerteRepository.sequelize.literal('nombre + 0, nombre')],
    //                 attributes: [
    //                     'id_suerte',
    //                     'nombre',
    //                     'variedad',
    //                     'zona',
    //                     [
    //                         this.suerteRepository.sequelize.literal(
    //                             '(SELECT MAX(fecha_corte) from cortes where suerte_id = Suerte.id_suerte)'
    //                         ),
    //                         'createdAt'
    //                     ],
    //                     [
    //                         this.suerteRepository.sequelize.literal(
    //                             '(SELECT peso FROM cosechas INNER JOIN cortes ON cosechas.corte_id = cortes.id_corte WHERE cortes.suerte_id = Suerte.id_suerte AND cortes.fecha_corte = (SELECT MAX(fecha_corte) FROM cortes WHERE suerte_id = Suerte.id_suerte))'
    //                         ),
    //                         'area'
    //                     ],
    //                     [
    //                         this.suerteRepository.sequelize.literal(
    //                             '(SELECT COALESCE(SUM(tablones.area), 0) FROM tablones INNER JOIN cortes ON tablones.corte_id = cortes.id_corte WHERE cortes.suerte_id = Suerte.id_suerte AND cortes.fecha_corte = (SELECT MAX(fecha_corte) FROM cortes WHERE suerte_id = Suerte.id_suerte))'
    //                         ),
    //                         'renovada'
    //                     ]
    //                 ],
    //                 include: [
    //                     {
    //                         model: Corte,
    //                         required: true,
    //                         where: {
    //                             activo: true
    //                         },
    //                         attributes: ['id_corte', 'numero', 'fecha_inicio'],
    //                         include: [
    //                             {
    //                                 model: Tablon,
    //                                 required: false
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             });
    //         }
    //     } catch (error) {
    //         throw new InternalServerErrorException(error);
    //     }
    // }
}
