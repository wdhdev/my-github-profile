import { Request, Response } from "express";

import querystring from "node:querystring";

export default async (req: Request, res: Response) => {
    const params = querystring.stringify({
        client_id: process.env.github_client_id,
        redirect_uri: "https://mgp.hrsn.dev/api/callback",
        scope: "read:org read:user user:email"
    })

    res.redirect(`https://github.com/login/oauth/authorize?${params}`);
}
