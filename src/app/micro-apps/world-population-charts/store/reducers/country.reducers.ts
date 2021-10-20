
import { createReducer, on } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { AppStoreCountry, CountryPropertries } from '../../models/app.store.country';
import { CountryActions } from '../actions/action-types';


export interface CountryState {
    countries?: AppStoreCountry
}

export const initialCountryState: CountryState = {
    countries: {}
};

export const countryReducer = createReducer(initialCountryState,

    on(CountryActions.allByCountry, (state: CountryState, action:{countryProperties: CountryPropertries}) => {
       
        return {
            countries: {
                byCountry: action.countryProperties,
                byPopulation: state.countries.byPopulation,
                byYear: state.countries.byYear,
                countryEntities: state.countries.countryEntities
            }
        }
    }),


    on(CountryActions.allByCountryEntities, (state: CountryState, action:{countryProperties: CountryPropertries}) => {
       
        let current:{[id:string]: CountryPropertries[]} = state.countries.countryEntities;
        if(current == undefined) current = {};
                if(Object.keys(current).filter((value:string)=> value ==action.countryProperties.country.toLowerCase()).length == 1){
                        
                    console.log("===>", current)
                        current[action.countryProperties.country.toLowerCase()].push(action.countryProperties);
                }else{
                    current[action.countryProperties.country.toLowerCase()] = [action.countryProperties];
                }
        
        return {
            countries: {
                byCountry: state.countries.byCountry,
                byPopulation: state.countries.byPopulation,
                byYear: state.countries.byYear,
                countryEntities: current
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
                byYear: action.countries.byYear,
                countryEntities: state.countries.countryEntities
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
                byYear: newStateByYear,
                countryEntities: state.countries.countryEntities
            }
        }
    }),


)




