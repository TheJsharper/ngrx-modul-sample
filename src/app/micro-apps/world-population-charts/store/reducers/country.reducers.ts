import { AppStoreCountry, CountryPropertries } from '../../models/app.store.country';
import { createReducer, ActionCreator } from '@ngrx/store';
import { CountryActions } from '../actions/action-types';
import { on } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';


export interface CountryState {
    countries: AppStoreCountry
}

export const initialCountryState: CountryState = {
    countries: undefined
};

export const countryReducer = createReducer(initialCountryState,

    on(CountryActions.allByCountry, (state: CountryState, action: CountryState & TypedAction<string>) => {
        let newStateByYear: CountryPropertries = undefined;
        let newStateByPopulation: CountryPropertries = undefined;

        if (state.countries) {
            newStateByYear = { ...state.countries.byYear };
            newStateByPopulation = { ...state.countries.byPopulation };
        }
        return {
            countries: {
                byCountry: action.countries.byCountry,
                byPopulation: newStateByPopulation,
                byYear: newStateByYear
            }
        }
    }),



    on(CountryActions.allByYear, (state: CountryState, action: CountryState & TypedAction<string>) => {

        let newStateByCountry: CountryPropertries = undefined;
        let newStateByPopulation: CountryPropertries = undefined;

        if (state.countries) {
            newStateByCountry = { ...state.countries.byCountry };
            newStateByPopulation = { ...state.countries.byPopulation };
        }

        return {
            countries: {
                byCountry: newStateByCountry,
                byPopulation: newStateByPopulation,
                byYear: action.countries.byYear
            }
        }
    }),


    on(CountryActions.allByPopulation, (state: CountryState, action: CountryState & TypedAction<string>) => {

        let newStateByCountry: CountryPropertries = undefined;
        let newStateByYear: CountryPropertries = undefined;

        if (state.countries) {
            newStateByCountry = { ...state.countries.byCountry };
            newStateByYear = { ...state.countries.byYear };
        }

        return {
            countries: {
                byCountry: newStateByCountry,
                byPopulation: action.countries.byPopulation,
                byYear: newStateByYear
            }
        }
    }),


)