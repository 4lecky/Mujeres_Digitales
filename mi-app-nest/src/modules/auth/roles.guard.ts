//Guardian propio para los roles
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./role.decorator";
import { BusinessException } from "src/common/exceptions/bussines.exeption";


@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) {}
    
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) return true;


        // Con esto obtenemos el usuario que hizo la peticion
        const { user } = context.switchToHttp().getRequest();

        if (!user) throw new Error('User no autenticado');

        // Con esto verificamomsos si el rol del usuario esta en los roles permitidos
        if (!requiredRoles.includes(user.role)) {
            // throw new ForbiddenException ('Su rol no tiene permisos para esta accion');
            throw new BusinessException ('Su rol no tiene permisos para esta accion');
        }

        return true;
    }
}