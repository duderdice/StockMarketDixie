import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTickerTapeComponent } from './app-ticker-tape.component';

describe('AppTickerTapeComponent', () => {
  let component: AppTickerTapeComponent;
  let fixture: ComponentFixture<AppTickerTapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTickerTapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTickerTapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
