import { NgModule } from "@angular/core";
import { WorldPopulationChartsRoutingModule } from './world.population.charts-routing.module';
import { WorldPopulationChartViewComponent } from './charts/world.population.chartView.component';
import { WorldPopulationChartsService } from './services/world.population.charts.services';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { countryReducer } from './store/reducers/country.reducers';

@NgModule({

    declarations:[WorldPopulationChartViewComponent],
    imports:[WorldPopulationChartsRoutingModule, StoreModule.forFeature("countries", countryReducer)],
    exports:[RouterModule],
    providers:[WorldPopulationChartsService]
})
export class WorldPopulationChartsModule{}