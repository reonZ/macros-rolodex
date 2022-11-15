import { getSetting } from './utils/foundry.js'

/** @param {{macroId: string, userId: string}} packet */
export async function setMacroFolder({ macroId, userId }) {
    const user = game.users.get(userId)
    if (!user) return

    const folderName = user.name.trim()
    const parentName = getSetting('players').trim() || null
    const folder = await getFolder(folderName, parentName)
    game.macros.get(macroId)?.update({ folder: folder.id })
}

/**
 * @param {string} folderName
 * @param {string | null} [parentName]
 */
export async function getFolder(folderName, parentName = null) {
    const depth = parentName ? 2 : 1
    const folders = ui.macros.folders

    let folder = folders.find(
        x => x.name === folderName && x.depth === depth && (!parentName || (x.folder && x.folder.name === parentName))
    )
    if (folder) return folder

    let parent = null
    if (parentName) {
        parent = folders.find(x => x.name === parentName && x.depth === 1)
        if (!parent) parent = await createFolder(parentName)
    }

    return createFolder(folderName, parent)
}

/**
 * @param {string} name
 * @param {Folder | null} [parent]
 */
function createFolder(name, parent = null) {
    return /** @type {Promise<Folder>} */ (
        Folder.create({
            type: 'Macro',
            name,
            parent,
        })
    )
}
