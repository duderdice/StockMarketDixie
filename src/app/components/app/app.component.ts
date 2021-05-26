import { Component } from '@angular/core';
import { PriceService } from '../../services/price.service';
import { Store } from '@ngrx/store';
import { Stock } from 'src/app/models/Stock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StockMarketDixie';
  timeLeft = 10000;
  gameTicker: any;

  public stocks: Array<Stock>;
  private stocksSubscription: any;

  constructor(
    private _priceService: PriceService,
    private _store: Store<any>
  ) { }

  public ngOnInit() {
    this.stocksSubscription = this._store.select('stocks').subscribe((s: Array<Stock>) => {
      this.stocks = s;
    });
    // console.log(`in AppComponent.ngOnInit() => Stocks are ${JSON.stringify(this.stocks)}`);

    this._priceService.initializePriceService();
    // this.activateGameTicker();
  }

  public ngOnDestroy() {
    this.stocksSubscription.unsubscribe();
  }

  private activateGameTicker(): void {
    // set timer interval to trigger periodic updates of stock prices
    this.gameTicker = setInterval(() => {
      if (this.timeLeft > 0) {
        this.gameTick();
      } else {
        this.timeLeft = 60;
      }
    }, 1000)
  }

  private gameTick(): void {
    //   GameActions.incrementStockPrices();
    console.log(`timeLeft = ${this.timeLeft} ... tick ... tick ... tick ...`);
    this.timeLeft--;
  }
}
