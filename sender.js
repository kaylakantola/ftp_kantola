const net = require("net");
const fs = require("fs");

let server, asyncStream = fs.createReadStream("./sender/wild_geese_mary_oliver.pdf");

server = net.createServer(socket => {
    socket.pipe(process.stdout);
    asyncStream.on("readable", function () {
        let data;
        while (data = this.read()) {
            socket.write(data);
        }
    })
    asyncStream.on("end", function(){
        socket.end();
    })
    socket.on("end", () => {
        server.close(() => { console.log("\nTransfer is done!") });
    })
})

server.listen(8000, '0.0.0.0');
