import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelHomeComponent } from './travel-home.component';

describe('TravelHomeComponent', () => {
  let component: TravelHomeComponent;
  let fixture: ComponentFixture<TravelHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelHomeComponent]
    });
    fixture = TestBed.createComponent(TravelHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
