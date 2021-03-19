import { Qeres } from "qeres";

export class RootAPI {
    @Qeres.data
    async ping() {
        return "Pong!";
    }
}