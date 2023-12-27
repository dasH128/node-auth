import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { envs } from './envs';

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {

    static async generateToken(
        paylaod: Object,
        duration: string = '2h',
    ): Promise<string | null> {
        return new Promise((resolve) => {
            sign(
                paylaod,
                JWT_SEED,
                { expiresIn: duration, },
                (err: Error | null, token: string | undefined) => {
                    if (err) return resolve(null);

                    return resolve(token!);
                },
            );
        });
    }

    static validateToken<T>(
        token: string,
    ): Promise<T | null> {
        return new Promise((resolve) => {
            verify(
                token,
                JWT_SEED,
                (err, decoded) => {
                    if (err) return resolve(null);

                    resolve(decoded as T)
                });
        });
    }
}