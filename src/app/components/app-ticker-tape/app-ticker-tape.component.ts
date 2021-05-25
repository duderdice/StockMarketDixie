import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticker-tape',
  templateUrl: './app-ticker-tape.component.html',
  styleUrls: ['./app-ticker-tape.component.css']
})
export class AppTickerTapeComponent implements OnInit {

  public text: string = "this is my scrolling text";

  constructor() { }

  ngOnInit(): void {
  }

}
