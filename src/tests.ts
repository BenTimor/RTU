import { Config } from "./configuration";
import { EventHandler } from "./events";
import { Logger } from "./logger";

export async function runTest(name: string, func: () => any) {
    if (!Config.RUN_TESTS) return;

    try {
        await func();
        Logger.testSuccess(`'${name}' was tested successfuly`);
    } catch (err) {
        Logger.testFailure(`'${name}' failed with an error:`);
        console.log(err);
    }
}

export function test(name: string) {
    return (_target, _key, descriptor: TypedPropertyDescriptor<any>) => {
        EventHandler.registerEvent("tests:imported", () => runTest(name, descriptor.value));
    }
}