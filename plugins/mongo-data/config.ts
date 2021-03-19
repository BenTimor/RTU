import { configurable } from "@/configuration/config-handler";

export class MongoConfig {
    // The url with all the details to connect to the mongodb
    @configurable()
    static readonly CONNECTION_URL = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false"; // The path to the plugins folder
}