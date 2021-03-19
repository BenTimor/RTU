import { Data } from "@/db";
import { test } from "@/tests";
import { assert } from "chai";

class MongoDataTest {
    @test("Mongo - Happy Flow")
    static async happyFlow() {
        const data = new Data("Dev", "tests");

        // Validating that you can't get key which does't exist
        assert.isEmpty(await data.get({
            KEY: 123
        }));

        // Inserting something
        await data.set({
            KEY: 123,
            Somelist: [
                "A",
                "B",
                "C"
            ],
            AnotherKey: 321
        });

        // Checking that it exists like it should
        assert.isNotEmpty(await data.get({
            KEY: 123
        }));
        assert.isNotEmpty(await data.get({
            AnotherKey: 321
        }));
        assert.isEmpty(await data.get({
            AnotherKey: 123
        }));

        // Removing it
        await data.remove({
            KEY: 123
        });

        // Checking that it's removed
        assert.isEmpty(await data.get({
            KEY: 123
        }));
        assert.isEmpty(await data.get({
            AnotherKey: 321
        }));
    }
}