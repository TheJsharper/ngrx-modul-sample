export interface AppStoreCountry {
    /*country: string,
    year: string,
    value: string*/
    byYear: CountryPropertries;
    byCountry: CountryPropertries;
    byPopulation: CountryPropertries;
}
export interface CountryPropertries {
    country: string,
    year: string,
    value: string
}