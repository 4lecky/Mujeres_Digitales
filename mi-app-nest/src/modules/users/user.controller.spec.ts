import { Roles } from '../auth/role.decorator';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RolesEmun } from '../../entities/user.entity';

const usersFake = [
    { id: 1, name: 'John', email: 'Joh@gmail.com', password: '12345', role: RolesEmun.ADMIN },
    { id: 2, name: 'Jane', email: 'Jane@gmail.com', password: '12345', role: RolesEmun.USER },
];

describe('UserController', () => {
    let controller: UsersController;
    let fakeService: jest.Mocked<UsersService>;

    beforeEach(() => {
        fakeService = {
            findAll: jest.fn(),
            findOne: jest.fn(),
            createUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
        } as any;

        controller = new UsersController(fakeService);
    })

    it('Deberia devolver todos los usuarios', async () => {
        fakeService.findAll.mockResolvedValue(usersFake);
        const users = await controller.findAll();

        expect(users.length).toBeGreaterThan(1);
        expect(users).toEqual(usersFake);
    })

    it('Deberia retornar a un usuario por id', async () => {
        fakeService.findOne.mockResolvedValue(usersFake[0])
        const result = await controller.findOne('1')
        expect(result.email).toEqual('Joh@gmail.com')
    })

    it('Deberia crear un usuario', async () => {

        const newUserMock = { name: 'Alice', email: 'alice@gmail.com', password: 'password123' };
        fakeService.createUser.mockResolvedValue({ id: 3, ...newUserMock });

        const result = await controller.create(newUserMock as any);
        expect(fakeService.createUser).toHaveBeenCalledWith(newUserMock);
        expect(result.id).toBe(3);
    })

    it('Deberia actualizar un usuario', async () => {
        const updateUserMock = { id: 1, name: 'John dev', role: 'admin' };
        fakeService.updateUser.mockResolvedValue({ id: 1, ...updateUserMock });
        // fakeService.findOne.mockResolvedValue(updateUserMock);

        const result = await controller.update(1, updateUserMock);
        expect(fakeService.updateUser).toHaveBeenCalledWith(1, updateUserMock);
        expect(result.name).toEqual('John dev');
    })

    it('Deberia elminar a un usuario', async () => {
        fakeService.deleteUser.mockResolvedValue({ message: `El usuario con el id 1 fue eliminado exitosamente` });
        const result = await controller.remove(1);
        expect(fakeService.deleteUser).toHaveBeenCalledWith(1);
        expect(result).toEqual({ message: `El usuario con el id 1 fue eliminado exitosamente` });
    })



});