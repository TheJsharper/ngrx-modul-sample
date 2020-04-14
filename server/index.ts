/**/
import * as express from 'express';
import { Express } from 'express';
import { readFileSync } from 'fs';
import { createServer, RequestOptions } from 'http';
import * as io from 'socket.io';
import { Namespace, Socket } from 'socket.io';
import { FileProvider } from './file.provider';





const app: Express = express();

const op/**/: RequestOptions = { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Request-Method': '*', 'Access-Control-Allow-Methods': ':', 'Access-Control-Allow-Headers': '*' } }
const httpServer = /**/createServer(app); //new Server(app);

const socket = io(httpServer, { origins: ["http://127.0.0.1:4200", "*:*", "http://localhost:3000"], path: "/streaming", /*transports:['WebSocket', 'Flash Socket', 'AJAX long-polling'],*/ });
//socket.origins("http://localhost:4200/streaming");

app.get("/", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    const jsonData: string = readFileSync(__dirname + "/db.json", { encoding: "utf8" });
    res.json(JSON.parse(jsonData).Countries);
})

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`)
});
const streaming: Namespace = socket.of("/streaming");


streaming.on("connection", async (socket: Socket) => {
    console.log("connecting someone", socket.id);

    const fileProvider = new FileProvider();

    for await (const value of fileProvider.getPopulationByYear(1960)) {
        console.log("--->", value);
        streaming.emit("stream", value);
    }

});


