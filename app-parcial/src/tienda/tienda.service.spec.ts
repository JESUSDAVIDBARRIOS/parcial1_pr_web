import { Test, TestingModule } from '@nestjs/testing';
import { TiendaService } from './tienda.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { TiendaEntity } from './tienda.entity';

describe('TiendaService', () => {
  let service: TiendaService;
  let repository: Repository<TiendaEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TiendaService],
    }).compile();

    service = module.get<TiendaService>(TiendaService);
    repository = module.get<Repository<TiendaEntity>>(getRepositoryToken(TiendaEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new tienda', async () => {
    const tienda:TiendaEntity = await service.createTienda({
      id: -1,
      nombre: faker.name.firstName(),
      direccion: faker.address.streetAddress(),
      telefono: "321654987",
      cafes: []
    });

    const newTienda = await service.createTienda(tienda);
    
    expect(newTienda).not.toBeNull();
    expect(newTienda.id).not.toBeNull();
    expect(newTienda.nombre).toBe(tienda.nombre);
  });

  it('should throw an error when the phone number is invalid', async () => {
    const tienda:TiendaEntity = await service.createTienda({
      id: -1,
      nombre: faker.name.firstName(),
      direccion: faker.address.streetAddress(),
      telefono: "321654",
      cafes: []
    });
    await expect(() => service.createTienda(tienda)).rejects.toHaveProperty("message", "El número de teléfono no es válido")
  });

});
