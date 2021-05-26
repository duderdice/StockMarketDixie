import { Component, OnInit } from '@angular/core';
import { StockPriceSeries } from '../../models/StockPriceSeries';
import { PriceService } from '../../services/price.service';

@Component({
  selector: 'app-price-chart',
  templateUrl: './app-price-chart.component.html',
  styleUrls: ['./app-price-chart.component.css']
})
export class AppPriceChartComponent implements OnInit {

  // Series Data
  chartSeriesData: any[];

  // chartSize: Array<number> = [1400, 600];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Price';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(
    private _priceService: PriceService
  ) { }

  ngOnInit(): void {
    this.chartSeriesData = this._priceService.getAllStockSeries();
  }


}
