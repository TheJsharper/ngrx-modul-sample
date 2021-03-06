import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { CountryState } from '../reducers/country.reducers';

export const loadAllCounties: ActionCreator<string, () => TypedAction<string>> = createAction(
    "[Country Resolver] Load All Country"
);

export const allByCountry: ActionCreator<string, (countryState: CountryState) => CountryState & TypedAction<string>>
    = createAction(
        "[Load Country] All By Country Loaded",
        props<CountryState>()

    );



export const allByYear: ActionCreator<string, (countryState: CountryState) => CountryState & TypedAction<string>>
    = createAction(
        "[Load Country] All By Year Loaded",
        props<CountryState>()

    );


export const allByPopulation: ActionCreator<string, (countryState: CountryState) => CountryState & TypedAction<string>>
    = createAction(
        "[Load Country] All By Population Loaded",
        props<CountryState>()

    );