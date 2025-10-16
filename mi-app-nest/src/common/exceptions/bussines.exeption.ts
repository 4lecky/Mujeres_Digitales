import { HttpException, HttpStatus } from "@nestjs/common";
import { error } from "console";

export class BusinessException extends HttpException {

    constructor(message: string){
        super({
            error: 'Business Error',
            message
        }, HttpStatus.BAD_REQUEST);
    }
}