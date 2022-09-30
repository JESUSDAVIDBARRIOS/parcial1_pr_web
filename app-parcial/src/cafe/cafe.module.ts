import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiendaEntity } from '../tienda/tienda.entity';
import { CafeEntity } from './cafe.entity';
import { CafeService } from './cafe.service';
import { CafeController } from './cafe.controller';

@Module({providers: [CafeService],
    imports: [TypeOrmModule.forFeature([CafeEntity, TiendaEntity])],
    controllers: [CafeController]
})
export class CafeModule {}
