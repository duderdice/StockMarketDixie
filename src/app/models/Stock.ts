export class Stock {
    symbol: string;
    name: string;
    currentPrice: number;
    isBankrupt: boolean;
    color: string;
    series: Array<number>; // simple array of prices history, one for each tick in the TimeSeries
}