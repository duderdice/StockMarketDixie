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
    private readonly startYear = 1920;
    private readonly endYear = 1922;

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
            return `${s.symbol} ${this._priceHelper.formatAsCurrency(s.currentPrice)}`;
        });
        const ticker = tickerArr.join('      ');
        this._store.dispatch({ type: APPEND_TICKER, payload: ticker });
    }

    private getMockTimeSeries(): Array<string> {
        return [
            "1920",
            "1921",
            "1922",
            "1923",
            "1924",
            "1925",
            "1926",
            "1927",
            "1928",
            "1929",
            "1930",
        ];
    }

    private getDefaultTimeSeries(): Array<string> {
        let timeSeries: Array<string> = [];
        // for (let i = 0; i < (this.gameTimeInTicks / 4); i++) {
        //     for (let j = 1; j <= 4; j++) {
        //         let value = `${this.startYear + i} Q${j}`; // "1920 thru 1930, each quarter"
        //         timeSeries.push(`${value}`);
        //     }
        // }
        for (let i = 0; i < this.gameTimeInTicks; i++) {
            timeSeries.push(`${i}`);
        }
        return timeSeries;
    }

    private getDefaultStockSeries(): Array<Stock> {
        return [
            {
                symbol: "DAL",
                name: "Delta Airlines",
                color: "#D1202D",
                currentPrice: 100.00,
                isBankrupt: false,
                series: [100.00]
            },
            {
                symbol: "BG",
                name: "Black Gold",
                color: "black",
                currentPrice: 100.00,
                isBankrupt: false,
                series: [100.00]
            },
            {
                symbol: "T",
                name: "Doug Laber Enterprises",
                color: "orange",
                currentPrice: 100.00,
                isBankrupt: false,
                series: [100.00]
            },
            {
                symbol: "F",
                name: "Ford Motorcars",
                color: "#2768A9",
                currentPrice: 100.00,
                isBankrupt: false,
                series: [100.00]
            }
        ];
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
                const tickerPayload = `  ${oldStock.symbol} ${this._priceHelper.formatAsCurrency(newPrice)}   `;
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
