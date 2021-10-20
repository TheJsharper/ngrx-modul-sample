import { ElementRef, Renderer2 } from "@angular/core";
import { Chart, ChartConfiguration } from "chart.js";


export class WorldPopulationChartsInit{

   public static create( renderer: Renderer2,  el: ElementRef,):Chart{
        const divElement: HTMLDivElement = renderer.createElement("div");
        const canvasElement: HTMLCanvasElement = renderer.createElement("canvas");

        renderer.appendChild(el.nativeElement, divElement);
        divElement.appendChild(canvasElement);

        const context:CanvasRenderingContext2D = canvasElement.getContext('2d');

        const confguration: ChartConfiguration = this.getChartConfiguration();

        return new Chart(context, confguration);
    }

    private static  getChartConfiguration(): ChartConfiguration {
        const labels:string[] = this.getLabels();
        const itemsOne:string = this.getBorderColor();
        const itemsTwo:string = this.getBorderColor();
        return {
            type: 'bar',
            
            data: {

                labels,
                datasets: [{ 
                    label:"Austria",
                    backgroundColor: Array(labels.length).fill(itemsOne),
                    data:[],
                    borderColor: Array(labels.length).fill(itemsOne)
                },
                 {
                label:"Germany", 
                backgroundColor:Array(labels.length).fill(itemsTwo),
                data:[],
                borderColor:Array(labels.length).fill(itemsTwo)
             }],
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
                },
                elements: {
                    point: {
                        backgroundColor: [`rgba(255,0, 0, 0.5)`],
                    }
                }
            }
        };
    }

    private static  getLabels(): string[] {
        const fullYears: string[] = new Array(60).fill(new Date(1960, 1, 1)).map((date: Date, index: number) => date.getFullYear() + index).map((value: number) => value.toString());
        return fullYears;

    }

    private static getRandomData(): number[] {
        return Array(2).fill(0).map((_: number) => Math.abs(Math.floor(Math.random() * 10_000_000)))

    }
    private static getBorderColor(): string {

       const  [red, green, blue] =Array(3).fill(0).map((_: number) => Math.abs(Math.floor(100 + Math.random() * (255 - 100))));
       return `rgba(${red}, ${green}, ${blue}, 0.5)`;
    }
}