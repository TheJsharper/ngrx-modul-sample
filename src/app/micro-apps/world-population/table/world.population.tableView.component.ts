import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Countries, keys } from '../models/model.contries';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'world-table-view',
    templateUrl: './world.population.tableView.component.html',
    styleUrls:['./world.population.tabbleView.component.scss']
})
export class WorldPopulationTableViewComponent implements OnInit {

    dataSource = new MatTableDataSource(Countries);
    keys: String[];
    config: HeaderRename[];
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    constructor() {
        this.keys = keys;
        this.keys.push("star");
        this.config = this.getConfig();
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

}

export class HeaderRename {
    property: string;
    name: string;
}