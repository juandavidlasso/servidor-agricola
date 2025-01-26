import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { SequelizeModule } from '@nestjs/sequelize';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { config } from 'dotenv';
import { Usuarios } from './modules/usuarios/entities/usuario.entity';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { AuthModule } from './modules/auth/auth.module';
import { SuertesModule } from './modules/cultivos/suertes/suertes.module';
import { CortesModule } from './modules/cultivos/cortes/cortes.module';
import { TablonesModule } from './modules/cultivos/tablones/tablones.module';
import { Suerte } from './modules/cultivos/suertes/entities/suerte.entity';
import { Corte } from './modules/cultivos/cortes/entities/corte.entity';
import { Tablon } from './modules/cultivos/tablones/entities/tablon.entity';
import { LaboresModule } from './modules/cultivos/labores/labores.module';
import { Labores } from './modules/cultivos/labores/entities/labores.entity';
import { AplicacionHerbicidasModule } from './modules/cultivos/aplicacion-herbicidas/aplicacion-herbicidas.module';
import { AplicacionHerbicida } from './modules/cultivos/aplicacion-herbicidas/entities/aplicacion-herbicida.entity';
import { TratamientoHerbicida } from './modules/cultivos/tratamiento-herbicidas/entities/tratamiento-herbicida.entity';
import { TratamientoHerbicidasModule } from './modules/cultivos/tratamiento-herbicidas/tratamiento-herbicidas.module';
import { AplicacionLabores } from './modules/cultivos/aplicacion-labores/entities/aplicacion-labores.entity';
import { AplicacionLaboresModule } from './modules/cultivos/aplicacion-labores/aplicacion-labores.module';
import { AplicacionesHerbicida } from './modules/cultivos/aplicaciones_herbicidas/entities/aplicaciones_herbicida.entity';
import { AplicacionesHerbicidasModule } from './modules/cultivos/aplicaciones_herbicidas/aplicaciones_herbicidas.module';
import { AplicacionFertilizante } from './modules/cultivos/aplicacion-fertilizantes/entities/aplicacion-fertilizante.entity';
import { AplicacionFertilizantesModule } from './modules/cultivos/aplicacion-fertilizantes/aplicacion-fertilizantes.module';
import { TratamientoFertilizante } from './modules/cultivos/tratamiento-fertilizantes/entities/tratamiento-fertilizante.entity';
import { TratamientoFertilizantesModule } from './modules/cultivos/tratamiento-fertilizantes/tratamiento-fertilizantes.module';
import { AplicacionesFertilizante } from './modules/cultivos/aplicaciones-fertilizantes/entities/aplicaciones-fertilizante.entity';
import { AplicacionesFertilizantesModule } from './modules/cultivos/aplicaciones-fertilizantes/aplicaciones-fertilizantes.module';
import { Pluviometro } from './modules/pluviometros/entities/pluviometro.entity';
import { PluviometrosModule } from './modules/pluviometros/pluviometros.module';
import { Lluvia } from './modules/lluvias/entities/lluvia.entity';
import { LluviasModule } from './modules/lluvias/lluvias.module';
import { TratamientoPlagas } from './modules/cultivos/tratamiento-plagas/entities/tratamiento-plagas.entity';
import { TratamientoPlagasModule } from './modules/cultivos/tratamiento-plagas/tratamiento-plagas.module';
import { AplicacionPlagas } from './modules/cultivos/aplicacion-plagas/entities/aplicacion-plagas.entity';
import { AplicacionPlagasModule } from './modules/cultivos/aplicacion-plagas/aplicacion-plagas.module';
import { Riego } from './modules/cultivos/riegos/entities/riego.entity';
import { RiegosModule } from './modules/cultivos/riegos/riegos.module';
import { AplicacionRiego } from './modules/cultivos/aplicacion-riegos/entities/aplicacion-riego.entity';
import { AplicacionRiegosModule } from './modules/cultivos/aplicacion-riegos/aplicacion-riegos.module';
import { Cosecha } from './modules/cultivos/cosechas/entities/cosecha.entity';
import { CosechasModule } from './modules/cultivos/cosechas/cosechas.module';
import { AplicacionLluvia } from './modules/cultivos/aplicacion_lluvias/entities/aplicacion_lluvia.entity';
import { AplicacionLluviasModule } from './modules/cultivos/aplicacion_lluvias/aplicacion_lluvias.module';
import { Maquinaria } from './modules/maquinaria/entities/maquinaria.entity';
import { MaquinariaModule } from './modules/maquinaria/maquinaria.module';
import { Insumo } from './modules/insumos/entities/insumo.entity';
import { InsumosModule } from './modules/insumos/insumos.module';
import { AplicacionMantenimiento } from './modules/aplicacion-mantenimientos/entities/aplicacion-mantenimiento.entity';
import { AplicacionMantenimientosModule } from './modules/aplicacion-mantenimientos/aplicacion-mantenimientos.module';
import { Mantenimiento } from './modules/mantenimientos/entities/mantenimiento.entity';
import { MantenimientosModule } from './modules/mantenimientos/mantenimientos.module';
import { AppController } from './app.controller';
config();

@Module({
    imports: [
        ConfigModule.forRoot(),
        // Configuracion de entorno GraphQL
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            playground: false,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            plugins: [ApolloServerPluginLandingPageLocalDefault()]
        }),

        // Conexion con Sequelize en DEV
        SequelizeModule.forRoot({
            // Prod
            dialect: 'mysql',
            host: process.env.STACKHERO_MARIADB_HOST,
            port: +process.env.STACKHERO_MARIADB_PORT,
            username: process.env.STACKHERO_MARIADB_USERNAME,
            password: process.env.STACKHERO_MARIADB_ROOT_PASSWORD,
            database: process.env.STACKHERO_MARIADB_NAME,
            // Dev
            // host: process.env.DB_HOST_DEV,
            // port: +process.env.DB_PORT_DEV,
            // username: process.env.DB_USERNAME_DEV,
            // password: process.env.DB_PASSWORD_DEV,
            // database: process.env.DB_DATABASE_DEV,
            models: [
                Usuarios,
                Suerte,
                Corte,
                Tablon,
                Labores,
                AplicacionHerbicida,
                TratamientoHerbicida,
                AplicacionLabores,
                AplicacionesHerbicida,
                AplicacionFertilizante,
                TratamientoFertilizante,
                AplicacionesFertilizante,
                Pluviometro,
                Lluvia,
                TratamientoPlagas,
                AplicacionPlagas,
                Riego,
                AplicacionRiego,
                Cosecha,
                AplicacionLluvia,
                Maquinaria,
                Insumo,
                AplicacionMantenimiento,
                Mantenimiento
            ]
        }),

        UsuariosModule,

        AuthModule,

        SuertesModule,

        CortesModule,

        TablonesModule,

        LaboresModule,

        AplicacionHerbicidasModule,

        TratamientoHerbicidasModule,

        AplicacionLaboresModule,

        AplicacionesHerbicidasModule,

        AplicacionFertilizantesModule,

        TratamientoFertilizantesModule,

        AplicacionesFertilizantesModule,

        PluviometrosModule,

        LluviasModule,

        TratamientoPlagasModule,

        AplicacionPlagasModule,

        RiegosModule,

        AplicacionRiegosModule,

        CosechasModule,

        AplicacionLluviasModule,

        MaquinariaModule,

        InsumosModule,

        AplicacionMantenimientosModule,

        MantenimientosModule
    ],
    controllers: [AppController],
    providers: []
})
export class AppModule {}
