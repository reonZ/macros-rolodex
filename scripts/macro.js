import { getFolder } from './folders.js'
import { getSetting } from './utils/foundry.js'
import { socketEmit } from './utils/socket.js'

/** @type {libWrapper.RegisterFunction} */
export async function onCreateMacro(wrapped, ...args) {
    const result = /** @type {Macro[] | Macro | undefined} */ (await wrapped(...args))
    const macro = Array.isArray(result) ? result[0] : result
    if (!macro) return result

    if (game.user.isGM) {
        if (macro.folder) return result

        const folderName = getSetting('gamemaster').trim()
        if (!folderName) return result

        const folder = await getFolder(folderName)
        macro.update({ folder: folder.id })
    } else {
        socketEmit({ macroId: macro.id, userId: game.user.id })
    }

    return result
}
