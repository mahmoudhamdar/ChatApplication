const {createServer} = require("http");
const {Server} = require("socket.io");


const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:3001"]
    },
});



let messages = [];

io.on("connection", (socket) => {

    console.log("socket connected")


    socket.on("messageReceive", (data) => {
        messages.push(data);
        emit()

    })

});

function emit() {
    io.emit("messageSend", messages)
    messages = []
}


httpServer.listen(4000, () => {
    console.log("Server is running!");
});
