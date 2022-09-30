import { Test, TestingModule } from '@nestjs/testing';
import { TiendaCafeService } from './tienda-cafe.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { CafeEntity } from '../cafe/cafe.entity';
import { TiendaEntity } from '../tienda/tienda.entity';

describe('TiendaCafeService', () => {
  let service: TiendaCafeService;
  let cafeRepository: Repository<CafeEntity>;
  let tiendaRepository: Repository<TiendaEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TiendaCafeService],
    }).compile();

    service = module.get<TiendaCafeService>(TiendaCafeService);
    tiendaRepository = module.get<Repository<TiendaEntity>>(getRepositoryToken(TiendaEntity));
    cafeRepository = module.get<Repository<CafeEntity>>(getRepositoryToken(CafeEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a cafe to a store', async () => {
    const tienda:TiendaEntity = await tiendaRepository.save({
      id: -1,
      nombre: faker.name.firstName(),
      direccion: faker.address.streetAddress(),
      telefono: "321654987",
      cafes: []
    });
    const cafe:CafeEntity = await cafeRepository.save({
      id: -1,
      nombre: faker.name.firstName(),
      descripcion: faker.lorem.sentence(),
      precio: -15,
      tiendas: []
    });
    
    const result: TiendaEntity = await service.addCafeToTienda(tienda.id, cafe.id);

    expect(result).not.toBeNull();
    expect(result.cafes.length).toBe(1);
    expect(result.cafes[0]).not.toBeNull();
    expect(result.cafes[0].nombre).toBe(cafe.nombre);
  });

  it('should throw an error when the store does not exist', async () => {
    const cafe:CafeEntity = await cafeRepository.save({
      id: -1,
      nombre: faker.name.firstName(),
      descripcion: faker.lorem.sentence(),
      precio: -15,
      tiendas: []
    });
    
    await expect(() => service.addCafeToTienda(-1, cafe.id)).rejects.toHaveProperty("message", "La tienda no existe")
  });

  it('should throw an error when the coffee does not exist', async () => {
    const tienda:TiendaEntity = await tiendaRepository.save({
      id: -1,
      nombre: faker.name.firstName(),
      direccion: faker.address.streetAddress(),
      telefono: "321654987",
      cafes: []
    });
    
    await expect(() => service.addCafeToTienda(tienda.id, -1)).rejects.toHaveProperty("message", "El café no existe")
  });
});
