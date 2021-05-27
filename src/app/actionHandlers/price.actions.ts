import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { GameHelper } from '../helpers/game.helper';
import { ChartDataSeries } from '../models/ChartDataSeries';
import { StockPriceSeries } from '../models/StockPriceSeries';
import { Stock } from '../models/Stock';
import { ADD_TIME_SERIES, ADD_STOCK_SERIES, RECORD_STOCK_PRICE_UPDATE } from '../stores/prices.store';
import * as Constants from 'src/app/constants/constants';

@Injectable({
    providedIn: 'root'
})
export class PriceActions {

    private gameTimeInTicks: number = Constants.GAME_TIME_IN_TICKS;
    private readonly startYear = 1920;
    private readonly endYear = 1922;

    constructor(
        private _gameHelper: GameHelper,
        private _store: Store<any>
    ) { }

    public initializeStockPriceCharts() {
        this.initializeTimeSeries();
        this.initilizeStockSeries();
    }

    private initializeTimeSeries(): void {
        const timeSeries = this.getDefaultTimeSeries();
        this._store.dispatch({ type: ADD_TIME_SERIES, payload: timeSeries });
    }

    private initilizeStockSeries(): void {
        const stockSeries = this.getDefaultStockSeries();
        this._store.dispatch({ type: ADD_STOCK_SERIES, payload: stockSeries });
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

    private getDefaultStockSeries(): Array<StockPriceSeries> {
        return [
            {
                symbol: "DAL",
                name: "Delta Airlines",
                color: "red",
                currentPrice: 10.00,
                series: [10.00]
            },
            {
                symbol: "BG",
                name: "Black Gold",
                color: "black",
                currentPrice: 10.00,
                series: [10.00]
            },
            {
                symbol: "T",
                name: "Doug Labor Enterprises",
                color: "orange",
                currentPrice: 10.00,
                series: [10.00]
            },
            {
                symbol: "F",
                name: "Ford Motorcars",
                color: "green",
                currentPrice: 10.00,
                series: [10.00]
            }
        ];
    }

}
