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
const fileProvider = new FileProvider();

streaming.on("connect", async (socket: Socket) => {

    
    console.log("connecting someone", socket.id);


    socket.on("requestByYear", async (request: { year: number }) => {

        for await (const value of fileProvider.getPopulationByYear(request.year)) {
            console.log("--->", value);
            streaming.emit("responseByYear", value);
        }

    });


    socket.on("requestByCountry", async (request: { country: string }) => {

        for await (const value of fileProvider.getPopulationByCountry(request.country)) {
            console.log("--->", value);
            streaming.emit("responseByCountry", value);
        }

    });


    socket.on("requestPopulation", async () => {

        for await (const value of fileProvider.getCountryPopulation()) {
            console.log("--->", value);
            streaming.emit("responsePopulation", value);
        }

    });



});




