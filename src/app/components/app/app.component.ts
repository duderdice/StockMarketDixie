import { Component } from '@angular/core';
import { PriceService } from '../../services/price.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StockMarketDixie';
  timeLeft = 10000;
  gameTicker: any;

  constructor(
    private _priceService: PriceService
  ) { }

  public ngOnInit() {
    this._priceService.initializePriceService();
    // this.activateGameTicker();
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
