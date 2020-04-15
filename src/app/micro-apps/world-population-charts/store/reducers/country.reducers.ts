import { AppStoreCountry } from '../../models/app.store.country';
import { createReducer } from '@ngrx/store';
import { CountryActions } from '../actions/action-types';
import {on} from '@ngrx/store';


export interface CountryState{
    country:AppStoreCountry
}

export const initialCountryState: CountryState = {
    country: undefined
};

export const countryReducer = createReducer(initialCountryState,
    
    on(CountryActions.allCountryLoaded, (state, action:any) => {
        return {
            country: action.country
        }
    }),
)