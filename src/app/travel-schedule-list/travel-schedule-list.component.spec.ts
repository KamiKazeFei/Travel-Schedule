import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelScheduleListComponent } from './travel-schedule-list.component';

describe('TravelScheduleListComponent', () => {
  let component: TravelScheduleListComponent;
  let fixture: ComponentFixture<TravelScheduleListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelScheduleListComponent]
    });
    fixture = TestBed.createComponent(TravelScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
