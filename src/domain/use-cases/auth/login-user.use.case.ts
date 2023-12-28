import { JwtAdapter } from "../../../config";
import { UserEntity } from '../../entities/user.entity';
import { AuthRepository, CustomError, LoginUserDto } from '../../../domain';

interface LoginUserUseCase {
    execute(loginUserDto: LoginUserDto): Promise<UserToken>
}

interface UserToken {
    token: string;
    user: {
        id: string,
        name: string,
        email: string,
    }
}

type GenerateTokenFunction = (paylaod: Object, duration?: string) => Promise<string | null>

export class LoginUser implements LoginUserUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly generateTokenFunction: GenerateTokenFunction = JwtAdapter.generateToken,
    ) { }

    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {

        const user = await this.authRepository.login(loginUserDto);
        const token = await this.generateTokenFunction({ id: user.id }, '2h');
        if (!token) {
            throw CustomError.internalServer('Error generating token');
        }

        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    }
}