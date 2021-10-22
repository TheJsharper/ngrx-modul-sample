import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { select, Store } from '@ngrx/store';
import * as Chart from 'chart.js';
import { CountryPropertries } from '../models/app.store.country';
import { ChartSeriesParameter } from "../models/world.chart.view.model";
import { WorldPopulationChartsNextSeries } from '../services/world.population.charts.next.series';
import { WorldPopulationChartsService } from '../services/world.population.charts.services';
import { CountryState } from '../store/reducers/country.reducers';
import { selectAppStoreCountryByCountry,selectAppStoreEntitiesCountryByCountry, selectAppStoreCountryByPopulation, selectAppStoreCountryByYear } from '../store/selectors/country.selectors';
import { WorldPopulationChartsInit } from '../utilities/world.population.charts.init';

@Component({
    selector: 'charts-view',
    templateUrl: './world.population.chartView.component.html',
    styleUrls: ['world.population.chartView.component.scss']
})

export class WorldPopulationChartViewComponent implements OnInit, OnDestroy {



    private chart: Chart;
    private timeoutRef: number[];
    private rqAnimationFrameRefs:number[];

    constructor(
        private renderer: Renderer2, 
        private el: ElementRef,
        private worldPopulationChartsService: WorldPopulationChartsService,
        private worldPopulationChartsNextSeries:WorldPopulationChartsNextSeries,
        private store: Store<CountryState>) {
            
        this.worldPopulationChartsService.connect();

        this.store.pipe(select(selectAppStoreCountryByCountry)).subscribe((value: CountryPropertries) => console.log("FROM STORE BY COUNTRY", value));

        this.store.pipe(select(selectAppStoreCountryByYear)).subscribe((value: CountryPropertries) => console.log("FROM STORE BY YEAR", value));

        this.store.pipe(select(selectAppStoreCountryByPopulation)).subscribe((value: CountryPropertries) => console.log("FROM STORE BY POPULATION", value));

        
        this.store.pipe(select(selectAppStoreEntitiesCountryByCountry)).subscribe((value:{[key:string] :CountryPropertries[]}) => console.log("FROM STORE BY ENTITIES", value));


    }
    public ngOnInit(): void {
        this.timeoutRef = [];
        this.rqAnimationFrameRefs = [];
        this.createCanvas();

    }


    private createCanvas(): void {        
        this.chart = WorldPopulationChartsInit.create(this.renderer, this.el);
        const chartSeriesParameters : ChartSeriesParameter = {chart:this.chart, timeoutRef:this.timeoutRef, requestAnimationFrame: this.rqAnimationFrameRefs, next:0};
        this.worldPopulationChartsNextSeries.update(chartSeriesParameters);

    }      


    public ngOnDestroy(): void {
        this.chart.destroy();
        this.timeoutRef.forEach((ref: any) => clearTimeout(ref));
        this.rqAnimationFrameRefs.forEach((ref:number)=> cancelAnimationFrame(ref));
    }
}
