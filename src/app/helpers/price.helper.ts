import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Stock } from '../models/Stock';
import { StockPriceSeries } from '../models/StockPriceSeries';
import { ChartDataSeries } from '../models/ChartDataSeries';

@Injectable({
    providedIn: 'root'
})
export class PriceHelper {
    constructor() { }

    public transformPricesStateIntoPricesChartData(p: { timeSeries: Array<string>; stockSeries: Array<StockPriceSeries>; }): Array<ChartDataSeries> {
        console.log('inside PriceHelper.transformPricesStateIntoPricesChartData(), received...');
        console.log(p);

        let newChartSeries: Array<ChartDataSeries> = [];
        p.stockSeries.forEach((sps: StockPriceSeries) => {
            let newStockSeries = [];
            for (var i = 0; i < p.timeSeries.length; i++) {
                let myPrice = null;
                if (i < sps.series.length) {
                    myPrice = sps.series[i];
                }
                newStockSeries.push({ "name": p.timeSeries[i], "value": myPrice });
            };
            newChartSeries.push({ "name": sps.symbol, "series": newStockSeries });
        });

        console.log('providing back ...');
        console.log(newChartSeries);
        return newChartSeries;
    }

    public transformPricesStateIntoStockInfo(p: { timeSeries: Array<string>; stockSeries: Array<StockPriceSeries>; }): Array<Stock> {
        console.log('inside PriceHelper.transformPricesStateIntoPricesChartData(), received...');
        console.log(p);

        let stocks: Array<Stock> = p.stockSeries.map((sps: StockPriceSeries) => {
            return {
                symbol: sps.symbol,
                name: sps.name,
                currentPrice: sps.currentPrice,
                color: sps.color
            }
        });

        console.log('providing back ...');
        console.log(stocks);
        return stocks;
    }
}