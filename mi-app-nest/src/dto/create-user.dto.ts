import { IsNotEmpty, IsEmail, MinLength, MaxLength,IsOptional, IsInt, Min } from 'class-validator';

export class CreateUserDTO {
    //export type Iuser = { id: number, name: string, email: string }

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(10)
    password: string;

    @IsOptional()
    @IsInt()
    @Min(18, { message: 'La edad debe ser un numero positivo y mayor de edad' })
    age?: number;

}