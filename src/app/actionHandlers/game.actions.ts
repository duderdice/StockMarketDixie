import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { GameHelper } from '../helpers/game.helper';
import { Stock } from '../models/Stock';
import { RECORD_STOCK_PRICE_UPDATE } from '../stores/prices.store';
import * as Constants from 'src/app/constants/constants';

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
            stockSeries: Array<Stock>;
        } = this._gameHelper.getCurrentPricesStore();
        // console.log(oldStocks);

        oldStocks.stockSeries.forEach((oldStock: Stock) => {
            let payload = { symbol: oldStock.symbol, price: oldStock.currentPrice };;
            if (!oldStock.isBankrupt) {
                const percentChange = this.getRandomPriceMovementAsPercentage(oldStock);
                const dollarChange = this.getPriceMovementAsDollarChange(oldStock.currentPrice, percentChange);
                let newPrice = oldStock.currentPrice + dollarChange;
                let newStock = Object.assign({}, oldStock);
                newStock.currentPrice = parseFloat(newPrice.toFixed(2));
                payload.price = newPrice;
            }
            // console.log(`Dispatching RECORD_STOCK_PRICE_UPDATE with payload => ${JSON.stringify(payload)}`);
            this._store.dispatch({ type: RECORD_STOCK_PRICE_UPDATE, payload })
        });
    }

    private getRandomPriceMovementAsPercentage(stock: Stock): number {
        // different calculation before v after 1929
        if ((stock.series.length / Constants.GAME_TIME_IN_TICKS) < 0.90) {
            //before 1929, bias towards positive growth
            return (Math.random() - 0.3) / 10;  // range from -3% to +7%
        } else {
            //after 1929, bias towards strongly negative growth
            return (Math.random() - 0.95) / 10;  // range from -9% to +1%
        }
    }

    private getPriceMovementAsDollarChange(currentPrice: number, percentChange: number) {
        let dollarChange = percentChange * currentPrice;
        if (0 < dollarChange && dollarChange < 0.005) { dollarChange = 0.01 }
        if (-0.005 < dollarChange && dollarChange < 0) { dollarChange = -0.01 }
        return dollarChange;
    }
}
