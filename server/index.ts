/**/
import * as express from 'express';
import { Express } from 'express';

import { readFileSync } from 'fs';

import { Namespace, Socket } from 'socket.io';

import { Server, createServer, RequestOptions } from 'http';
import * as io from 'socket.io';
import { FileProvider } from './file.provider';
import { timeout } from 'rxjs/operators';


const app: Express = express();

const op/**/: RequestOptions = { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Request-Method': '*', 'Access-Control-Allow-Methods': ':', 'Access-Control-Allow-Headers': '*' } }
const httpServer = /**/createServer(app); //new Server(app);

const socket = io(httpServer, { origins: ["http://127.0.0.1:4200", "*:*", "http://localhost:3000"], path: "/streaming" });
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

const intervalRef:any[] = [];
streaming.on("connection",  async(socket: Socket) => {
    
    socket.emit('stream', {
        that: `only for wellcome this socket ${socket.id}`
        , '/streaming': 'will get'
    });
    console.log("connecting someone", socket.id);

    const fileProvider: FileProvider = new FileProvider();
    const countries: string[] = fileProvider.CountryNames;
    const yearProperties: string[] = fileProvider.YearProperties;
    for (const country of countries) {
        for (const yp of yearProperties) {
            for await (const value of fileProvider.getCountryPopulation(country, yp)) {
                intervalRef.push(setTimeout(()=>{
                    streaming.emit("stream", { country: country, year: yp, value:value });
                }, 1000));
                
                //console.log("--->", country, yp);
                console.log("--->", country, yp, value);
                
                
            }
          

        }
    }
  setTimeout(()=>{
    intervalRef.forEach(closing => clearTimeout(closing));
    console.log("interval", intervalRef.length, intervalRef.filter(f=> f["hasRef"]) );
  }, 1000* countries.length)
    


    streaming.emit('stream', {
        everyone: 'in'
        , '/streaming namespace': 'will get'
    });


});


