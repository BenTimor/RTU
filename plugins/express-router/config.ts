import { configurable } from "@/configuration/config-handler";

export class ExpressConfig {
    @configurable()
    static readonly PORT=3000;
}