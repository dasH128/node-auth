import { JwtAdapter } from "../../../config";
import { AuthRepository, CustomError, RegisterUserDto } from "../../../domain";

interface RegisterUserUseCase {
    execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
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

export class RegisterUser implements RegisterUserUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly generateTokenFunction: GenerateTokenFunction = JwtAdapter.generateToken,
    ) { }

    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {

        const user = await this.authRepository.register(registerUserDto);
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