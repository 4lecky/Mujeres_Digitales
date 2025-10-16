import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProductosService } from './productos.service'
import { CreateProductDTO } from '../../dto/productos/create-product.dto';
import { UpdateProductDTO } from '../../dto/productos/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt.guard'
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/role.decorator';
import { RolesEmun} from '../../entities/user.entity';


@Controller('productos')
export class ProductosController {

    // Inyección del servicio de productos para manejar la lógica de negocio
    constructor(private readonly productosService: ProductosService) { }

    /**
     * Obtiene la lista de todos los productos.
     * GET /productos
     */
    @Get()
    allProducts() {
        return this.productosService.allProducts();
    }

    
    /**
     * Obtiene un producto específico por su ID.
     * GET /productos/:id
     * param id - ID del producto a buscar
     */
    @Get(':id')
    oneProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productosService.oneProduct(id)
    }


    /**
     * Crea un nuevo producto.
     * POST /productos
     * Protegido con autenticación JWT.
     * body - Datos del nuevo producto (CreateProductDTO)
     */
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEmun.ADMIN)   
    @Post()
    createProduct(@Body() body: CreateProductDTO) {
        return this.productosService.createProduct(body);
    }


    /**
     * Actualiza un producto existente.
     * PUT /productos/:id
     * param id - ID del producto a actualizar
     * param body - Datos a actualizar (UpdateProductDTO)
     */
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEmun.ADMIN)   
    @Put(':id')
    updateProduct(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductDTO) {
        return this.productosService.updateProduct(id, body)
    }


    /**
     * Elimina un producto.
     * DELETE /productos/:id
     * param id - ID del producto a eliminar
     */
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEmun.ADMIN)   
    @Delete(':id')
    // Con el pipé hacemos la validación que antes haciamos con Number(id) 
    deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productosService.deleteProduct(id);
    }
}
