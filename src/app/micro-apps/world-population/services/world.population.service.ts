import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../models/model.contries';
import * as io from 'socket.io-client';
import { isPlatformBrowser } from '@angular/common';

@Injectable(/*{providedIn:WorldPopulationModule}*/)
export class WorldPopulationService {
    private socketClient: SocketIOClient.Socket;

    constructor(private http: HttpClient) {
        this.socketClient = io.connect('http://localhost:3000/',{path:"/streaming"});
        this.socketClient.on("a message", (payload)=>{
            this.socketClient.emit('hi!');
            console.log(payload);
        });
    }
    getPopulation(): Observable<Country[]> {
        return this.http.get<Country[]>("http://localhost:3000/").pipe(map((res) => res));
    }
}