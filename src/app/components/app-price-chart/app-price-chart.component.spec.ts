import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPriceChartComponent } from './app-price-chart.component';

describe('AppPriceChartComponent', () => {
  let component: AppPriceChartComponent;
  let fixture: ComponentFixture<AppPriceChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppPriceChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPriceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
