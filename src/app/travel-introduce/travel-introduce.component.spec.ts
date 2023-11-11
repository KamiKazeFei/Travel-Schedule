import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelIntroduceComponent } from './travel-introduce.component';

describe('TravelIntroduceComponent', () => {
  let component: TravelIntroduceComponent;
  let fixture: ComponentFixture<TravelIntroduceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelIntroduceComponent]
    });
    fixture = TestBed.createComponent(TravelIntroduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
