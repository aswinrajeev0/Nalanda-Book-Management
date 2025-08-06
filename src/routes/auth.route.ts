import { authController } from "../container";
import { BaseRoute } from "./base.route";

export class AuthRoute extends BaseRoute {
    constructor() {
        super();
    }

    protected initializeRoute(): void {
        this.router.post("/register", (req, res, next) => {
            authController.register(req, res, next)
        });
        
        this.router.post("/login", (req, res, next) => {
            authController.login(req, res, next);
        });
    }
}