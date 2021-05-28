import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Stock } from 'src/app/models/Stock';
import { GameActions } from 'src/app/actionHandlers/game.actions';
import { PriceHelper } from 'src/app/helpers/price.helper';
import * as Constants from 'src/app/constants/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'StockMarketDixie';

  public stocks: Array<Stock>;
  private stocksSubscription: any;

  constructor(
    private _gameActions: GameActions,
    private _priceHelper: PriceHelper,
    private _store: Store<any>
  ) { }

  public ngOnInit() {
    this._gameActions.initializeGame();
    this.stocksSubscription = this._store.select('prices').subscribe((p: { timeSeries: Array<string>; stockSeries: Array<Stock>; }) => {
      this.stocks = this._priceHelper.transformPricesStateIntoStockInfo(p);
    });
  }

  public ngOnDestroy() {
    this.stocksSubscription.unsubscribe();
  }

}
