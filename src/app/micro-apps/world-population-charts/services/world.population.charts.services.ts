import { allByCountryEntities } from './../store/actions/country.actions';
import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import * as io from 'socket.io-client';
import { CountryPropertries } from '../models/app.store.country';
import { allByCountry, allByPopulation, allByYear } from '../store/actions/country.actions';
import { CountryState } from '../store/reducers/country.reducers';
@Injectable()

export class WorldPopulationChartsService {


  private socketClient: SocketIOClient.Socket;


  constructor(private store: Store<CountryState>) {



    this.socketClient = io.connect('http://localhost:3000/streaming', { path: "/streaming" }).open();

    this.socketClient.on("connect", () => {

      this.getByCountry("Paraguay");
      this.getByCountry("Bolivia");
      this.getByYear(2000);
     // this.getPopulation();
      console.log("Connecting .... status", this.socketClient.id, this.socketClient.connected, this.socketClient, "timeout---->", this.socketClient.io.timeout());

    });


    this.socketClient.on("disconnect", () => {


      console.log("Disconnecting .... status", this.socketClient.id, this.socketClient.connected, this.socketClient, "timeout---->", this.socketClient.io.timeout());

    });
  }
  public connect(): void {
    console.log("connected");
  }

  public async getByYear(year: number): Promise<void> {

    return new Promise<void>((resolve: () => void) => {

      const s = this.socketClient.emit("requestByYear", { year: year });
      console.log("nsp--->", s.nsp);
      this.socketClient.on("responseByYear", (payload: CountryPropertries) => {
        this.store.dispatch(allByYear({ countryProperties:payload }));
        
        resolve();

      });

    });

  }

  public async getByCountry(name: string): Promise<void> {

    return new Promise<void>((resolve: () => void) => {
      const s = this.socketClient.emit("requestByCountry", { country: name });
      console.log("nsp--->", s.nsp);
      this.socketClient.on("responseByCountry", (payload: CountryPropertries) => {
      
        this.store.dispatch(allByCountry({ countryProperties:payload} ));
        this.store.dispatch(allByCountryEntities({ countryProperties:payload}))
        resolve();

      });
    });



  }


  public async getPopulation(): Promise<void> {

    return new Promise<void>((resolve: () => void) => {
      const s = this.socketClient.emit("requestPopulation");
      console.log("nsp--->", s.nsp);
      this.socketClient.on("responsePopulation", (payload: CountryPropertries) => {
        this.store.dispatch(allByPopulation({ countryProperties:payload}))
        resolve();

      });
    });



  }


}