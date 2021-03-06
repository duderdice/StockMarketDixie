import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Stock } from '../models/Stock';

@Injectable({
    providedIn: 'root'
})
export class GameHelper {
    constructor(
        private _store: Store<any>
    ) { }

    // public getCurrentStocksStore(): Array<Stock> {
    //     let stocks: Array<Stock>;
    //     this._store.select('stocks').subscribe((s: Array<Stock>) => {
    //         stocks = s;
    //     });
    //     return stocks;
    // }

    public getCurrentPricesStore(): {
        timeSeries: Array<string>;
        stockSeries: Array<Stock>;
    } {
        let prices: {
            timeSeries: Array<string>;
            stockSeries: Array<Stock>;
        };
        this._store.select('prices').subscribe((p) => {
            prices = p;
        });
        return prices;
    }
}