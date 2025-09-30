import { IsNotEmpty, Min, IsInt } from "class-validator";

export class CreateProductDTO {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    descripcion: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0, {message: 'El numero de productos en stock no puede ser menor a cero'})
    stock: number;

}