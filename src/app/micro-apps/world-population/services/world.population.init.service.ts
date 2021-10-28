import { Injectable } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table';
import { Country } from 'src/app/micro-apps/world-population/models/model.contries';
import { keys } from '../models/model.contries';
import { HeaderRename } from './../view-models/view-models';
import { WorldPopulationService } from './world.population.service';

@Injectable()
export class WorldPopulationInitService{
    private keys:string[];

    constructor(private worldPopulationService: WorldPopulationService,){ this.keys = keys}

    public getConfig(): HeaderRename[] {
        const result: HeaderRename[] = this.keys.reduce( this.getHeaderRenameCb(), []);
        result.push({ property: "star", name: "star" });
        return result;
    }
    private getHeaderRenameCb():(previousValue: HeaderRename[], currentValue: string) => HeaderRename[]{
     
        const cb = (prev: HeaderRename[], cur: string) => {
            const newObject: HeaderRename = {
                property: cur,
                name: cur.includes("_") ? cur.split("_")[1] : cur
            };
            prev.push(newObject);
            return prev;
        }
        return cb;
    }

    public async getMatTableDataSource(sort: MatSort, paginator: MatPaginator):Promise<MatTableDataSource<Country>>{

        const source:Country[] = await this.worldPopulationService.getPopulation().toPromise();
        const tableDataSource: MatTableDataSource<Country>=  new MatTableDataSource<Country>(source);
        tableDataSource.sort= sort;
        tableDataSource.paginator = paginator;
        return tableDataSource;
    }

}