import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../models/model.contries';
import { WorldPopulationModule } from '../world.population.module';

@Injectable(/*{providedIn:WorldPopulationModule}*/)
export class WorldPopulationService {
    private socketClient: SocketIOClient.Socket;

    constructor(private http: HttpClient) {
        /*this.socketClient = io.connect('http://localhost:3000/streaming',{path:"/streaming"}).open();
        this.socketClient.on("stream", (payload)=>{
            this.socketClient.emit('hi!');
            console.log(payload);
        });
        this.socketClient.on("connect", () => {
            console.log("Connecting .... status", this.socketClient.id, this.socketClient.connected, this.socketClient, "timeout---->", this.socketClient.io.timeout());
            
          });
          this.socketClient.on("disconnect", () => {
            console.log("Disconnecting .... status", this.socketClient.id, this.socketClient.connected, this.socketClient, "timeout---->", this.socketClient.io.timeout());
           
          });*/
    }
    getPopulation(): Observable<Country[]> {
        return this.http.get<Country[]>("http://localhost:3000/").pipe(map((res) => res));
    }
}