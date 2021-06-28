import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppStockInfoComponent } from './app-stock-info.component';

describe('AppStockInfoComponent', () => {
  let component: AppStockInfoComponent;
  let fixture: ComponentFixture<AppStockInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppStockInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppStockInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
