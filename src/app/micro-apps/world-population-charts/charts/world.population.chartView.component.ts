import { Component, ElementRef, OnInit, Renderer2 } from "@angular/core";
import * as Chart from 'chart.js';
import { ChartConfiguration } from 'chart.js';

@Component({
    selector: 'charts-view',
    templateUrl: './world.population.chartView.component.html',
    styleUrls: ['world.population.chartView.component.scss']
})

export class WorldPopulationChartViewComponent implements OnInit {



    private ctx: CanvasRenderingContext2D;
    chart;

    constructor(private renderer: Renderer2, private el: ElementRef) {

    }

    async ngOnInit(): Promise<void> {

        const div = this.renderer.createElement('div');
        const text = this.renderer.createText('A simple chart-line');

        this.renderer.appendChild(div, text);
        await this.createCanvas();

    }



    private async createCanvas(): Promise<void> {

        const div: HTMLDivElement = this.renderer.createElement("div");
        const chartCanvas: HTMLCanvasElement = this.renderer.createElement("canvas");

        this.renderer.appendChild(this.el.nativeElement, div);
        div.appendChild(chartCanvas);

        this.ctx = chartCanvas.getContext('2d');

        const dataCanvas: any = this.getData();
        this.chart = new Chart(this.ctx, {
            type: "line",
            data: dataCanvas, options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });


        this.renderer.appendChild(this.el.nativeElement, div)
    }

    private getData(): any {
        const data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };
        return data;
    }

    private getDataCanvas(): ChartConfiguration {
        return {
            type: 'line',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        };
    }
}