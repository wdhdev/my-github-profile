import { Router, Request, Response } from "express";
import SessionData from "../types/SessionData";

const router = Router();
import routes from "./routes";

router.get("/", async (req: Request & SessionData, res: Response) => {
    routes.index(req, res);
})

router.get("/api/auth", async (req: Request, res: Response) => {
    routes.api.auth(req, res);
})

router.get("/api/callback", async (req: Request & SessionData, res: Response) => {
    routes.api.callback(req, res);
})

router.get("/api/logout", async (req: Request & SessionData, res: Response) => {
    routes.api.logout(req, res);
})

export default router;
