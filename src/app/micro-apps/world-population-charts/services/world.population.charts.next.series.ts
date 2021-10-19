import { ChartSeriesParameter } from './../models/world.chart.view.model';

import { Injectable } from "@angular/core";
import { ChartDataSets } from "chart.js";

@Injectable()

export class WorldPopulationChartsNextSeries{

    private framePs:number;

    constructor(){ this.framePs = 1000;}

    public  update(chartSeriesParameters : ChartSeriesParameter): void {
        const labelsLength:number = chartSeriesParameters.chart.data.labels.length;
        if(chartSeriesParameters.next  < labelsLength){
        chartSeriesParameters.timeoutRef.push(
            setTimeout(() =>
            chartSeriesParameters.requestAnimationFrame.push(
            window.requestAnimationFrame((f: number) => this.requestAnimationHandler(chartSeriesParameters) ), this.framePs)));
        }
       

    }
    private requestAnimationHandler(chartSeriesParameters:ChartSeriesParameter):void{
        const chart:Chart = chartSeriesParameters.chart;

        chart.data.datasets.forEach((chartDataSets: ChartDataSets) => this.updateSeries(chartSeriesParameters, chartDataSets));

        chartSeriesParameters.next++;

        this.update(chartSeriesParameters);
    }

    private updateSeries(chartSeriesParameters:ChartSeriesParameter, chartDataSets:ChartDataSets):void{
        chartDataSets.data.push(this.getNextData());
        chartSeriesParameters.chart.update();
       // console.log("-----X Rendering", chartDataSets.backgroundColor);
    }
    private getNextData(): number {
        return Math.abs(Math.floor(Math.random() * 10_000_000));
    } 

}