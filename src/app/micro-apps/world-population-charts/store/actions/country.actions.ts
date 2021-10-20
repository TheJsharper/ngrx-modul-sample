import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { CountryPropertries } from '../../models/app.store.country';

export const loadAllCounties: ActionCreator<string, () => TypedAction<string>> = createAction(
    "[Country Resolver] Load All Country"
);

export const allByCountry: ActionCreator<string, ({countryProperties:CountryPropertries}) => {countryProperties:CountryPropertries} & TypedAction<string>>
    = createAction(
        "[Load Country] All By Country Loaded",
        props<{countryProperties:CountryPropertries}>()

    );

    export const allByCountryEntities: ActionCreator<string, ({countryProperties: CountryPropertries} ) => {countryProperties: CountryPropertries}  & TypedAction<string>>
    = createAction(
        "[Load Country] All By Country Entities Loaded",
        props<{countryProperties: CountryPropertries }>()

    );



export const allByYear: ActionCreator<string, ({countryProperties: CountryPropertries} ) => {countryProperties: CountryPropertries}  & TypedAction<string>>
    = createAction(
        "[Load Country] All By Year Loaded",
        props<{countryProperties: CountryPropertries} >()

    );


export const allByPopulation: ActionCreator<string, ({countryProperties: CountryPropertries} ) => {countryProperties: CountryPropertries}  & TypedAction<string>>
    = createAction(
        "[Load Country] All By Population Loaded",
        props<{countryProperties: CountryPropertries} >()

    );