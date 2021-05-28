// Store framework functions
import { compose } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';

// Stores/Reducers
import { prices } from './stores/prices.store';
import { ticker } from './stores/tickerTape.store';

// const reducers = { /* see below */
export const APP_STORES = {
    prices,
    ticker
};

/*
// required for AOT -- see http://orizens.com/wp/topics/guidelines-for-developing-with-angular-ngrxstore-ngrxeffects-aot/
const composer = compose(Object.keys(reducers), combineReducers)(reducers);

export function APP_STORES(state: any, action: any) {
    return composer(state, action);
}
*/
