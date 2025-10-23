import { UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { useContainer } from "class-validator";

jest.mock('bcrypt');
describe('AuthService', () => {

    let service: AuthService;
    let fakerepo: any;
    let jwtService: JwtService;

    const mockUser = {
        id: 1,
        name: 'testuser',
        email: 'test@gmail.com',
        password: 'pasword123',
        role: 'admin'

    };

    beforeEach(() => {
        fakerepo = {
            findOne: jest.fn().mockResolvedValue(mockUser),
            create: jest.fn().mockReturnValue(mockUser),
            save: jest.fn().mockResolvedValue(mockUser),
        };

        jwtService = {
            signAsync: jest.fn()
        } as any;

        service = new AuthService(fakerepo, jwtService);
    })

    it('Deberia registrar un usuario', async () => {
        const dto = { name: 'Jeff', email: 'test@gmail.com', password: '123456' };
        (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword')
        fakerepo.create.mockReturnValue({ ...dto, password: 'hashedPassword' })
        fakerepo.save.mockResolvedValue({ id: 1, ...dto, password: 'hashedPassword' })

        const result = await service.register(dto as any)

        expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10)
        expect(fakerepo.create).toHaveBeenCalled()
        expect(fakerepo.save).toHaveBeenCalled()
        expect(result).toEqual({
            message: 'Usuario registrado existosamente',
            user: { id: undefined, email: dto.email }
        })


    });

    it('Deberia iniciar sesion un usuario y retornar el token', async () => {
        const data = { email: 'test@gmail.com', password: 'pasword123' };
        fakerepo.findOne.mockResolvedValue(mockUser);
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        (jwtService.signAsync as jest.Mock).mockResolvedValue('fake_token');

        const result = await service.login(data);

        expect(fakerepo.findOne).toHaveBeenCalledWith({ where: { email: data.email } });
        expect(bcrypt.compare).toHaveBeenCalled();
        expect(jwtService.signAsync).toHaveBeenCalled();
        expect(result).toEqual({ accessToken: 'fake_token' });
    });

    it('Deberia lanzar UnauthorizedException si el email no existe', async () => {
        const data = { email: 'test@gmail.com', password: 'pasword123' };
        fakerepo.findOne.mockResolvedValue(null);
        await expect(service.login(data)).rejects.toThrow(UnauthorizedException)
    });

    it('Deberia lanzar un UnauthorizedException si la contraseña no coincide', async () => {
        const data = { email: 'test@gmail.com', password: 'password123' };
        fakerepo.findOne.mockResolvedValue(mockUser);
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);
        await expect(service.login(data)).rejects.toThrow(UnauthorizedException)
    })


});