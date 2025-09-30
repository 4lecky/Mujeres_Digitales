import { Controller, Get, Post, Put, Delete,Param, Body } from '@nestjs/common';
import { ProductosService } from './productos.service'
import {CreateProductDTO} from '../../dto/productos/create-product.dto';
import {UpdateProductDTO} from '../../dto/productos/update-product.dto';


@Controller('productos')
export class ProductosController {

    constructor(private readonly productosService: ProductosService) {}

    @Get()
    allProducts () {
        return this.productosService.allProducts();
    }

    @Get(':id')
    // Lo pasamos como id, porque generalmente asi llega desde el front
    oneProduct (@Param('id') id:string) {
        // Al momento de procesarlo lo convertimos a number para el backend
        return this.productosService.oneProduct(Number(id))
    }

    @Post()
    createProduct(@Body() body: CreateProductDTO){
        return this.productosService.createProduct(body);
    }

    @Put(':id')
    updateProduct(@Param('id') id:string, @Body() body: UpdateProductDTO){
        return this.productosService.updateProduct(Number(id), body)
    }

    @Delete(':id')
    deleteProduct(@Param('id') id:string){
        return this.productosService.deleteProduct(Number(id));
    }



}
