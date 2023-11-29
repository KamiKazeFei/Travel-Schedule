import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelLoginComponent } from './travel-login.component';

describe('TravelLoginComponent', () => {
  let component: TravelLoginComponent;
  let fixture: ComponentFixture<TravelLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelLoginComponent]
    });
    fixture = TestBed.createComponent(TravelLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
