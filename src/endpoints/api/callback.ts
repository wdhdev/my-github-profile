import { Request, Response } from "express";
import SessionData from "../../types/SessionData";

import * as Sentry from "@sentry/node";
import axios from "axios";
import { URLSearchParams } from "url";

export default async (req: Request & SessionData, res: Response) => {
    const code = req.query.code as string;

    const params = new URLSearchParams({
        client_id: process.env.github_client_id,
        client_secret: process.env.github_client_secret,
        code: code,
        redirect_uri: "https://mgp.hrsn.dev/api/callback"
    })

    try {
        const { data } = await axios.post("https://github.com/login/oauth/access_token", params, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })

        req.session.token = data.access_token;

        res.redirect("/");
    } catch(err) {
        Sentry.captureException(err);

        res.render("auth/error");
    }
}
