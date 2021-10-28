import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Countries, Country, keys } from '../models/model.contries';
import { WorldPopulationService } from '../services/world.population.service';
import { WorldPopulationUtils } from '../utils/world.population.utils';
import { HeaderRename } from '../view-models/view-models';
import { WorldPopulationInitService } from './../services/world.population.init.service';

@Component({
    selector: 'world-table-view',
    templateUrl: './world.population.tableView.component.html',
    styleUrls: ['./world.population.tabbleView.component.scss']
})
export class WorldPopulationTableViewComponent implements OnInit {

    dataSource = new MatTableDataSource<Country>();

    keys: string[];

    config: HeaderRename[];

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


    constructor(
        private worldPopulationInitService: WorldPopulationInitService        
        ) {

    }
    async ngOnInit(): Promise<void> {

        this.keys = keys;

        this.keys.push("star");

        this.config = this.worldPopulationInitService.getConfig();
       
        this.dataSource = await this.worldPopulationInitService.getMatTableDataSource(this.sort, this.paginator);


    }
    getValue(element: Country, key: string): string {
        return element[key];
    }
   
    applyFilter(event: Event):void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    isYear(value: any): boolean {
       
        return WorldPopulationUtils.isYear(value);
    }
    getTotal(value: string): number {
        /*return Countries.reduce((prev: number, cur:Country, ) => {

            if (!isNaN(parseInt(cur[value])))
                prev += parseInt(cur[value]);
            
            return prev;
        }, 0)*/
        return WorldPopulationUtils.getTotalPopulationByYear(value);
    }

}

