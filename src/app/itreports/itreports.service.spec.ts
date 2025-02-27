import { TestBed } from '@angular/core/testing';

import { ItreportsService } from './itreports.service';

describe('ItreportsService', () => {
  let service: ItreportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItreportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
