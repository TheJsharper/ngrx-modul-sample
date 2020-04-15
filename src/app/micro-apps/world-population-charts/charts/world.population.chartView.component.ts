import { Component, ElementRef, OnInit, Renderer2, OnDestroy } from "@angular/core";
import * as Chart from 'chart.js';
import { ChartConfiguration, ChartDataSets } from 'chart.js';

@Component({
    selector: 'charts-view',
    templateUrl: './world.population.chartView.component.html',
    styleUrls: ['world.population.chartView.component.scss']
})

export class WorldPopulationChartViewComponent implements OnInit, OnDestroy {



    private ctx: CanvasRenderingContext2D;
    private chart: Chart;
    private timeoutRef: any[];

    constructor(private renderer: Renderer2, private el: ElementRef) {

    }


    async ngOnInit(): Promise<void> {
        this.timeoutRef = [];
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

        const dataCanvas: any = this.getDataCanvas();
        this.chart = new Chart(this.ctx, dataCanvas);


        this.renderer.appendChild(this.el.nativeElement, div);
        this.update(0);

    }

    private update(next: number): void {
        if (next < 2) {
            this.timeoutRef.push(setTimeout(() => {
                window.requestAnimationFrame((f: number) => {
                    const colors: string[] = this.getBorderColors();
                    const background: string[] = [`rgba(255, 255, 2555, 0.0)`]

                    this.chart.data.datasets.push({ label: 'of votes ' + next, data: this.getRandomData(), borderColor: colors, backgroundColor: background, borderWidth: 5 });
                    next++;
                    this.chart.update();
                    this.update(next);
                });
            }, 1000));

        } else if (next >= 2 && next <= 100) {

            this.timeoutRef.push(setTimeout(() => {
                window.requestAnimationFrame((f: number) => {
                    this.chart.data.datasets.forEach((val: ChartDataSets) => val.data.push(this.getNextData()));

                    next++;
                    this.chart.update();
                    this.update(next);
                });
            }, 1000));




        }

    }
    private getRandomData(): number[] {
        return Array(2).fill(0).map((_: number) => Math.abs(Math.floor(Math.random() * 20)))

    }
    private getNextData(): number {
        return Math.abs(Math.floor(Math.random() * 20));
    }

    private getBorderColors(): string[] {

        const next: number[] = Array(3).fill(0).map((_: number) => Math.abs(Math.floor(100 + Math.random() * (255 - 100))));
        return [`rgba(${next[0]}, ${next[1]}, ${next[2]}, 0.5)`];
    }

    private getLabels(): string[] {
        const fullYears: string[] = new Array(60).fill(new Date(1960, 1, 1)).map((date: Date, index: number) => date.getFullYear() + index).map((value: number) => value.toString());
        return fullYears;

    }
    private getDataCanvas(): ChartConfiguration {
        return {
            type: 'line',
            data: {
                labels: this.getLabels(),
                datasets: []
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                animation: {
                    duration: 1500,
                    animateRotate: true,
                    easing: "linear"
                }
            }
        };
    }


    ngOnDestroy(): void {
        this.chart.destroy();
        this.timeoutRef.forEach((ref: any) => clearTimeout(ref));
    }
}