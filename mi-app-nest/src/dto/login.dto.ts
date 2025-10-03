import { IsEmail, MinLength,MaxLength } from "class-validator";

export class LoginDTO {

    @IsEmail()
    email: string;

    @MinLength(5)
    @MaxLength(10)
    password: string;
}