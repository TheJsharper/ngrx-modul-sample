import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { CountryState } from '../reducers/country.reducers';

export const loadAllCounties: ActionCreator<string, () => TypedAction<string>> = createAction(
    "[Country Resolver] Load All Country"
);

export const allCountryLoaded: ActionCreator<string, (countryState:CountryState) => CountryState & TypedAction<string>>
    = createAction(
        "[Load Courses Effect] All Courses Loaded",
        props<CountryState>()

    );