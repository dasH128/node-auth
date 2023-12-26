import { Router } from "express";

export class AuthRoutes {

    static get routes(): Router {
        const router = Router();

        router.post('/login', (req, res) => { res.json('LOGIN'); });
        router.post('/register', (req, res) => { res.json('REGISTER'); });

        return router;
    }

}