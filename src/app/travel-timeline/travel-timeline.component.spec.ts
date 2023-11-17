import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelTimelineComponent } from './travel-timeline.component';

describe('TravelTimelineComponent', () => {
  let component: TravelTimelineComponent;
  let fixture: ComponentFixture<TravelTimelineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelTimelineComponent]
    });
    fixture = TestBed.createComponent(TravelTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
