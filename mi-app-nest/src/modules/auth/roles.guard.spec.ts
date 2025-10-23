import { Reflector } from "@nestjs/core";
import { RolesGuard } from "./roles.guard";
import { get } from "http";
import { ForbiddenException } from "@nestjs/common";
import { BusinessException } from "./../../common/exceptions/bussines.exeption";

describe('RolesGuard', () => {

    let guard: RolesGuard
    let reflector: Reflector;

    beforeEach(() => {
        reflector = { getAllAndOverride: jest.fn() } as any;
        guard = new RolesGuard(reflector);
    });

    it('Deberia permitir acceso si no hay roles definidos', () => {
        (reflector.getAllAndOverride as jest.Mock).mockReturnValue(undefined);

        const context = {
            getHandler: jest.fn(),
            getClass: jest.fn(),
            switchToHttp: () => ({
                getRequest: () => ({ id: 1, role: 'user' })
            })
        } as any;

        const result = guard.canActivate(context);
        expect(result).toBe(true);
    });

    it('Deberia lanzar un ForbiddenExeption si el usuario no se ha logueado', () => {

        (reflector.getAllAndOverride as jest.Mock).mockReturnValue(['admin'])
        const context = {
            getHandler: jest.fn(),
            getClass: jest.fn(),
            switchToHttp: () => ({ getRequest: () => ({}) })
        } as any;

        expect(() => guard.canActivate(context)).toThrow(ForbiddenException)

    });
    // prueba para la hora del commit 

    // PRUEBA COMMIT 2

    it('Debe lanzar BussinessException si el rol no coincide con el requerido', () => {

        (reflector.getAllAndOverride as jest.Mock).mockReturnValue(['admin'])
        const context = {
            getHandler: jest.fn(),
            getClass: jest.fn(),
            switchToHttp: () => ({ getRequest: () => ({ user: { id: 1, role: 'user' } }) })
        } as any;

        expect(() => guard.canActivate(context)).toThrow(BusinessException)

    })


    it('Debe permitir el acceso si el rol coincide con el requerido', () => {

        (reflector.getAllAndOverride as jest.Mock).mockReturnValue(['admin'])
        const context = {
            getHandler: jest.fn(),
            getClass: jest.fn(),
            switchToHttp: () => ({ getRequest: () => ({ user: { id: 1, role: 'admin' } }) })
        } as any;

        const result = guard.canActivate(context)
        expect(result).toBe(true)
    })

});