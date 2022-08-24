const socketController = (io, socket) => {
    socket.on("updateNotes", () => {
        socket.broadcast.emit("refreshNotes")
    })
    socket.on("updateCategories", () => {
        socket.broadcast.emit("refreshCategories")
    })
}

export default socketController;