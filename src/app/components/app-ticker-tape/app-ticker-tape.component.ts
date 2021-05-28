import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameActions } from 'src/app/actionHandlers/game.actions';

@Component({
  selector: 'app-ticker-tape',
  templateUrl: './app-ticker-tape.component.html',
  styleUrls: ['./app-ticker-tape.component.css']
})
export class AppTickerTapeComponent implements OnInit {

  public tickerText: string;
  private tickerSubscription: any;

  private readonly maxMessageSize: number = 100;
  private readonly retainedMessageSize: number = -10; // portion of text to substring from end of current value

  public showStartButton: boolean = true;

  constructor(
    private _gameActions: GameActions,
    private _store: Store<any>
  ) { }

  ngOnInit(): void {
    this.tickerSubscription = this._store.select('ticker').subscribe((t) => {
      this.tickerText = t;
    });
  }

  public startGame(): void {
    this._gameActions.activateGameTicker();
    this.showStartButton = false;
  }
}
