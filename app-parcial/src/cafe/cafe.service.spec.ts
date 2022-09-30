import { Test, TestingModule } from '@nestjs/testing';
import { CafeService } from './cafe.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { CafeEntity } from './cafe.entity';

describe('CafeService', () => {
  let service: CafeService;
  let repository: Repository<CafeEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CafeService],
    }).compile();

    service = module.get<CafeService>(CafeService);
    repository = module.get<Repository<CafeEntity>>(getRepositoryToken(CafeEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new cafe', async () => {
    const cafe:CafeEntity = await service.createCafe({
      id: -1,
      nombre: faker.name.firstName(),
      descripcion: faker.lorem.sentence(),
      precio: 15,
      tiendas: []
    });

    const newCafe = await service.createCafe(cafe);
    
    expect(newCafe).not.toBeNull();
    expect(newCafe.nombre).toBe(cafe.nombre);
  });

  it('should throw an error when the price is negative', async () => {
    const cafe:CafeEntity = await service.createCafe({
      id: -1,
      nombre: faker.name.firstName(),
      descripcion: faker.lorem.sentence(),
      precio: -15,
      tiendas: []
    });
    await expect(() => service.createCafe(cafe)).rejects.toHaveProperty("message", "El precio del café no puede ser negativo")
  });
});
