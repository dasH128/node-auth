import express from "express";
import { AppRoutes } from "./routes";

interface Options {
    port?: number;
}

export class Server {
    public readonly app = express()
    private readonly port: number;

    constructor(options: Options) {
        const { port = 3100 } = options;
        this.port = port;
    }

    async start() {
        this.app.use(AppRoutes.routes);

        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    }
}