import { Countries, Country } from "../models/model.contries";

export class WorldPopulationUtils{

    public static isYear(value: any): boolean {

        if (!this.isNumber(value)) {
            const currentYear: number = parseInt(value);
            return currentYear >= 1960;
        } 
        return false;
    }
    public static  getTotalPopulationByYear(value: string): number {
         const result:number = Countries.reduce((totalPopulaton: number, country:Country, ) => {

            if (this.isNumber(parseInt(country[value])))
            totalPopulaton += parseInt(country[value]);
            
            return totalPopulaton;
        }, 0);
        return result;
    }
    private static isNumber(value:number|string| any):value is number{
        return !isNaN(value) && typeof value === 'number';
    }
}