import { TiendaEntity } from '../tienda/tienda.entity';
import {Column, Entity,  ManyToMany, PrimaryGeneratedColumn, JoinTable} from 'typeorm';

@Entity()
export class CafeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  precio: number;

  @ManyToMany(() => TiendaEntity, (tiendas) => tiendas.cafes)
    @JoinTable()
    tiendas: TiendaEntity[];

}
