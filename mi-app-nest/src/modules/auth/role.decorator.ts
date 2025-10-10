import { SetMetadata } from '@nestjs/common';

//Creamos un decorador para los roles

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);