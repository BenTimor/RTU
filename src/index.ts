import "module-alias/register"; // Registers our custom import paths (i.e. @/logger)
import { PluginLoader } from "@/plugin-loader";
import { EventHandler, on } from "@/events";
import { Config } from "./configuration";

class Main {
    @on("start")
    async main() {
        // Loading plugins
        await PluginLoader.importPlugins(Config.PLUGINS);

        // Setupping plugins
        await EventHandler.callEvent("plugins:imported");

        // Loading tests
        await PluginLoader.importTests(Config.PLUGINS);

        // Setupping tests
        await EventHandler.callEvent("tests:imported");

        // Loaded
        await EventHandler.callEvent("loaded");

    }
}

EventHandler.callEvent("start");