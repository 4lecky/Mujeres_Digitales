import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { LoginDTO } from 'src/dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { emit } from 'process';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { json } from 'stream/consumers';

@Injectable()
export class AuthService {

    // Llamamos a usuarios y usamos sus datos
    constructor(
        @InjectRepository(User)
        private usersRepo: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async register(data: CreateUserDTO) {
        // Con esto encriptamos la contraseña
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const userRegister = this.usersRepo.create({ ...data, password: hashedPassword });
        // ...data (Con esto dispersamos los datos), password: hashedPassword (Simplemente le asignamos el valor enciptado al atributo de password)
        await this.usersRepo.save(userRegister);
        return { message: 'Usuario registrado existosamente', user: { id: userRegister.id, email: userRegister.email } }
    }


    async login(data: LoginDTO) {

        const user = await this.usersRepo.findOne({ where: { email: data.email } })

        if (!user) {
            throw new UnauthorizedException("Credenciales incorrectas");
        }

        // Con esto validamos la contraseña (Desencriptamos)
        const isPasswordValid = await bcrypt.compare(data.password, user.password)

        if (!isPasswordValid) {
            throw new UnauthorizedException("Credenciales incorrectas");

        }

        //Cuerpo del token
        const payloadToken = { id: user.id, name: user.name, email: user.email }
        const jsonJwt = await this.jwtService.signAsync(payloadToken);

        return {
            accessToken: jsonJwt
        }

    }
}
