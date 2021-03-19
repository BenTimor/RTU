export namespace Logger {
    /**
     * Used to log something with prefix
     * @param prefix The prefix which should be found before the printed value intself
     * @param color The color of the prefix by ANSI colors (https://telepathy.freedesktop.org/doc/telepathy-glib/telepathy-glib-debug-ansi.html)
     * @param values The value/values we want to print
     */
    function log(prefix, color, ...values) {
        for (const v of values) {
            let value;
            try {
                value = typeof(v) === "object" ? JSON.stringify(v) : v;
            } catch (_) {
                value = v;
            }

            // All the weird codes just saying: "BOLD, COLOR, PREFIX, RESET, VALUE"
            console.log(`\x1b[1m${color}[${prefix}]\x1b[0m ${value}`);
        }
    }

    export function debug(...value) {
        log("DEBUG", "\x1b[36m", ...value);
    }

    export function warning(...value) {
        log("WARNING", "\x1b[33m", ...value);
    }

    export function error(...value) {
        log("ERROR", "\x1b[31m", ...value);
    }

    export function testSuccess(...value) {
        log("TEST", "\x1b[32m", ...value);
    }

    export function testFailure(...value) {
        log("TEST", "\x1b[31m", ...value);
    }
}