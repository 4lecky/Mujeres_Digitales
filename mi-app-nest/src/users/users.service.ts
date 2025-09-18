import { Injectable, NotFoundException } from '@nestjs/common';

export type Iuser = { id: number, name: string, email: string }

@Injectable()
export class UsersService {

    private users: Iuser[] = [
        { id: 1, name: 'John Doe', email: 'Jhon@gmail.com'},
        { id: 2, name: 'Jane Doe', email: 'Jane@gmail.com'},
        { id: 3, name: 'Jim Beam', email: 'Jim@gmail.com'}
    ]

    // metodo para obtener todos los usuarios
    findAll(): Iuser[] {
        return this.users;
    }

    findOne (id: number): Iuser {
        const userFind = this.users.find(user=> user.id === id);
        if (!userFind) {
            throw new NotFoundException(`El usuario con el ${id} no existe`);
        }else{
            return userFind;
        }
    }
}
