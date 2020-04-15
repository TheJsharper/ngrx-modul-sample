import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import { environment } from 'src/environments/environment';

export interface AppStore{

}

export const reducers: ActionReducerMap<AppStore>={}

export const metaReducers:MetaReducer<AppStore>[] =
!environment.production ? [] : [];