import { EntityRepository, Repository } from 'typeorm/index';
import { User } from './user.entity';
import { AuthCredentialsDto } from './Dto/authCredentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async singUp(authCredentials:AuthCredentialsDto): Promise<void>{
        const {username,password} = authCredentials;
        const  user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password,user.salt);
        try {
            await user.save();
        }catch (err){
            if (err.code === '23505'){
                throw new ConflictException('Username alredey exist')
            }
            else {
                throw new InternalServerErrorException()
            }
        }
    }

    private async hashPassword(password: string, salt: string):Promise<string>{
        return await bcrypt.hash(password,salt);
    }

     async  validateUserPassword(authCredentialsDto: AuthCredentialsDto ): Promise<string>{
        const { username,password} = authCredentialsDto;
        const user = await this.findOne({username});
        if (user && await user.validatePassword(password)){
            return user.username;
        }else {
            return null;
        }

    }
}