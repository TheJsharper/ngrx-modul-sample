import { Component } from '@angular/core';
import { Countries, Country, keys } from '../models/model.contries';

@Component({
    selector: 'world-table-view',
    templateUrl: './world.population.tableView.component.html'
})
export class WorldPopulationTableViewComponent {

    dataSource: Country[] = Countries;
    keys: String[];
    config: HeaderRename[];
    constructor() {
        this.keys = keys;
        this.config = this.getConfig();
        //['name', 'position', 'weight', 'symbol', 'position', 'weight', 'symbol', 'star'];
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
        result.splice(5, 0, { property: "star", name: "" });
        //result.push({property:"star", name:""})
        console.log("--->", result);
        return result;
    }

}

export class HeaderRename {
    property: string;
    name: string;
}