import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStategy } from './jwt.stategy';


@Module({
  imports: [PassportModule.register({defaultStrategy:'jwt'}),JwtModule.register({
    secret:'topSecrets',
    signOptions:{
      expiresIn:3600,

    }
  }),TypeOrmModule.forFeature([UserRepository])],

  providers: [AuthService, JwtStategy],
  controllers: [AuthController],
  exports: [JwtStategy,PassportModule]
})
export class AuthModule {}
