import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import { Store } from '@ngrx/store';
import { CountryState } from '../store/reducers/country.reducers';
import { allCountryLoaded } from '../store/actions/country.actions';
@Injectable()

export class WorldPopulationChartsService {


  private socketClient: SocketIOClient.Socket;


  constructor(private store: Store<CountryState>) {



    this.socketClient = io.connect('http://localhost:3000/streaming', { path: "/streaming" }).open();

    this.socketClient.on("connect", () => {

      //this.getByCountry("Paraguay"); perfect UI paraguay from 1960 => 2019;
     // this.getByYear(1990);  all country from 1990
      this.getPopulation() 
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
      this.socketClient.on("responseByYear", (payload) => {
        console.log(payload);
        this.store.dispatch(allCountryLoaded({ countries: payload }))
        resolve();

      });

    });

  }

  public async getByCountry(name: string): Promise<void> {

    return new Promise<void>((resolve: () => void) => {
      const s = this.socketClient.emit("requestByCountry", { country: name });
      console.log("nsp--->", s.nsp);
      this.socketClient.on("responseByCountry", (payload) => {
        console.log(payload);
        this.store.dispatch(allCountryLoaded({ countries: payload }))
        resolve();

      });
    });



  }


  public async getPopulation(): Promise<void> {

    return new Promise<void>((resolve: () => void) => {
      const s = this.socketClient.emit("requestPopulation");
      console.log("nsp--->", s.nsp);
      this.socketClient.on("responsePopulation", (payload) => {
        console.log(payload);
        this.store.dispatch(allCountryLoaded({ countries: payload }))
        resolve();

      });
    });



  }


}