import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { GameHelper } from '../helpers/game.helper';
import { Stock } from '../models/Stock';
import { StockPriceSeries } from '../models/StockPriceSeries';
import { RECORD_STOCK_PRICE_UPDATE } from '../stores/prices.store';

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
        const oldStocks: {
            timeSeries: Array<string>;
            stockSeries: Array<StockPriceSeries>;
        } = this._gameHelper.getCurrentPricesStore();
        console.log(oldStocks);

        oldStocks.stockSeries.forEach((oldStock: Stock) => {
            const percentChange = this.getRandomPriceMovementAsPercentage();
            const dollarChange = (percentChange - 0.5) * oldStock.currentPrice;
            let newPrice = oldStock.currentPrice + dollarChange;
            let newStock = Object.assign({}, oldStock);
            newStock.currentPrice = parseFloat(newPrice.toFixed(2));
            const payload = { symbol: oldStock.symbol, price: newPrice };
            console.log(`Dispatching RECORD_STOCK_PRICE_UPDATE with payload => ${JSON.stringify(payload)}`);
            this._store.dispatch({ type: RECORD_STOCK_PRICE_UPDATE, payload })
        });
    }

    private getRandomPriceMovementAsPercentage(): number {
        return Math.random();
    }
}
