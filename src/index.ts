import express from "express";
const app = express();

require("dotenv").config();
const port = process.env.port || 80;

import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";

Sentry.init({
    dsn: process.env.sentry_dsn,
    integrations: [
        nodeProfilingIntegration()
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0
})

import router from "./util/router";

app.use(cors<express.Request>({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use(session({
	secret: require("crypto").randomBytes(64).toString("hex"),
	resave: true,
	saveUninitialized: true
}))

app.use("/", router);

Sentry.setupExpressErrorHandler(app);

app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
})

import { exec } from "child_process";

// Automatic Git Pull
setInterval(() => {
    exec("git pull", (err: any, stdout: any) => {
        if(err) return console.log(err);
        if(stdout.includes("Already up to date.")) return;

        console.log(stdout);
        process.exit();
    })
}, 30 * 1000) // 30 seconds
