import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MediaChange } from '@angular/flex-layout';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Country, keys } from '../models/model.contries';
import { WorldPopulationUtils } from '../utils/world.population.utils';
import { HeaderRename } from '../view-models/view-models';
import { AppMediaQueryService } from './../../../services/app.media-query.service';
import { WorldPopulationInitService } from './../services/world.population.init.service';

@Component({
    selector: 'world-table-view',
    templateUrl: './world.population.tableView.component.html',
    styleUrls: ['./world.population.tabbleView.component.scss']
})
export class WorldPopulationTableViewComponent implements OnInit, AfterViewInit {

    dataSource = new MatTableDataSource<Country>();

    keys: string[];

    config: HeaderRename[];

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    mediaQuery:Observable<MediaChange>;


    constructor(
        private worldPopulationInitService: WorldPopulationInitService,  
        private mediaObserver: AppMediaQueryService,         
        ) {
            
    }
    ngAfterViewInit(): void {
        throw new Error('Method not implemented.');
    }
    async ngOnInit(): Promise<void> {

        this.mediaQuery = this.mediaObserver.getMediaQuery();
        this.mediaQuery.subscribe((values)=> console.log("===", values))       
    
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
        return WorldPopulationUtils.getTotalPopulationByYear(value);
    }

}

