import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './Dto/authCredentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { access } from 'fs';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository:UserRepository,
    private jwtService: JwtService) {}

    async signUp(authCredentialsDto: AuthCredentialsDto):Promise<void>{
      return await this.userRepository.singUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto):Promise< {accessToken:string} > {
    const username = await this.userRepository.validateUserPassword(authCredentialsDto);
    if (!username){
      throw new UnauthorizedException(`Invalid Credentials`);
    }

    const payload: JwtPayload = {username};
    const accessToken = await this.jwtService.sign(payload);

    return  {accessToken}
    }

}
