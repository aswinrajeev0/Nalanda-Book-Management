import { borrowController } from "../container";
import { authenticate, authorizeRole } from "../middlewares/auth.middleware";
import { BaseRoute } from "./base.route";

export class BorrowRoute extends BaseRoute {
    constructor(){
        super()
    }

    protected initializeRoute(): void {
        this.router.use(authenticate)
        this.router.post("/:bookId", (req, res, next) => {
            borrowController.borrow(req, res, next);
        })

        this.router.patch("/return/:id", (req, res, next) => {
            borrowController.return(req, res, next);
        })

        this.router.get("/history", (req, res, next) => {
            borrowController.borrowHistory(req, res, next);
        })

        this.router.get("/most-borrowed-books", authorizeRole("admin"), (req, res, next) => {
            borrowController.mostBorrowedBooks(req, res, next);
        })

        this.router.get("/active-members", authorizeRole("admin"), (req, res, next) => {
            borrowController.mostActiveMembers(req, res, next);
        })
    }
}