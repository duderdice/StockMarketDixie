import { Component, Input, OnInit } from '@angular/core';
import { Stock } from '../../models/Stock';

@Component({
  selector: 'app-stock-info',
  templateUrl: './app-stock-info.component.html',
  styleUrls: ['./app-stock-info.component.css']
})
export class AppStockInfoComponent implements OnInit {

  @Input() public stock: Stock;

  constructor() { }

  ngOnInit(): void {
  }

}
