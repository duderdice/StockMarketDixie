import { Action } from '@ngrx/store';
import { Stock } from '../models/Stock';

// State
export type State = Array<Stock>;

// const initialState = [];
const initialState = [
    {
        symbol: "Aaa",
        name: "my A company",
        color: "yellow",
        currentPrice: 10.00
    },
    {
        symbol: "Bbb",
        name: "my B company",
        color: "black",
        currentPrice: 11.00
    },
    {
        symbol: "Ccc",
        name: "my C company",
        color: "orange",
        currentPrice: 12.00
    },
    {
        symbol: "Ddd",
        name: "my D company",
        color: "green",
        currentPrice: 13.00
    }
];

// ActionTypes
export const
    UPDATE_STOCKS = 'UPDATE_STOCKS',
    CLEAR_STOCKS = 'CLEAR_STOCKS';

export class UpdateStocksAction implements Action {
    readonly type = UPDATE_STOCKS;
    payload: Array<Stock>;
}
export class ClearStocksAction implements Action {
    readonly type = CLEAR_STOCKS;
}
export type Actions = UpdateStocksAction | ClearStocksAction;

// Store/Reducer
export function stocks(state: State = initialState, action: Actions): State {
    switch (action.type) {

        case UPDATE_STOCKS:
            return action.payload;

        case CLEAR_STOCKS:
            return [];

        default:
            return state;
    }
};
