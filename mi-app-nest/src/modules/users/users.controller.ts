import { Controller, Get, Post, Put, Delete, Param, Body, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Iuser } from '../../models';
import { CreateUserDTO } from '../../dto/create-user.dto';
import { UpdateUserDTO } from '../../dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt.guard'

@Controller('users')
// Con esto protegemos todo nuestro modulo
@UseGuards(JwtAuthGuard)
export class UsersController {

    constructor(private readonly usersService: UsersService) { }


    // Endpoint para obtener todos los usuarios (Consultar)
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    // Endpoint para obtener un usuario por id
    @Get(':id')
    // Decimos que es string ya que desde front llega como string ya que es parte de la URL
    // Luego en el backend lo convertimos a number con Number(id) 
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(Number(id))
    }

    @Post()
    // Cuando es un 'post' usamos @Body para obtener el cuerpo de la peticion (Generalmente en JSON desde front)
    // (Enviar)
    create(@Body() body: CreateUserDTO) {
        return this.usersService.createUser(body);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: UpdateUserDTO) {
        return this.usersService.updateUser(Number(id), body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.deleteUser(Number(id));
    }
}

