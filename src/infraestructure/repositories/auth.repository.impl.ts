import { AuthRepository, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { AuthDatasource } from '../../domain/datasource/auth.datasource';

export class AuthRepositoryImpl implements AuthRepository {
    constructor(
        private readonly AuthDatasource: AuthDatasource,
    ) { }

    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.AuthDatasource.login(loginUserDto);
    }

    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.AuthDatasource.register(registerUserDto);
    }
}