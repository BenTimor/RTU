import { EventHandler, on } from "@/events";
import { Logger } from "@/logger";
import express from "express";
import { ExpressConfig } from "./config";

class ExpressRouter {
    @on("plugins:imported")
    static async loadServer() {
        Logger.debug("Loading Express router")
        const app = express();
        app.use(express.json());

        app.get("/ping", async (_req, res) => {
            res.status(200).end("Pong!");
        });

        app.post("/", async (req, res) => {
            EventHandler.callEvent("data:in", req.body, res);
        });

        app.listen(ExpressConfig.PORT);
        Logger.debug(`Express router loaded and listening on http://localhost:${ExpressConfig.PORT}`);
    }
}