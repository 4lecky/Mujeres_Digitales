import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';

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

}