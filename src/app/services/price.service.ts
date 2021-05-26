import { Injectable } from '@angular/core';
import { StockPriceSeries } from '../models/StockPriceSeries';

@Injectable({
    providedIn: 'root'
})
export class PriceService {

    private allStockSeriesData: Array<StockPriceSeries>;
    private timeSeries: Array<string>;
    private stockSeries: Array<string>;
    private priceSeries: Array<number>;

    private readonly startYear = 1920;
    private readonly endYear = 1922;

    constructor(
    ) { }

    public initializePriceService() {
        // this.allStockSeriesData = this.getStockPriceData1();
        // this.allStockSeriesData = this.constructStockPriceData1();

        // this.allStockSeriesData = this.getStockPriceData2();
        this.allStockSeriesData = this.constructStockPriceData2();

        /* // construct data from sources
        this.timeSeries = this.getTimeSeries();
        this.stockSeries = this.getMockStockSeries();
        this.priceSeries = this.getMockPriceSeries();
        this.allStockSeriesData = this.constructAllStockSeries(this.stockSeries, this.timeSeries, this.priceSeries);
        */

        console.log('stock series data constructed');
        console.log(this.allStockSeriesData);
        console.log(JSON.stringify(this.allStockSeriesData));
        /**/
    }

    public getAllStockSeries(): Array<StockPriceSeries> {
        return this.allStockSeriesData;
    }

    private getTimeSeries(): Array<string> {
        return this.timeSeries;
    }

    private getMockTimeSeries(): Array<string> {
        let series = [];
        for (let year = this.startYear; year < this.endYear; year++) {
            series.push(`${year}`);
            for (let week = 0; week < 52; week++) {
                series.push("");
            }
        }
        console.log(`TimeSeries array contains ${series.length} elements`);
        return series;
    }

    private constructAllStockSeries(stockSeries: Array<string>, timeSeries: Array<string>, priceSeries: Array<number>): Array<StockPriceSeries> {
        let newChartSeries = [];
        stockSeries.forEach((stockSymbol: string) => {
            let newStockSeries = [];
            for (var i = 0; i++; i < timeSeries.length) {
                let myPrice = null;
                if (i < priceSeries.length) {
                    myPrice = priceSeries[i];
                }
                newStockSeries.push({ "series": timeSeries[i], "value": myPrice });
            };
            newChartSeries.push({ "name": stockSymbol, "series": newStockSeries });
        });
        return newChartSeries;
    }

    private getMockStockSeries(): Array<string> {
        return ["Aaa", "Bbb", "Ccc"];
    }

    private getMockPriceSeries(): Array<number> {
        return [101, 102, 105, 104, 110];
    }

