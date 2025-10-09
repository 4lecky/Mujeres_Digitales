import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';


@Injectable()
export class UsersService {

    // Hacemos este cambio para consumir la base de datos y las entitis
    constructor (
        @InjectRepository(User)
        private usersRepo: Repository <User>
    ){}

    // metodo para obtener todos los usuarios
    findAll() {
        return this.usersRepo.find();
    }

    // metodo para obtener un usuario por id
    async findOne(id: number) {
        const userFind = await this.usersRepo.findOne({ where: { id }})
        if (!userFind) {
            throw new NotFoundException(`El usuario con el ${id} no existe`);
        } else {
            return userFind;
        }
    }

    // metodo para crear un usuario
    createUser(newUser: CreateUserDTO) {
        //Con esto creamos el usuario
        const userCreated = this.usersRepo.create(newUser);
        //Con esto lo guardamos
        return this.usersRepo.save(userCreated)
    }

    // metodo para actualizar un usuario
    async updateUser (id:number, userUpdate: UpdateUserDTO){
        await this.usersRepo.update(id, userUpdate);
        return this.findOne(id); 
    }

    async deleteUser(id: number){
        const result = await this.usersRepo.delete(id)
        // 0 = Falso, 1= verdadero (Es un boleano)
        if (result.affected === 0) throw new NotFoundException(`El usuario con el id ${id} no fue encontrado`)
        return { message : `El usuario con el id ${id} fue eliminado exitosamente`}
    }

}
