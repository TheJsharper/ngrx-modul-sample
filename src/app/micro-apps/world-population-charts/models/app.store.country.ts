export interface AppStoreCountry {
    byYear?: CountryPropertries;
    byCountry?: CountryPropertries;
    byPopulation?: CountryPropertries;
    countryEntities?: {[id:string]:CountryPropertries[]}
}
export interface CountryPropertries {
    country: string,
    year: string,
    value: string
}