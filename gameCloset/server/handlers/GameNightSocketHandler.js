/* eslint-disable indent */
import { SocketHandler } from '../utils/SocketHandler'

export class GameNightSocketHandler extends SocketHandler {
    /**
                 * @param {import("socket.io").Server} io
                 * @param {import("socket.io").Socket} socket
                 */
    constructor(io, socket) {
        super(io, socket)
        this
            .on('Join_Room', this.joinRoom)
    }

    joinRoom(roomName) {
        this.socket.join(roomName)
    }
}
