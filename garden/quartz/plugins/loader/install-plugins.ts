import { regeneratePluginIndex } from "./gitLoader.js"
regeneratePluginIndex({ verbose: true }).catch(console.error)
