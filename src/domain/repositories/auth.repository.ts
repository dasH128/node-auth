import { LoginUserDto, RegisterUserDto } from '../../domain';
import { UserEntity } from '../entities/user.entity';


export abstract class AuthRepository {
    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}