import { on } from "@/events";
import { Logger } from "@/logger";
import { Qeres } from "qeres";
import { RootAPI } from "./api/root";

class QeresAPI {
    static qeres: Qeres;

    @on("plugins:imported")
    static async qeresLoader() {
        QeresAPI.qeres = new Qeres(new RootAPI());
    }

    @on("data:in")
    static async handleRequest(req, res) {
        res.status(200).json(await QeresAPI.qeres.handleRequest(req)); // TODO: Disable hardcoded status and think about error handling
    }
}