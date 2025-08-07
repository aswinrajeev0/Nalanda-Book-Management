import { bookController } from "../container";
import { authenticate, authorizeRole } from "../middlewares/auth.middleware";
import { BaseRoute } from "./base.route";

export class BookRoute extends BaseRoute {
    constructor(){
        super()
    }

    protected initializeRoute(): void {
        this.router.post("/add", authenticate, authorizeRole("admin"), (req, res, next) => {
            bookController.addBook(req, res, next);
        })

        this.router.put("/update/:id", authenticate, authorizeRole("admin"), (req, res, next) => {
            bookController.updateBook(req, res, next);
        })

        this.router.get("/list", authenticate, (req, res, next) => {
            bookController.listBooks(req, res, next);
        })

        this.router.delete("/delete", authenticate, authorizeRole("admin"), (req, res, next) => {
            bookController.deleteBook(req, res, next);
        })
    }
}