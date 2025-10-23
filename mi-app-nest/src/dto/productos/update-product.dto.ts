import { CreateProductDTO } from './create-product.dto'
import { IsNotEmpty, Min, IsInt, IsOptional } from "class-validator";

export class UpdateProductDTO {

    @IsOptional()
    name?: string;

    @IsOptional()
    descripcion?: string;

    @IsOptional()
    @IsInt()
    @Min(0, { message: 'El numero de productos en stock no puede ser menor a cero' })
    stock?: number;

}