import { Component, OnInit } from '@angular/core';
import { StockPriceSeries } from '../../models/StockPriceSeries';

@Component({
  selector: 'app-price-chart',
  templateUrl: './app-price-chart.component.html',
  styleUrls: ['./app-price-chart.component.css']
})
export class AppPriceChartComponent implements OnInit {

  seriesData: any[];
  chartSize: Array<number> = [1400, 600];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Price';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };


  constructor() { }

  ngOnInit(): void {
    // this.seriesData = this.getStockPriceData();
    this.seriesData = this.getOldStockPriceData();
  }

  private getStockPriceData(): Array<StockPriceSeries> {
    return [
      {
        "name": "Aaa",
        "series": [
          {
            "value": 101,
            "name": "1920"
          },
          {
            "value": 105,
            "name": ""
          },
          {
            "value": 125,
            "name": "1921"
          },
          {
            "value": 155,
            "name": ""
          },
          {
            "value": 195,
            "name": "1922"
          }
        ]
      },
      {
        "name": "Bbb",
        "series": [
          {
            "value": 2147,
            "name": "1920"
          },
          {
            "value": 6277,
            "name": ""
          },
          {
            "value": 5188,
            "name": "1921"
          },
          {
            "value": 3297,
            "name": ""
          },
          {
            "value": 4011,
            "name": "1922"
          }
        ]
      },
      {
        "name": "Ccc",
        "series": [
          {
            "value": 5763,
            "name": "1920"
          },
          {
            "value": 6937,
            "name": ""
          },
          {
            "value": 4333,
            "name": "1921"
          },
          {
            "value": 4842,
            "name": ""
          },
          {
            "value": 6708,
            "name": "1922"
          }
        ]
      }
    ];
  }

  private getOldStockPriceData(): Array<StockPriceSeries> {
    return [
      {
        "name": "Aaa",
        "series": [
          {
            "value": 4367,
            "name": "2016-09-19T14:41:10.549Z"
          },
          {
            "value": 2983,
            "name": "2016-09-15T10:50:34.955Z"
          },
          {
            "value": 3878,
            "name": "2016-09-22T21:30:12.837Z"
          },
          {
            "value": 3431,
            "name": "2016-09-20T05:10:44.880Z"
          },
          {
            "value": 5535,
            "name": "2016-09-23T03:12:50.785Z"
          }
        ]
      },
      {
        "name": "Bbb",
        "series": [
          {
            "value": 2147,
            "name": "2016-09-19T14:41:10.549Z"
          },
          {
            "value": 6277,
            "name": "2016-09-15T10:50:34.955Z"
          },
          {
            "value": 5188,
            "name": "2016-09-22T21:30:12.837Z"
          },
          {
            "value": 3297,
            "name": "2016-09-20T05:10:44.880Z"
          },
          {
            "value": 4011,
            "name": "2016-09-23T03:12:50.785Z"
          }
        ]
      },
      {
        "name": "Ccc",
        "series": [
          {
            "value": 5763,
            "name": "2016-09-19T14:41:10.549Z"
          },
          {
            "value": 6937,
            "name": "2016-09-15T10:50:34.955Z"
          },
          {
            "value": 4333,
            "name": "2016-09-22T21:30:12.837Z"
          },
          {
            "value": 4842,
            "name": "2016-09-20T05:10:44.880Z"
          },
          {
            "value": 6708,
            "name": "2016-09-23T03:12:50.785Z"
          }
        ]
      }
    ];
  }

}
