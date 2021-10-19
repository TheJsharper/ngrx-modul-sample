import { NgModule } from "@angular/core";
import { WorldPopulationChartsRoutingModule } from './world.population.charts-routing.module';
import { WorldPopulationChartViewComponent } from './charts/world.population.chartView.component';
import { WorldPopulationChartsService } from './services/world.population.charts.services';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { countryReducer } from './store/reducers/country.reducers';
import { WorldPopulationChartsNextSeries } from "./services/world.population.charts.next.series";

@NgModule({

    declarations:[WorldPopulationChartViewComponent],
    imports:[WorldPopulationChartsRoutingModule, StoreModule.forFeature("countries", countryReducer)],
    exports:[RouterModule],
    providers:[WorldPopulationChartsService, WorldPopulationChartsNextSeries]
})
export class WorldPopulationChartsModule{}