import { readFileSync } from 'fs';
import { Country } from 'src/app/micro-apps/world-population/models/model.contries';

export class FileProvider {

    private countries: Country[];

    private yearProperties: string[];

    private countryNames: string[];



    public get CountryNames(): string[] {
        return this.countryNames;
    }

    public get YearProperties(): string[] {
        return this.yearProperties;
    }

    constructor() {
        const jsonData: string = readFileSync(__dirname + "/db.json", { encoding: "utf8" });

        this.countries = JSON.parse(jsonData).Countries;

        this.yearProperties = Object.keys(this.countries[0]).filter((key: string) => key.startsWith("Year_"));

        this.countryNames = this.countries.map((country: Country) => country.Country);


    }

    public async * getCountryPopulation(): AsyncGenerator<{ country: string, year: string, value: string }> {

        const timeoutRef: any[] = [];
        for (const cn of this.CountryNames) {
            for (const yp of this.YearProperties) {
                const country: Country = this.countries.find((c: Country) => c.Country === cn);
                if (!country || country == undefined || country == null) {
                    console.log("empty")
                } else {
                    yield await new Promise<{ country: string, year: string, value: string }>((resolve: (value: { country: string, year: string, value: string }) => void) => {

                        timeoutRef.push(setTimeout(() => resolve({ country: cn, year: yp, value: country[yp] }), 1000));
                    })
                }
            }
        }
        timeoutRef.forEach((sub: NodeJS.Timeout) => { console.log("--->", sub, sub.hasRef); clearTimeout(sub); })

    }

    public async * getPopulationByCountry(name: string): AsyncIterableIterator<{ country: string, year: string, value: string }> {

        const timeoutRef: any[] = [];
        for (const yp of this.YearProperties) {
            const country: Country = this.countries.find((c: Country) => c.Country === name);
            if (!country || country == undefined || country == null) {
                console.log("empty")
            } else {
                yield await new Promise<{ country: string, year: string, value: string }>((resolve: (value: { country: string, year: string, value: string }) => void) => {

                    timeoutRef.push(setTimeout(() => resolve({ country: name, year: yp, value: country[yp] }), 1000));
                })
            }

        }
        timeoutRef.forEach((sub: NodeJS.Timeout) => { console.log("subscriptiosn--->", timeoutRef.length, sub); clearTimeout(sub); })

    }

    public async * getPopulationByYear(year: number): AsyncIterableIterator<{ country: string, year: string, value: string }> {

        const timeoutRef: any[] = [];
        const yearProperty: string = `Year_${year}`;
        for (const cn of this.CountryNames) {
            const country: Country = this.countries.find((c: Country) => c.Country === cn);
            if (!country || country == undefined || country == null) {
                console.log("empty")
            } else {
                yield await new Promise<{ country: string, year: string, value: string }>((resolve: (value: { country: string, year: string, value: string }) => void) => {

                    timeoutRef.push(setTimeout(() => resolve({ country: cn, year: yearProperty, value: country[yearProperty] }), 1000));
                })
            }

        }
        timeoutRef.forEach((sub: NodeJS.Timeout) => { console.log("--->", sub, sub.hasRef); clearTimeout(sub); })


    }



}


