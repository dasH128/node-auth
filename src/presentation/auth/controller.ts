import { Request, Response } from 'express'
import {
    AuthRepository,
    CustomError,
    LoginUser,
    LoginUserDto,
    RegisterUser,
    RegisterUserDto,
} from '../../domain'
import { UserModel } from '../../data/mongodb';

export class AuthController {
    // DI
    constructor(
        private readonly authRepository: AuthRepository
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if (error) return res.status(400).json({ error });

        const useCaseLoginUser = new LoginUser(this.authRepository);
        useCaseLoginUser.execute(loginUserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));

    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({ error });


        const useCaseRegisterUser = new RegisterUser(this.authRepository);
        useCaseRegisterUser.execute(registerUserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    }


    getUsers = (req: Request, res: Response) => {
        UserModel.find()
            .then(users => res.json({
                users,
                payload: req.body.user
            }))
            .catch(() => res.status(500).json({
                errror: 'Internal server error'
            }));

    }

}