import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../../entities/user.entity'

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStretegy } from './jwt.strategy'

@Module({

  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET_KEY'), 
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStretegy] // Importante tener encuenta las importaciones y los providers
})
export class AuthModule { }
