// Every plugin must have tests, Putting it here so the plugin loader won't complain

import { test } from "@/tests";

class HelloWorldTest {
    @test("HelloWorld test - The tests are running! :)")
    static helloTest() {
    }
}