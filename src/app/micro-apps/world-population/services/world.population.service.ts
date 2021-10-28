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
      
    }
    getPopulation(): Observable<Country[]> {
        return this.http.get<Country[]>("http://localhost:3000/").pipe(map((res) => res));
    }
}