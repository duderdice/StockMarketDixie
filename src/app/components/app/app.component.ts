import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Stock } from 'src/app/models/Stock';
import { GameActions } from 'src/app/actionHandlers/game.actions';
import { PriceActions } from 'src/app/actionHandlers/price.actions';
import { ChartDataSeries } from 'src/app/models/ChartDataSeries';
import { PriceHelper } from 'src/app/helpers/price.helper';
import * as Constants from 'src/app/constants/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'StockMarketDixie';
  private gameTimeInSeconds = Constants.GAME_TIME_IN_TICKS;
  private readonly updateIntervalInMilliseconds = Constants.UPDATE_INTERVAL_IN_SECONDS;
  private gameTicker: number;

  public stocks: Array<Stock>;
  private stocksSubscription: any;

  constructor(
    private _gameActions: GameActions,
    private _priceActions: PriceActions,
    private _priceHelper: PriceHelper,
    private _store: Store<any>
  ) { }

  public ngOnInit() {
    this._priceActions.initializeStockPriceCharts();
    this.activateGameTicker();
    this.stocksSubscription = this._store.select('prices').subscribe((p: { timeSeries: Array<string>; stockSeries: Array<Stock>; }) => {
      this.stocks = this._priceHelper.transformPricesStateIntoStockInfo(p);
    });
  }

  public ngOnDestroy() {
    this.stocksSubscription.unsubscribe();
  }

  private activateGameTicker(): void {
    // set timer interval to trigger periodic updates of stock prices
    this.gameTicker = setInterval(() => {
      if (this.gameTimeInSeconds > 0) {
        this.gameTick();
      } else {
        // this.timeLeft = 60; // add 60 more seconds
        console.log('Game Over!');
        window.clearInterval(this.gameTicker);
      }
    }, this.updateIntervalInMilliseconds)
  }

  private gameTick(): void {
    this._gameActions.incrementStockPrices();
    console.log(`timeLeft = ${this.gameTimeInSeconds} ... tick ... tick ... tick ...`);
    this.gameTimeInSeconds--;
  }
}
