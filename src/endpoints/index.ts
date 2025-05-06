import { Request, Response } from "express";
import SessionData from "../types/SessionData";

import * as Sentry from "@sentry/node";
import axios from "axios";

export default async (req: Request & SessionData, res: Response) => {
    if(!req.session.token) return res.status(200).render("login");

    try {
        const { data: userData } = await axios.get("https://api.github.com/user", {
            headers: {
                Authorization: `token ${req.session.token}`
            }
        })

        const { data: emailData } = await axios.get("https://api.github.com/user/emails", {
            headers: {
                Authorization: `token ${req.session.token}`
            }
        })

        const { data: orgData } = await axios.get(userData.organizations_url, {
            headers: {
                Authorization: `token ${req.session.token}`
            }
        })

        const { data: starredGistData } = await axios.get("https://api.github.com/gists/starred", {
            headers: {
                Authorization: `token ${req.session.token}`
            }
        })

        const { data: starredRepoData } = await axios.get(userData.starred_url.slice(0, -15), {
            headers: {
                Authorization: `token ${req.session.token}`
            }
        })

        let primaryEmail = "";

        for (const res of emailData) {
            if(res.primary) primaryEmail = res.email;
        }

        res.render("account", {
            userData: userData,
            created_at: userData.created_at,
            updated_at: userData.updated_at,
            emailData: emailData,
            primaryEmail: primaryEmail,
            orgData: orgData,
            starredGistData: starredGistData,
            starredRepoData: starredRepoData,
            functions: {
                formatBytes: formatBytes
            }
        })
    } catch(err) {
        Sentry.captureException(err);
        console.error(err);

        res.status(500).render("auth/error");
    }
}

function formatBytes(bytes: number, decimals = 2) {
    if(!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
