import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AppStore } from 'src/app/micro-apps/store/reducers';
import { CountryPropertries } from '../../models/app.store.country';
import { CountryState } from '../reducers/country.reducers';

export const selectCountryState: MemoizedSelector<AppStore, CountryState> = createFeatureSelector<CountryState>("countries");


export const selectAppStoreCountryByCountry: MemoizedSelector<CountryState, CountryPropertries> = createSelector(
    selectCountryState,
    (countryState: CountryState) => 
    countryState.countries.byCountry
    
);
export const selectAppStoreEntitiesCountryByCountry: MemoizedSelector<CountryState, {[id:string]:CountryPropertries[]}> = createSelector(
    selectCountryState,
    (countryState: CountryState) => 
    countryState.countries.countryEntities
    
);

export const selectAppStoreCountryByYear: MemoizedSelector<CountryState, CountryPropertries> = createSelector(
    selectCountryState,
    (countryState: CountryState) =>  countryState.countries.byYear    
);


export const selectAppStoreCountryByPopulation: MemoizedSelector<CountryState, CountryPropertries> = createSelector(
    selectCountryState,
    (countryState: CountryState) => 
        countryState. countries.byPopulation 

);