import { parseBoolean } from "@/utils/types";
import { configurable } from "./config-handler";

export class Config {
    @configurable()
    static readonly PLUGINS = "plugins"; // The path to the plugins folder

    // Returns the value as a boolean
    @configurable(parseBoolean)
    static readonly SHOW_PLUGINS_ERRORS = false; // Decides if it shows the errors from loading plugins

    @configurable()
    static readonly DEFAULT_DB_NAME = "RTU"; // The default name for the database

    @configurable(parseBoolean)
    static readonly RUN_TESTS = true;
}