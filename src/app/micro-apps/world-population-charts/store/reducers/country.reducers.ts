import { AppStoreCountry } from '../../models/app.store.country';
import { createReducer, ActionCreator } from '@ngrx/store';
import { CountryActions } from '../actions/action-types';
import {on} from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';


export interface CountryState{
    countries:AppStoreCountry
}

export const initialCountryState: CountryState = {
    countries: undefined
};

export const countryReducer = createReducer(initialCountryState,
    
    on(CountryActions.allCountryLoaded, (state:CountryState, action:CountryState & TypedAction<string>) => {
        return {
            countries: action.countries
        }
    }),
)