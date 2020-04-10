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

    public async * getCountryPopulation(name: string, yearProperty: string): AsyncIterableIterator<string> {

        const country: Country = this.countries.find((c: Country) => c.Country === name);
        yield country[yearProperty]

    }

}