import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ChartDataSeries } from 'src/app/models/ChartDataSeries';
import { Stock } from 'src/app/models/Stock';
import { PriceHelper } from '../../helpers/price.helper';

@Component({
  selector: 'app-price-chart',
  templateUrl: './app-price-chart.component.html',
  styleUrls: ['./app-price-chart.component.css']
})
export class AppPriceChartComponent implements OnInit {

  // Series Data
  public chartSeriesData: Array<ChartDataSeries>;
  private chartSeriesDataSubscription: any;

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
  yAxisLabel: string = 'Price ($)';
  timeline: boolean = true;

  colorScheme;

  constructor(
    private _priceHelper: PriceHelper,
    private _store: Store<any>
  ) { }

  public ngOnInit(): void {
    this.chartSeriesDataSubscription = this._store.select('prices').subscribe((p) => {
      this.chartSeriesData = this._priceHelper.transformPricesStateIntoPricesChartData(p);
      if (!this.colorScheme) {
        this.colorScheme = this.getColorSchemeFromStocks(p);
      }
    });
  }

  public ngOnDestroy() {
    this.chartSeriesDataSubscription.unsubscribe();
  }

  public xAxisFormatter(val) {
    const valInt = parseInt(val);
    if (valInt % 52 <= 5) {
      const label = Math.round(1920 + (valInt / 52));
      return `${label}`;
    } else {
      return '';
    }
  }

  private getColorSchemeFromStocks(p) {
    const colors: Array<string> = p.stockSeries.map((s: Stock) => {
      return s.color;
    });
    return { domain: colors };
  }

}
