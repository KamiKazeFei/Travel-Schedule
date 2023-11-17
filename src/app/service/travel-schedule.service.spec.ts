import { TestBed } from '@angular/core/testing';

import { TravelScheduleService } from './travel-schedule.service';

describe('TravelScheduleService', () => {
  let service: TravelScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
