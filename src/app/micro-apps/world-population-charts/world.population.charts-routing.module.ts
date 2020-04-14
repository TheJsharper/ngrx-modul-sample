import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { WorldPopulationChartViewComponent } from './charts/world.population.chartView.component';

const worldPopulationChart: Routes = [{
    path:'',
    component: WorldPopulationChartViewComponent
}]

@NgModule({
    imports: [RouterModule.forChild(worldPopulationChart)],
    exports: [RouterModule]
})
export class WorldPopulationChartsRoutingModule{}