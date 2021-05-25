import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-info',
  templateUrl: './app-stock-info.component.html',
  styleUrls: ['./app-stock-info.component.css']
})
export class AppStockInfoComponent implements OnInit {

  @Input() public symbol: string = "";
  @Input() public color: string = "";
  @Input() public price: number;

  constructor() { }

  ngOnInit(): void {
  }

}
