import { WorldPopulationInitService } from './../services/world.population.init.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Countries, keys, Country } from '../models/model.contries';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { WorldPopulationService } from '../services/world.population.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'world-table-view',
    templateUrl: './world.population.tableView.component.html',
    styleUrls: ['./world.population.tabbleView.component.scss']
})
export class WorldPopulationTableViewComponent implements OnInit {

    dataSource = new MatTableDataSource();

    keys: string[];

    config: HeaderRename[];

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


    constructor(
        private worldPopulationService: WorldPopulationService,
        private worldPopulationInitService: WorldPopulationInitService        
        ) {

    }
    async ngOnInit(): Promise<void> {

        this.keys = keys;

        this.keys.push("star");

        this.config = this.worldPopulationInitService.getConfig();

        const countries: Promise<Country[]> = this.worldPopulationService.getPopulation().toPromise<Country[]>();

        this.dataSource.data = await countries;

        this.dataSource.sort = this.sort;

        this.dataSource.paginator = this.paginator;

    }
    getValue(element: any, key: string): any {
        return element[key];
    }
   
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    isYear(value: any): boolean {

        if (!isNaN(value)) {
            const n: number = parseInt(value);
            return n >= 1960;
        } else {
            return false;
        }
    }
    getTotal(value: string): number {
        return Countries.reduce((prev: number, cur, ) => {

            if (!isNaN(parseInt(cur[value])))
                prev += parseInt(cur[value]);
            
            return prev;
        }, 0)
    }

}

export class HeaderRename {
    property: string;
    name: string;
}