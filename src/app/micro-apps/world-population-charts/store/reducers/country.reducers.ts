
import { Countries } from './../../../world-population/models/model.contries';

import { createReducer, on } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { AppStoreCountry, CountryPropertries } from '../../models/app.store.country';
import { CountryActions } from '../actions/action-types';

import { cloneDeep} from'lodash';


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
                ...state.countries,
                countryEntities: state.countries.countryEntities
            }
        }
    }),


    on(CountryActions.allByCountryEntities, (state: CountryState, action:{countryProperties: CountryPropertries}) => {
       
        let current:{[id:string]: CountryPropertries[]}= cloneDeep(state.countries.countryEntities);
        const key:string = action.countryProperties.country.toLowerCase();
        if(current == undefined) current = {};
                if(Object.keys(current).filter((value:string)=> value ==key).length == 1){
                        
                    
                    current[key].push(action.countryProperties);
                       

                }else{
                    const value: CountryPropertries[] = [action.countryProperties];
                    current[key] = value;
                }
        
        return {
            countries: {
                ...state.countries,
                countryEntities: current
            }
        }
    }),



    on(CountryActions.allByYear, (state: CountryState, action: {countryProperties: CountryPropertries} & TypedAction<string>) => {

      
        return {
            countries: {
                ...state.countries,
                byYear: action.countryProperties,
            }
        }
    }),


    on(CountryActions.allByPopulation, (state: CountryState, action: {countryProperties: CountryPropertries} & TypedAction<string>) => {

       

        return {
            countries: {
                ...state.countries,
                byPopulation: action.countryProperties
            }
        }
    }),


)




