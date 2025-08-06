import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import { HTTP_STATUS } from "../utils/shared/constants";

export abstract class BaseRoute {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoute();
    }

    protected abstract initializeRoute(): void;
}

export class HealthRoute extends BaseRoute {
    constructor() {
        super()
    }

    protected initializeRoute(): void {
        this.router.get('/', (req: Request, res: Response) => {
            const dbStatus = mongoose.connection.readyState === 1 ? "UP" : "DOWN";

            res.status(HTTP_STATUS.OK).json({
                status: "UP",
                database: dbStatus,
                timestamp: new Date().toISOString(),
            });
        })
    }
}