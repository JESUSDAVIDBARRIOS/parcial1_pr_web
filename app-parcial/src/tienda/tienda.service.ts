import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { TiendaEntity } from './tienda.entity';

@Injectable()
export class TiendaService {
    constructor(
        @InjectRepository(TiendaEntity)
        private readonly _tiendaRepository: Repository<TiendaEntity>,
    ) {}

    async createTienda(tienda: TiendaEntity): Promise<TiendaEntity> {
        if(tienda.telefono.length !== 10) 
            throw new BusinessLogicException("El número de teléfono no es válido", BusinessError.PRECONDITION_FAILED); 
        return await this._tiendaRepository.save(tienda);
    }
}
