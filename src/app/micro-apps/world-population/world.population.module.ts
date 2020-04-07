import { NgModule } from "@angular/core";
import { WorldPopulationTableViewComponent } from './table/world.population.tableView.component';
import { WorldPopulationRouting } from './world.population-routing.module';
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from  "@angular/material/icon";
import { from } from 'rxjs';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [WorldPopulationTableViewComponent],
    imports: [WorldPopulationRouting, RouterModule, MatTableModule, MatIconModule, CommonModule],
    exports: [RouterModule, WorldPopulationTableViewComponent]
})
export class WorldPopulationModule { }