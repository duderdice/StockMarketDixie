import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticker-tape',
  templateUrl: './app-ticker-tape.component.html',
  styleUrls: ['./app-ticker-tape.component.css']
})
export class AppTickerTapeComponent implements OnInit {

  public text: string = "this is my scrolling text";
  private readonly maxMessageSize: number = 100;
  private readonly retainedMessageSize: number = -10; // portion of text to substring from end of current value

  constructor() { }

  ngOnInit(): void {
  }

  public updateText(): void {
    if (this.text.length < this.maxMessageSize) {
      this.text += " with additional content";
    } else {
      this.text = this.text.substr(this.retainedMessageSize) + " with additional content";
    }
  }
}
