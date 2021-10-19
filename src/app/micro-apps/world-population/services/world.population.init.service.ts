import { Injectable } from "@angular/core";
import { HeaderRename } from "../table/world.population.tableView.component";
import {  keys} from '../models/model.contries';

@Injectable()
export class WorldPopulationInitService{
    private keys:string[];

    constructor(){ this.keys = keys}

    public getConfig(): HeaderRename[] {
        const result: HeaderRename[] = this.keys.reduce((prev: HeaderRename[], cur: string) => {
            const newObject: HeaderRename = {
                property: cur,
                name: cur.includes("_") ? cur.split("_")[1] : cur
            };
            prev.push(newObject);
            return prev;
        }, []);
        result.push({ property: "star", name: "star" });
        return result;
    }
}