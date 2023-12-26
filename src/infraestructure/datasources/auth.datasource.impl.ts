import { AuthDatasource, RegisterUserDto, UserEntity, CustomError, } from "../../domain";

export class AuthDatasourceImpl implements AuthDatasource {

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const { name, email, password } = registerUserDto;

        try {
            //Verificar si email existe

            //Hash de constraseña

            //Mapear la respuesta a nuestra entidad
            return new UserEntity(
                '1',
                name,
                email,
                password,
                ['ADMIN_ROLE'],
            );
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
}