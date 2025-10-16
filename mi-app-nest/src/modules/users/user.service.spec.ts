import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const usersFake = [
     {id: 1, name: 'John', email: 'Joh@gmail.com', password: '12345', role: 'admin'},
     {id: 2, name: 'Jane', email: 'Jane@gmail.com', password: '12345', role: 'user'},
];

jest.mock('bcrypt');

describe ('UserService', () => {

    let service: UsersService;
    let fakeRepo;

    beforeEach(() => {
        jest.clearAllMocks(); // Limpiar los mocks antes de cada test
        // Crear un fake repo para realizar los test
        fakeRepo = {
            find: jest.fn().mockResolvedValue(usersFake),
            findOne: jest.fn().mockResolvedValue(usersFake),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        service = new UsersService(fakeRepo as any);

    })

    it ('Deberia devolver todos los usuarios', async () => {
        const users = await service.findAll();
        expect(users.length).toBeGreaterThan(0);
        expect(fakeRepo.find).toHaveBeenCalled();
    })

    it ('Deberia retornar a un usuario por id', async () => {
        fakeRepo.findOne.mockResolvedValue(usersFake[0])
        const result = await service.findOne(1)
        expect(result.email).toEqual('Joh@gmail.com')
    })

    it ('Deberia lanzar una excepción de tipo NotFoundException si el usuario no existe', async () => {
        fakeRepo.findOne.mockResolvedValue(null);
        await expect(service.findOne(10)).rejects.toThrow(NotFoundException);
    })

    it ('Deberia crear un usuario', async () => {

        const newUserMock = {name: 'Alice', email: 'alice@gmail.com', password: 'password123'};
        fakeRepo.save.mockResolvedValue({...newUserMock, id: 3});
        const result = await service.createUser(newUserMock as any);
        expect(result.id).toBe(3);
    })

    it ('Deberia actualizar un usuario', async () => { 
        const updateUserMock =  {id: 1,name: 'John dev', role: 'admin'};
        fakeRepo.update.mockResolvedValue({affected: 1});
        fakeRepo.findOne.mockResolvedValue(updateUserMock);

        const result = await service.updateUser(1, {name: 'John dev', role: 'admin'});
        expect(fakeRepo.update).toHaveBeenCalledWith(1, {name: 'John dev', role: 'admin'});
        expect(result.name).toEqual('John dev');
    })

    it ('Deberia actualizar un usuario y encriptar la contraseña', async () => { 
        const updateUserMock =  {id: 1,name: 'John dev', role: 'admin', password: 'newPassword'};
        (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
        fakeRepo.update.mockResolvedValue({affected: 1});
        fakeRepo.findOne.mockResolvedValue({...updateUserMock, password: 'hashedPassword'});

        const result = await service.updateUser(1, updateUserMock as any);
        expect(bcrypt.hash).toHaveBeenCalledWith('newPassword', 10);
        expect(fakeRepo.update).toHaveBeenCalledWith(1, {...updateUserMock, password: 'hashedPassword'});
        expect(result.password).toBe('hashedPassword');
    })

    it ('Deberia elminar a un usuario', async () => {
        fakeRepo.delete.mockResolvedValue({affected: 1});
        const result = await service.deleteUser(1);
        expect(fakeRepo.delete).toHaveBeenCalledWith(1);
        expect(result).toEqual({ message : `El usuario con el id 1 fue eliminado exitosamente`});
    })


})