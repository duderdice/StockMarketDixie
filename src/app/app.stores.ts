// Store framework functions
import { compose } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';

// Stores/Reducers
import { stocks } from './stores/stocks.store';

// const reducers = { /* see below */
export const APP_STORES = {
    stocks,
};

/*
// required for AOT -- see http://orizens.com/wp/topics/guidelines-for-developing-with-angular-ngrxstore-ngrxeffects-aot/
const composer = compose(Object.keys(reducers), combineReducers)(reducers);

export function APP_STORES(state: any, action: any) {
    return composer(state, action);
}
*/
