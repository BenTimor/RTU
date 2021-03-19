import { join, resolve } from "path";
import { readdirSync } from "fs";
import { Logger } from "@/logger";
import { Config } from "@/configuration";

type Plugin = {
    name: string,
    index: string,
    module: any
};

export namespace PluginLoader {
    let plugins: Plugin[] = [];

    /**
     * This function is used to load plugins into the backend.
     * @param name The name of the plugin (Usually it's the name of the folder)
     * @param dir The directory which the plugin is found in (root folder)
     * @param index The index file of the plugin
     */
    async function importPlugin(name: string, dir: string, mainFiles: string[] = ["index.ts", "index.js"]) {
        // Trying to figure out what main file we have there
        for (const file of mainFiles) {
            const pluginPath = join(dir, file);

            // After importing the plugin, we want to save it to the plugins array
            // We're using it 
            try {
                const module = await import(pluginPath);
                plugins.push({
                    name: name,
                    index: pluginPath,
                    module: module
                })
                return;
            } catch (err) {
                if (Config.SHOW_PLUGINS_ERRORS) console.log(err);
            }
        }

        Logger.warning(`The plugin ${name} failed to load.`);
    }

    function getSubDirectories(dir: string): string[] {
        return readdirSync(dir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
    }

    /**
     * Import all folders as plugins from a directory
     * @param dir The directory which contains all the plugins folders
     */
    export async function importPlugins(dir: string) {
        for (const subDir of getSubDirectories(dir)) {
            await importPlugin(subDir, resolve(join(dir, subDir)));
        }
    }

    export async function importTests(dir: string) {
        for (const subDir of getSubDirectories(dir)) {
            await importPlugin(`[TEST] ${subDir}`, resolve(join(dir, subDir, "test")));
        }
    }
}