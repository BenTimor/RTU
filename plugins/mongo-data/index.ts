import { EventHandler, on } from "@/events";
import { Logger } from "@/logger";
import { MongoClient } from "mongodb";
import { MongoConfig } from "./config";

/**
 * This plugin is used to manage the data which is saved to MongoDB
 */
class MongoData {
    private static connection;

    /**
     * Connecting to the mongo itself
     */
    @on("plugins:imported")
    static async connect() {
        Logger.debug("Trying to connect to MongoDB...");
        MongoData.connection = await MongoClient.connect(MongoConfig.CONNECTION_URL, { useUnifiedTopology: true });
        Logger.debug("MongoDB connected successfuly");
        EventHandler.callEvent("db:connected");
    }

    static getDatabase(dbName) {
        return MongoData.connection.db(dbName);
    }

    /**
     * Used to "insert" data
     */
    @on("db:set")
    static set(dbName, collection, obj) {
        return MongoData.getDatabase(dbName).collection(collection).insertOne(obj);
    }

    /**
     * Used to "find" data
     */
    @on("db:get")
    static get(dbName, collection, obj) {
        return MongoData.getDatabase(dbName).collection(collection).find(obj).toArray();
    }

    /**
     * Used to remove/delete data
     */
    @on("db:remove")
    static remove(dbName, collection, obj) {
        return MongoData.getDatabase(dbName).collection(collection).deleteMany(obj);
    }
}