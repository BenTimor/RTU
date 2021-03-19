import { Logger } from "../logger";

/**
 * Checks if all configuration places for the value we want to get by its key
 * @param key The key name of what we want to get
 * @param defaultValue The default value if this key isn't found
 */
function getConfigurable(key: string, defaultValue?: any) {
    const value = process.env[key] || defaultValue;
    if (value === undefined)
        Logger.warning(`No value is specified for '${key}'.`)
    return value;
}

/**
 * A decorator which turns a variable to configurable
 * @param processValue A function that allows you to process the returned value from the config
 */
export function configurable(processValue: (value: any) => any = () => { }) {
    return (target: any, key: string) => {
        let defaultValue = target[key];

        Object.defineProperty(target, key, {
            get: () => {
                const configValue = getConfigurable(key, defaultValue);
                return processValue(configValue) || configValue || defaultValue;
            },
            set: (v) => {
                defaultValue = v;
            }
        });
    }
}