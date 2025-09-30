import { Injectable, NotFoundException } from '@nestjs/common';
import {IProduct} from '../../models/IProduc';

@Injectable()
export class ProductosService {


    private productos: IProduct[] = [
        {id: 1, name: 'Marcadores', descripcion: 'Marcadores color pastel', stock: 20},
        {id: 2, name: 'Cuadernos', descripcion: 'Cuadriculados de 100 hojas', stock: 100},
        {id: 3, name: 'Esferos', descripcion: 'Tinta azul', stock: 10}
    ]

    // Con esto obtenemos todos los productos
    allProducts(): IProduct[] {
        return this.productos;
    }

    // Busca a un producto por id
    oneProduct(id:number): IProduct {
        const productFind = this.productos.find(product => product.id === id )
        if (!productFind){
            throw new NotFoundException(`El producto con el id ${id} no existe`);
        }else{
            return productFind;
        }
    }

    // Omitimos que pida el id para crear el producto
    createProduct (product: Omit<IProduct, 'id'>): IProduct {
        // Simulamos un id autoincremental
        const idAutoIncrement = this.productos.length > 0 ?
            this.productos[this.productos.length - 1].id + 1 : 1;

        const newProduct: IProduct = {
            id: idAutoIncrement, ...product
        }; 

        this.productos.push(newProduct);
        return newProduct;

    }

    // Actualizar producto
    updateProduct (id:number, newProduct: Omit<IProduct,'id'>):IProduct {
        const productRegistro = this.oneProduct(id);
        Object.assign(productRegistro, newProduct);
        return productRegistro;
    }

    deleteProduct(id:number){

        const productRemove = this.productos.findIndex((product) => product.id === id);
        this.productos.splice(productRemove, 1);
        return { message: `El producto con el ${id} ha sido eliminado exitosamente`}
    }

}
