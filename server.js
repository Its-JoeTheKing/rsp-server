const { Server } = require("socket.io");
const cors = require("cors");
const http = require("http");
const httpServer = http.createServer();

const io = new Server(httpServer,{ 
    cors: {
        'origin': "*"
    }
 });
io.on("connection", (socket) => {
    socket.on("join-token",(data)=>{
        socket.join(data);
        console.log(socket.id + " Joined "+ data)
    })
    socket.on("action",(data,token)=>{
        socket.to(token).emit("reaction",data)
    })
});
io.listen(3000 || process.env.PORT);