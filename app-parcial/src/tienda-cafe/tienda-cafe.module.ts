import { Module } from '@nestjs/common';
import { TiendaCafeService } from './tienda-cafe.service';

@Module({
  providers: [TiendaCafeService]
})
export class TiendaCafeModule {}
