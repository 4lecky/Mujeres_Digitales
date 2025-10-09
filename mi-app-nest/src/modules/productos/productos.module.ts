import { Module } from '@nestjs/common';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../../entities/productos.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [ProductosController],
  providers: [ProductosService]
})
export class ProductosModule {}
