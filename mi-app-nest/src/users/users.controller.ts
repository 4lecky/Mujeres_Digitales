import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}


    // Endpoint para obtener todos los usuarios
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
}

