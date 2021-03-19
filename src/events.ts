export namespace EventHandler {
    let events: { [key: string]: Function[] } = {};

    /**
     * A function which registers functions as "event", so you can call all of them later.
     * @param eventName The name of the event you want to register
     * @param eventFunction The function which is going to run when this event is called
     */
    export function registerEvent(eventName: string, eventFunction: Function) {
        if (!events[eventName]) {
            events[eventName] = [];
        }
        events[eventName].push(eventFunction);
    }

    /**
     * A function which calls events
     * @param eventName The name of the event you want to call
     * @param args The args you want to pass to the event functions
     */
    export async function callEvent(eventName: string, ...args): Promise<any[]> {
        let results: any[] = [];
        if (events[eventName]) {
            for (const func of events[eventName]) {
                results.push(await func.apply(undefined, args));
            }
        }
        return results;
    }
}

/**
 * A decorator which runs a function everytime an event is called
 * @param eventName The name of the event you want to call
 */
export function on(eventName) {
    return (_target, _key, descriptor: TypedPropertyDescriptor<any>) => {
        EventHandler.registerEvent(eventName, descriptor.value);
    }
}