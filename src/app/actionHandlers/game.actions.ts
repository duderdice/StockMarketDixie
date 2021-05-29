import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { GameHelper } from '../helpers/game.helper';
import { Stock } from '../models/Stock';
import { ADD_TIME_SERIES, ADD_STOCK_SERIES, RECORD_STOCK_PRICE_UPDATE } from '../stores/prices.store';
import { APPEND_TICKER, CLEAR_TICKER } from '../stores/tickerTape.store';
import * as Constants from 'src/app/constants/constants';
import { PriceHelper } from '../helpers/price.helper';

@Injectable({
    providedIn: 'root'
})
export class GameActions {

    private gameTimeInTicks: number = Constants.GAME_TIME_IN_TICKS;
    // private readonly startYear = 1920;
    // private readonly endYear = 1929;
    private gameTicker: number;
    private gameTimeInSeconds = Constants.GAME_TIME_IN_TICKS;
    private readonly updateIntervalInMilliseconds = Constants.UPDATE_INTERVAL_IN_MILLISECONDS;
    private readonly resetIntervalInMilliseconds = Constants.RESET_INTERVAL_IN_MILLISECONDS
    constructor(
        private _gameHelper: GameHelper,
        private _priceHelper: PriceHelper,
        private _store: Store<any>
    ) { }

    public initializeGame() {
        this.initializeTimeSeries();
        this.initilizeStockSeries();
        this.initializeTickerTape();
    }

    private initializeTimeSeries(): void {
        const timeSeries = this.getDefaultTimeSeries();
        this._store.dispatch({ type: ADD_TIME_SERIES, payload: timeSeries });
    }

    private initilizeStockSeries(): void {
        const stockSeries = this.getDefaultStockSeries();
        this._store.dispatch({ type: ADD_STOCK_SERIES, payload: stockSeries });
    }

    private initializeTickerTape(): void {
        const stocks: Array<Stock> = this.getDefaultStockSeries();
        const tickerArr: Array<string> = stocks.map((s: Stock) => {
            return `${s.symbol} ${this._priceHelper.formatAsCurrency(s.currentPrice)},  `;
        });
        const ticker = tickerArr.join('      ');
        this._store.dispatch({ type: APPEND_TICKER, payload: ticker });
    }

    private getDefaultTimeSeries(): Array<string> {
        let timeSeries: Array<string> = [];
        for (let i = 0; i < this.gameTimeInTicks; i++) {
            timeSeries.push(`${i}`);
        }
        return timeSeries;
    }

    private getDefaultStockSeries(): Array<Stock> {
        return [
            {
                symbol: "S",
                name: "Sinclair Realty, Ltd.",
                color: "#ff5500",
                background: "rgba(255, 109, 0, 0.33)",
                currentPrice: 100.00,
                isBankrupt: false,
                series: [100.00]
            },
            {
                symbol: "GB",
                name: "Griffin Brothers IT Svcs",
                color: "black",
                background: "rgba(87, 89, 93, 0.33)",
                currentPrice: 100.00,
                isBankrupt: false,
                series: [100.00]
            },
            {
                symbol: "DLB",
                name: "Doug Laber Boatworks",
                color: "#F6BE00",
                background: "rgba(255, 255, 0, 0.33)",
                currentPrice: 100.00,
                isBankrupt: false,
                series: [100.00]
            },
            {
                symbol: "SA",
                name: "Stout Airlines, Inc.",
                color: "#2768A9",
                background: "rgba(152, 203, 255, 0.33)",
                currentPrice: 100.00,
                isBankrupt: false,
                series: [100.00]
            }
        ];
    }

    public activateGameTicker(): void {
        this.gameTicker = setInterval(() => {
            if (this.gameTimeInSeconds > 0) {
                // set timer interval to trigger periodic updates of stock prices
                this.gameTick();
            } else {
                window.clearInterval(this.gameTicker);
                this.resetGame();
            }
        }, this.updateIntervalInMilliseconds);
    }

    private resetGame() {
        setTimeout(() => {
            this.gameTimeInSeconds = Constants.GAME_TIME_IN_TICKS;
            this.initializeGame();
            this.activateGameTicker();
        }, this.resetIntervalInMilliseconds);
    }

    private gameTick(): void {
        this.incrementStockPrices();
        console.log(`timeLeft = ${this.gameTimeInSeconds} ... tick ... tick ... tick ...`);
        this.gameTimeInSeconds--;
    }

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
                const tickerPayload = `  ${oldStock.symbol} ${this._priceHelper.formatAsCurrency(newPrice)},   `;
                this._store.dispatch({ type: APPEND_TICKER, payload: tickerPayload });
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
            return (Math.random() - 0.99) / 2;  // range from -33% to +1%
        }
    }

    private getPriceMovementAsDollarChange(currentPrice: number, percentChange: number) {
        let dollarChange = percentChange * currentPrice;
        if (0 < dollarChange && dollarChange < 0.005) { dollarChange = 0.01 }
        if (-0.005 < dollarChange && dollarChange < 0) { dollarChange = -0.01 }
        return dollarChange;
    }
}
