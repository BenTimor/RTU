import { test } from "@/tests";
import axios from "axios";
import { assert } from "chai";
import { ExpressConfig } from "../config";

class ExpressTest {
    @test("Express - Ping Pong")
    static async pingTest() {
        const resp = await axios.get(`http://localhost:${ExpressConfig.PORT}/ping`);

        assert.equal(resp.status, 200);
        assert.equal(resp.data, "Pong!");
    }
}