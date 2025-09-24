import { Injectable, NotFoundException } from '@nestjs/common';
import { Iuser } from '../../models';


@Injectable()
export class UsersService {

    private users: Iuser[] = [
        { id: 1, name: 'John Doe', email: 'Jhon@gmail.com', password: '123456*', age: 30 },
        { id: 2, name: 'Jane Doe', email: 'Jane@gmail.com', password: '123456*', age: 25 },
        { id: 3, name: 'Jim Beam', email: 'Jim@gmail.com', password: '123456*',  age: 40 },
    ]

    // metodo para obtener todos los usuarios
    findAll(): Iuser[] {
        return this.users;
    }

    // metodo para obtener un usuario por id
    findOne(id: number): Iuser {
        const userFind = this.users.find(user => user.id === id);
        if (!userFind) {
            throw new NotFoundException(`El usuario con el ${id} no existe`);
        } else {
            return userFind;
        }
    }

    // metodo para crear un usuario
    createUser(user: Omit<Iuser, 'id'>): Iuser {
        const newId = this.users.length > 0 ?
            this.users[this.users.length - 1].id + 1 : 1;

        const newUser: Iuser = { 
            id: newId, ...user 
        };

        this.users.push(newUser);
        return newUser;
    }

    // metodo para actualizar un usuario
    updateUser (id: number, newUser: Omit<Iuser, 'id'>): Iuser{
        const userIndex = this.findOne(id);
        Object.assign(userIndex, newUser);
        return userIndex;
    }

    deleteUser(id: number){
        //Usamos estsa funcion para encontrar el usuario y lanzar la excepcion si no existe
        // const userRemove = this.findOne(id);
        // this.users.splice(userRemove.id, 1);
        const userRemove = this.users.findIndex((user) => user.id === id);
        this.users.splice(userRemove, 1);
        return { message: `Usuario con id ${id} eliminado` };
    }

}
