import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppInfoPanelComponent } from './app-info-panel.component';

describe('AppInfoPanelComponent', () => {
  let component: AppInfoPanelComponent;
  let fixture: ComponentFixture<AppInfoPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppInfoPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppInfoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
