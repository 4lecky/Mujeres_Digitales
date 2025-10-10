import { Controller, Get, Post, Put, Delete, Param, Body, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Iuser } from '../../models';
import { CreateUserDTO } from '../../dto/create-user.dto';
import { UpdateUserDTO } from '../../dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt.guard'
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/role.decorator';
import { RolesEmun} from '../../entities/user.entity';


@Controller('users')
// Con esto protegemos todo nuestro modulo
@UseGuards(JwtAuthGuard, RolesGuard)
// Llamamos a los guardianes, el primero valida el token y el segundo los roles


export class UsersController {

    constructor(private readonly usersService: UsersService) { }


    // Endpoint para obtener todos los usuarios (Consultar)
    @Get()
    @Roles(RolesEmun.ADMIN, RolesEmun.USER)   
    findAll() {
        return this.usersService.findAll();
    }

    // Endpoint para obtener un usuario por id
    @Get(':id')
     @Roles(RolesEmun.ADMIN, RolesEmun.USER)   
    // Decimos que es string ya que desde front llega como string ya que es parte de la URL
    // Luego en el backend lo convertimos a number con Number(id) 
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(Number(id))
    }

    @Post()
    @Roles(RolesEmun.ADMIN)   
    // Cuando es un 'post' usamos @Body para obtener el cuerpo de la peticion (Generalmente en JSON desde front)
    create(@Body() body: CreateUserDTO) {
        return this.usersService.createUser(body);
    }

    @Put(':id')
    @Roles(RolesEmun.ADMIN)  
    update(@Param('id') id: string, @Body() body: UpdateUserDTO) {
        return this.usersService.updateUser(Number(id), body);
    }

    @Delete(':id')
    @Roles(RolesEmun.ADMIN) 
    remove(@Param('id') id: string) {
        return this.usersService.deleteUser(Number(id));
    }
}

