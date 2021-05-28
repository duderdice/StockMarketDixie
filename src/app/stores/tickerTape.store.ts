import { Action } from '@ngrx/store';

import { Stock } from '../models/Stock';

// State
export type State = string;

const initialState: string = "";

// ActionTypes
export const
    APPEND_TICKER = 'APPEND_TICKER',
    CLEAR_TICKER = 'CLEAR_TICKER';

export class AppendTickerAction implements Action {
    readonly type = APPEND_TICKER;
    payload: string;
}
export class ClearTickerAction implements Action {
    readonly type = CLEAR_TICKER;
}
export type Actions = AppendTickerAction | ClearTickerAction;

// Store/Reducer
export function ticker(state: State = initialState, action: Actions): State {
    switch (action.type) {

        case APPEND_TICKER:
            if (state.length < 300) {
                return state + action.payload;
            } else {
                return state.substr(state.indexOf("   ")).trim() + action.payload;
            }

        case CLEAR_TICKER:
            return initialState;

        default:
            return state;
    }
};
