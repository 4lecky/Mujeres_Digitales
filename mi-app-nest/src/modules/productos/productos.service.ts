import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { Products } from '../../entities/productos.entity';
import {CreateProductDTO} from '../../dto/productos/create-product.dto';
import {UpdateProductDTO} from '../../dto/productos/update-product.dto';

@Injectable()
export class ProductosService {

    /**
     * Inyecta el repositorio de productos para operaciones CRUD.
     * param productsRepo - Repositorio TypeORM de la entidad Products
     */
    constructor(
        @InjectRepository(Products)
        private productsRepo: Repository<Products>
    ) {}

    /**
     * Obtiene todos los productos en la base de datos.
     * returns Lista de productos
     */
    allProducts() {
        return this.productsRepo.find();
    }

    /**
     * Busca un producto por su ID.
     * Lanza una excepción si el producto no existe.
     * param id - ID del producto a buscar
     * returns El producto encontrado
     * throws NotFoundException si el producto no existe
     */
    async oneProduct(id:number) {
        const productFind = await this.productsRepo.findOne({where: { id }});

        if (!productFind){
            throw new NotFoundException(`El producto con el id ${id} no existe`);
        }else{
            return productFind;
        }
    }

    /**
     * Crea un nuevo producto y lo guarda en la base de datos.
     * param newProduct - Datos del producto a crear
     * returns El producto creado
     */
    createProduct (newProduct: CreateProductDTO){

        const ProductCreated = this.productsRepo.create(newProduct);

        return this.productsRepo.save(ProductCreated);

    }

    /**
     * Actualiza un producto existente.
     * Si el producto no existe, se lanzará una excepción en oneProduct.
     * param id - ID del producto a actualizar
     * param productUpdate - Datos a actualizar
     * returns El producto actualizado
     */
    async updateProduct (id:number, productUpdate:UpdateProductDTO) {
        await this.productsRepo.update(id, productUpdate);
        return this.oneProduct(id);
    }


    /**
     * Elimina un producto por su ID.
     * Lanza una excepción si el producto no existe.
     * param id - ID del producto a eliminar
     * returns Mensaje de éxito si se elimina correctamente
     * throws NotFoundException si el producto no existe
     */
    async deleteProduct(id:number){

        const productRemove = await this.productsRepo.delete(id);

        if (productRemove.affected === 0) throw new NotFoundException(`El producto con el id ${id} no fue encontrado`)
        return { message: `El producto con el ${id} ha sido eliminado exitosamente`}
    }

}
