import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AppStore } from 'src/app/micro-apps/store/reducers';
import { CountryPropertries } from '../../models/app.store.country';
import { CountryState } from '../reducers/country.reducers';

export const selectCountryState: MemoizedSelector<AppStore, CountryState> = createFeatureSelector<CountryState>("countries");


export const selectAppStoreCountryByCountry: MemoizedSelector<CountryState, CountryPropertries> = createSelector(
    selectCountryState,
    (countryState: CountryState) => {
        const countries = countryState.countries; 
        return countries? countries.byCountry: undefined
    }
);

export const selectAppStoreCountryByYear: MemoizedSelector<CountryState, CountryPropertries> = createSelector(
    selectCountryState,
    (countryState: CountryState) => {
        const countries = countryState.countries; 
        return countries ? countries.byYear: undefined  
    }
);


export const selectAppStoreCountryByPopulation: MemoizedSelector<CountryState, CountryPropertries> = createSelector(
    selectCountryState,
    (countryState: CountryState) => {
        const countries = countryState.countries; 
        return countries? countries.byPopulation: undefined; 
    }
);