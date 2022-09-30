import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CafeModule } from './cafe/cafe.module';
import { TiendaModule } from './tienda/tienda.module';
import { TiendaCafeModule } from './tienda-cafe/tienda-cafe.module';

@Module({
  imports: [CafeModule, TiendaModule, TiendaCafeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
