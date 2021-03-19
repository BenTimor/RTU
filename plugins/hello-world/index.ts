import { on } from "@/events";
import { Logger } from "@/logger";

/**
 * A plugin that all of its purpose is to be used for testing / hello world message
 */
class HelloWorld {
    @on("plugins:imported")
    static helloWorld() {
        Logger.debug("Hello World!");
    }
}
