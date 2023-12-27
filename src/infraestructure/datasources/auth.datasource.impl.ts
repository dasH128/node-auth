import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, RegisterUserDto, UserEntity, CustomError, } from "../../domain";
import { UserMapper } from '../../infraestructure';


type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {
    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
    ) { }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const { name, email, password } = registerUserDto;

        try {
            //Verificar si email existe
            const exist = await UserModel.findOne({ email: email });
            if (exist) throw CustomError.badRequest('User already exists');

            //Hash de constraseña
            const user = await UserModel.create({
                name: name,
                email: email,
                password: this.hashPassword(password),
            });
            await user.save();

            //Mapear la respuesta a nuestra entidad
            return UserMapper.userEntityFromObject(user);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
}