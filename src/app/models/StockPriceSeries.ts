export class StockPriceSeries {
    symbol: string;
    name: string;
    currentPrice: number;
    color: string;
    series: Array<number>; // simple array of prices history, one for each tick in the TimeSeries
}