// Archivo importante para generar el token 

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt'
import { emitWarning } from "process";

@Injectable()
export class JwtStretegy extends PassportStrategy(Strategy){

    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secret0rKey: process.env.JWT_SECRET_KEY
        })
    }

    async validate(payload: any) {

        return { userId:payload.id, email:payload.id}

    }
    
}