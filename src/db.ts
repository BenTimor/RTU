import { Config } from "@/configuration";
import { EventHandler } from "@/events";

export class Data {
    constructor(private readonly dbName: string = Config.DEFAULT_DB_NAME, private readonly collection: string = Config.DEFAULT_DB_NAME) { }

    /**
     * Returning the original result from the EventHandler for 'get' event.
     * @param obj The obj/query you want to get
     */
    getOriginal(obj: any) {
        return EventHandler.callEvent("db:get", this.dbName, this.collection, obj);
    }

    /**
     * Returning the first element from the getOriginal result
     * @param obj The obj/query you want to get
     */
    async get(obj: any): Promise<any> {
        return await (await this.getOriginal(obj))[0];
    }

    /**
     * Returning the original result from the EventHandler for 'set' event.
     * @param obj The obj/query you want to set
     */
    setOriginal(obj: any) {
        return EventHandler.callEvent("db:set", this.dbName, this.collection, obj);
    }

    /**
     * Returning the first element from the setOriginal result
     * @param obj The obj/query you want to set
     */
    async set(obj: any): Promise<any> {
        return await (await this.setOriginal(obj))[0];
    }

    /**
     * Returning the original result from the EventHandler for 'remove' event.
     * @param obj The obj/query you want to remove
     */
    removeOriginal(obj: any) {
        return EventHandler.callEvent("db:remove", this.dbName, this.collection, obj);
    }

    /**
     * Returning the first element from the removeOriginal result
     * @param obj The obj/query you want to remove
     */
    async remove(obj: any): Promise<any> {
        return await (await this.removeOriginal(obj))[0];
    }
}
