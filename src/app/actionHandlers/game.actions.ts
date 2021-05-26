import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameHelper } from '../helpers/game.helper';
import { Stock } from '../models/Stock';
import { UPDATE_STOCKS } from '../stores/stocks.store';

@Injectable({
    providedIn: 'root'
})
export class GameActions {

    constructor(
        private _store: Store<any>,
        private _gameHelper: GameHelper
    ) { }

    public incrementStockPrices(): void {
        let newStocks: Array<Stock> = [];
        const oldStocks: Array<Stock> = this._gameHelper.getCurrentStocks();
        oldStocks.forEach((oldStock: Stock) => {
            const percentChange = this.getRandomPriceMovementAsPercentage();
            const dollarChange = (percentChange - 0.5) * oldStock.currentPrice;
            let newPrice = oldStock.currentPrice + dollarChange;
            let newStock = Object.assign({}, oldStock);
            newStock.currentPrice = newPrice;
            newStocks.push(newStock);
        });
        this._store.dispatch({ type: UPDATE_STOCKS, payload: newStocks })
    }

    private getRandomPriceMovementAsPercentage(): number {
        return Math.random();
    }
}
