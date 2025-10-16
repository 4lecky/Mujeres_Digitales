import * as userEntity from '../entities/user.entity';
import { IsNotEmpty, IsEmail, MinLength, MaxLength, IsOptional, IsInt, Min } from "class-validator";
import { CreateUserDTO } from "./create-user.dto";
import { } from "class-validator";


export class UpdateUserDTO {

    @IsNotEmpty()
    role: userEntity.Roles;

    @IsOptional()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @MinLength(5)
    @MaxLength(10)
    password?: string;

    @IsOptional()
    @IsInt()
    @Min(18, { message: 'La edad debe ser un numero positivo y mayor de edad' })
    age?: number;
}