import { setMacroFolder } from './folders.js'
import { onCreateMacro } from './macro.js'
import { registerSetting } from './utils/foundry.js'
import { registerWrapper } from './utils/libwrapper.js'
import { socketOn } from './utils/socket.js'

const WRAPPER = 'Macro.createDocuments'

Hooks.once('init', async () => {
    registerSetting({
        name: 'gamemaster',
        config: true,
        type: String,
        default: 'Gamemaster',
    })

    registerSetting({
        name: 'players',
        config: true,
        type: String,
        default: 'Players',
    })
})

Hooks.once('libWrapper.Ready', () => {
    registerWrapper(WRAPPER, onCreateMacro)
})

Hooks.once('ready', () => {
    if (!game.user.isGM) return
    socketOn(setMacroFolder)
})
