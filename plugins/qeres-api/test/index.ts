import { Config } from "@/configuration";
import { test } from "@/tests";
import { assert } from "chai";
import { Qeres } from "qeres";
import { RootAPI } from "../api/root";

class QeresTest {
    @test("Qeres ping request")
    static async qeresPing() {
        const qeres = new Qeres(new RootAPI());

        const resp = await qeres.handleRequest({
            ping: "ping()"
        });

        assert.equal(resp.ping, "Pong!");
    }
}