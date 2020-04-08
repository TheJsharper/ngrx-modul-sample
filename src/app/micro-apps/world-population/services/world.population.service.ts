import { Injectable } from "@angular/core";
import { WorldPopulationModule } from '../world.population.module';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Country } from '../models/model.contries';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable(/*{providedIn:WorldPopulationModule}*/)
export class WorldPopulationService
{
    constructor(private http:HttpClient){

    }
    getPopulation():Observable<Country[]>{
        return this.http.get<Country[]>("http://localhost:3000/").pipe(map((res:Country[])=> res));
    }
}