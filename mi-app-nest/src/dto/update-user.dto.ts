import * as userEntity from '../entities/user.entity';
import { IsNotEmpty } from "class-validator";
import { CreateUserDTO } from "./create-user.dto";


export class UpdateUserDTO extends CreateUserDTO {

    @IsNotEmpty()
    role: userEntity.Roles;
}