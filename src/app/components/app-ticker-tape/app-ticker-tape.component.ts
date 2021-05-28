import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

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

  constructor(
    private _store: Store<any>
  ) { }

  ngOnInit(): void {
    this.tickerSubscription = this._store.select('ticker').subscribe((t) => {
      this.tickerText = t;
    });
  }

  public updateText(): void {
    if (this.tickerText.length < this.maxMessageSize) {
      this.tickerText += " with additional content";
    } else {
      this.tickerText = this.tickerText.substr(this.retainedMessageSize) + " with additional content";
    }
  }
}
