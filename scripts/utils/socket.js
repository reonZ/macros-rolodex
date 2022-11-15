import MODULE_ID from './module.js'

/** @param {(packet: any) => void} callback */
export function socketOn(callback) {
    game.socket.on(`module.${MODULE_ID}`, callback)
}

/** @param {any} packet */
export function socketEmit(packet) {
    game.socket.emit(`module.${MODULE_ID}`, packet)
}
