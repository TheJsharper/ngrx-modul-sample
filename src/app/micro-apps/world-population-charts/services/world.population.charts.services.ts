import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import { Store } from '@ngrx/store';
import { CountryState } from '../store/reducers/country.reducers';
import { allCountryLoaded } from '../store/actions/country.actions';
@Injectable()

export class WorldPopulationChartsService{
    private socketClient: SocketIOClient.Socket;
     constructor(private store:Store<CountryState>){
        this.socketClient = io.connect('http://localhost:3000/streaming',{path:"/streaming"}).open();
        this.socketClient.on("stream", (payload)=>{
            this.socketClient.emit('hi!');
            console.log(payload);
            this.store.dispatch(allCountryLoaded({countries:payload}))
            
        });
        this.socketClient.on("connect", () => {
            console.log("Connecting .... status", this.socketClient.id, this.socketClient.connected, this.socketClient, "timeout---->", this.socketClient.io.timeout());
            
          });
          this.socketClient.on("disconnect", () => {
            console.log("Disconnecting .... status", this.socketClient.id, this.socketClient.connected, this.socketClient, "timeout---->", this.socketClient.io.timeout());
           
          });
     }
     public connect():void{
         console.log("connected");
     }
}