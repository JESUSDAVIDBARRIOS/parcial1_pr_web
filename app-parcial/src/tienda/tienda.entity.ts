import { CafeEntity } from '../cafe/cafe.entity';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';

@Entity()
export class TiendaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @ManyToMany(() => CafeEntity, (cafes) => cafes.tiendas)
  @JoinTable()
  cafes: CafeEntity[];
}
