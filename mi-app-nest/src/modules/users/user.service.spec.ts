import { UsersService } from './users.service';


describe ('UserService', () => {

    let service: UsersService;
    let fakeRepo;

    beforeEach(() => {

        // Crear un fake repo para realizar los test
        fakeRepo = {
            find: jest.fn().mockResolvedValue([
                {id: 1, name: 'John', email: 'Joh@gmail.com'},
                {id: 2, name: 'Jane', email: 'Jane@gmail.com'}
            ]),
            finOne: jest.fn(),
            save: jest.fn(),

        };

        service = new UsersService(fakeRepo as any);

    })

    it ('Deberia devolver todos los usuarios', async () => {
        const users = await service.findAll();
        expect(users.length).toBeGreaterThan(0);
        expect(fakeRepo.find).toHaveBeenCalled();
    })

})