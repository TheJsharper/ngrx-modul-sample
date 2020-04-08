import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Countries, keys, Country } from '../models/model.contries';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { WorldPopulationService } from '../services/world.population.service';

@Component({
    selector: 'world-table-view',
    templateUrl: './world.population.tableView.component.html',
    styleUrls: ['./world.population.tabbleView.component.scss']
})
export class WorldPopulationTableViewComponent implements OnInit {

    dataSource = new MatTableDataSource(Countries);
    keys: String[];
    key
    config: HeaderRename[];
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    constructor(private worldPopulationService:WorldPopulationService) {
        this.keys = keys;
        this.keys.push("star");
        this.config = this.getConfig();
        this.worldPopulationService.getPopulation().subscribe((c:Country[])=>  console.log(c));
    }
    ngOnInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }
    getValue(element: any, key: string): any {
        return element[key];
    }
    private getConfig(): HeaderRename[] {
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
                else{
                    console.log("--->",cur[value])
                }
            return prev;
        }, 0)
    }

}

export class HeaderRename {
    property: string;
    name: string;
}