    private constructStockPriceData2(): Array<StockPriceSeries> {

        const timeSeries: Array<string> = [
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
        const stocks: Array<string> = ["Aaa", "Bbb", "Ccc"];
        const stockApriceSeries: Array<number> = [101, 105, 125, 155, 195];
        const stockBpriceSeries: Array<number> = [2147, 6277, 5188, 3297, 4011];
        const stockCpriceSeries: Array<number> = [5763, 6937, 4333, 4842, 6708];

        let newChartSeries = [];
        stocks.forEach((stockSymbol: string) => {
            let newStockSeries = [];
            for (var i = 0; i < timeSeries.length; i++) {
                let myPrice = null;
                switch (stockSymbol) {
                    case "Aaa":
                        if (i < stockApriceSeries.length) { myPrice = stockApriceSeries[i]; }
                        break;
                    case "Bbb":
                        if (i < stockBpriceSeries.length) { myPrice = stockBpriceSeries[i]; }
                        break;
                    case "Ccc":
                        if (i < stockCpriceSeries.length) { myPrice = stockCpriceSeries[i]; }
                        break;
                    default:
                        break;
                }
                newStockSeries.push({ "value": myPrice, "name": timeSeries[i] });
            };
            newChartSeries.push({ "name": stockSymbol, "series": newStockSeries });
        });
        return newChartSeries;
    }

    private getStockPriceData2(): Array<StockPriceSeries> {
        return [
            {
                "name": "Aaa",
                "series": [
                    {
                        "value": 101,
                        "name": "1920"
                    },
                    {
                        "value": 105,
                        "name": ""
                    },
                    {
                        "value": 125,
                        "name": "1921"
                    },
                    {
                        "value": 155,
                        "name": ""
                    },
                    {
                        "value": 195,
                        "name": "1922"
                    }
                ]
            },
            {
                "name": "Bbb",
                "series": [
                    {
                        "value": 2147,
                        "name": "1920"
                    },
                    {
                        "value": 6277,
                        "name": ""
                    },
                    {
                        "value": 5188,
                        "name": "1921"
                    },
                    {
                        "value": 3297,
                        "name": ""
                    },
                    {
                        "value": 4011,
                        "name": "1922"
                    }
                ]
            },
            {
                "name": "Ccc",
                "series": [
                    {
                        "value": 5763,
                        "name": "1920"
                    },
                    {
                        "value": 6937,
                        "name": ""
                    },
                    {
                        "value": 4333,
                        "name": "1921"
                    },
                    {
                        "value": 4842,
                        "name": ""
                    },
                    {
                        "value": 6708,
                        "name": "1922"
                    }
                ]
            }
        ];
    }

    private constructStockPriceData1(): Array<StockPriceSeries> {

        const timeSeries: Array<string> = [
            "2016-09-19T14:41:10.549Z",
            "2016-09-15T10:50:34.955Z",
            "2016-09-22T21:30:12.837Z",
            "2016-09-20T05:10:44.880Z",
            "2016-09-23T03:12:50.785Z"
        ];
        const stocks: Array<string> = ["Aaa", "Bbb", "Ccc"];
        const stockApriceSeries: Array<number> = [4367, 2983, 3878, 3431, 5535];
        const stockBpriceSeries: Array<number> = [2147, 6277, 5188, 3297, 4011];
        const stockCpriceSeries: Array<number> = [5763, 6937, 4333, 4842, 6708];

        let newChartSeries = [];
        stocks.forEach((stockSymbol: string) => {
            let newStockSeries = [];
            for (var i = 0; i < timeSeries.length; i++) {
                let myPrice;
                switch (stockSymbol) {
                    case "Aaa":
                        myPrice = stockApriceSeries[i];
                        break;
                    case "Bbb":
                        myPrice = stockBpriceSeries[i];
                        break;
                    case "Ccc":
                        myPrice = stockCpriceSeries[i];
                        break;
                    default:
                        break;
                }
                newStockSeries.push({ "value": myPrice, "name": timeSeries[i] });
            };
            newChartSeries.push({ "name": stockSymbol, "series": newStockSeries });
        });
        return newChartSeries;
    }

    private getStockPriceData1(): Array<StockPriceSeries> {
        return [
            {
                "name": "Aaa",
                "series": [
                    {
                        "value": 4367,
                        "name": "2016-09-19T14:41:10.549Z"
                    },
                    {
                        "value": 2983,
                        "name": "2016-09-15T10:50:34.955Z"
                    },
                    {
                        "value": 3878,
                        "name": "2016-09-22T21:30:12.837Z"
                    },
                    {
                        "value": 3431,
                        "name": "2016-09-20T05:10:44.880Z"
                    },
                    {
                        "value": 5535,
                        "name": "2016-09-23T03:12:50.785Z"
                    }
                ]
            },
            {
                "name": "Bbb",
                "series": [
                    {
                        "value": 2147,
                        "name": "2016-09-19T14:41:10.549Z"
                    },
                    {
                        "value": 6277,
                        "name": "2016-09-15T10:50:34.955Z"
                    },
                    {
                        "value": 5188,
                        "name": "2016-09-22T21:30:12.837Z"
                    },
                    {
                        "value": 3297,
                        "name": "2016-09-20T05:10:44.880Z"
                    },
                    {
                        "value": 4011,
                        "name": "2016-09-23T03:12:50.785Z"
                    }
                ]
            },
            {
                "name": "Ccc",
                "series": [
                    {
                        "value": 5763,
                        "name": "2016-09-19T14:41:10.549Z"
                    },
                    {
                        "value": 6937,
                        "name": "2016-09-15T10:50:34.955Z"
                    },
                    {
                        "value": 4333,
                        "name": "2016-09-22T21:30:12.837Z"
                    },
                    {
                        "value": 4842,
                        "name": "2016-09-20T05:10:44.880Z"
                    },
                    {
                        "value": 6708,
                        "name": "2016-09-23T03:12:50.785Z"
                    }
                ]
            }
        ];
    }

}
