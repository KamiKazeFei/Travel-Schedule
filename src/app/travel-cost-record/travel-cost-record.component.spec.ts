import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelCostRecordComponent } from './travel-cost-record.component';

describe('TravelCostRecordComponent', () => {
  let component: TravelCostRecordComponent;
  let fixture: ComponentFixture<TravelCostRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelCostRecordComponent]
    });
    fixture = TestBed.createComponent(TravelCostRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
