import { Request, Response } from "express";
import SessionData from "../../types/SessionData";

export default async (req: Request & SessionData, res: Response) => {
    req.session.token = null;

    res.redirect("/");
}
