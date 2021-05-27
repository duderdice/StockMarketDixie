import { Action } from '@ngrx/store';

import { Stock } from '../models/Stock';

// State
export class State {
    timeSeries: Array<string>;
    stockSeries: Array<Stock>;
}

// const initialState = {};
const initialState: State = {
    timeSeries: [],
    stockSeries: []
};

// ActionTypes
export const
    ADD_TIME_SERIES = 'ADD_TIME_SERIES',
    ADD_STOCK_SERIES = 'ADD_STOCK_SERIES',
    RECORD_STOCK_PRICE_UPDATE = 'RECORD_STOCK_PRICE_UPDATE';

export class AddTimeSeriesAction implements Action {
    readonly type = ADD_TIME_SERIES;
    payload: Array<string>;
}
export class AddStockSeriesAction implements Action {
    readonly type = ADD_STOCK_SERIES;
    payload: Array<Stock>;
}
export class RecordStockPriceUpdateAction implements Action {
    readonly type = RECORD_STOCK_PRICE_UPDATE;
    payload: { symbol: string; price: number; }
}
export type Actions = AddTimeSeriesAction | AddStockSeriesAction | RecordStockPriceUpdateAction;

// Store/Reducer
export function prices(state: State = initialState, action: Actions): State {
    switch (action.type) {

        case ADD_TIME_SERIES:
            let newState0 = Object.assign({}, state);
            newState0.timeSeries = action.payload;
            return newState0;

        case ADD_STOCK_SERIES:
            let newState1 = Object.assign({}, state);
            newState1.stockSeries = action.payload;
            return newState1;

        case RECORD_STOCK_PRICE_UPDATE:
            let newState2: State = { timeSeries: [], stockSeries: [] };
            newState2.timeSeries = state.timeSeries;
            let newStockSeriesArray: Array<Stock> = state.stockSeries.map((sps: Stock) => {
                if (sps.symbol === action.payload.symbol) {
                    let newStockSeries: Stock = {
                        ...sps,
                        currentPrice: action.payload.price,
                        series: [...sps.series, action.payload.price]
                    };
                    // detect bankruptcy
                    if (newStockSeries.currentPrice < 0.005) {
                        newStockSeries.currentPrice = 0;
                        newStockSeries.isBankrupt = true;
                    }
                    return newStockSeries;
                } else {
                    return sps;
                }
            });
            newState2.stockSeries = newStockSeriesArray;
            return newState2;

        default:
            return state;
    }
};
