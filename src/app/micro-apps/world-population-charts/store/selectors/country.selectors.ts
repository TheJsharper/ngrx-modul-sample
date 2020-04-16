import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { CountryState } from '../reducers/country.reducers';
import { AppStore } from 'src/app/micro-apps/store/reducers';
import { AppStoreCountry } from '../../models/app.store.country';

export const selectCountryState: MemoizedSelector<AppStore, CountryState> = createFeatureSelector<CountryState>("countries");


export const selectAppStoreCountry: MemoizedSelector<CountryState, AppStoreCountry> = createSelector(
    selectCountryState,
    (countryState: CountryState) => countryState.countries
);

