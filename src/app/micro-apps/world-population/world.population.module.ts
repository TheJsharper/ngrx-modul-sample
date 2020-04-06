import { NgModule } from "@angular/core";
import { WorldPopulationTableViewComponent } from './table/world.population.tableView.component';
import { WorldPopulationRouting } from './world.population-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [WorldPopulationTableViewComponent],
    imports: [WorldPopulationRouting, RouterModule],
    exports: [RouterModule, WorldPopulationTableViewComponent]
})
export class WorldPopulationModule { }