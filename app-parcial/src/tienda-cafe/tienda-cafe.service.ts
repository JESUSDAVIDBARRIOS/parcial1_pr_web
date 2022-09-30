import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm'; 
import { TiendaEntity } from '../tienda/tienda.entity';
import { CafeEntity } from '../cafe/cafe.entity';

@Injectable()
export class TiendaCafeService {
    constructor(
        @InjectRepository(TiendaEntity)
        private readonly tiendaRepository: Repository<TiendaEntity>,
        @InjectRepository(CafeEntity)
        private readonly cafeRepository: Repository<CafeEntity>
    ) {}

    async addCafeToTienda(tiendaId: number, cafeId: number): Promise<TiendaEntity> {
        const tienda = await this.tiendaRepository.findOne({where: {id: tiendaId}, relations: ['cafes']});
        if (!tienda) throw new BusinessLogicException("La tienda no existe", BusinessError.NOT_FOUND);
        const cafe = await this.cafeRepository.findOne({where: {id: cafeId}});
        if (!cafe) throw new BusinessLogicException("El café no existe", BusinessError.NOT_FOUND);
        tienda.cafes = [...tienda.cafes, cafe];
        return await this.tiendaRepository.save(tienda);
    }
}
