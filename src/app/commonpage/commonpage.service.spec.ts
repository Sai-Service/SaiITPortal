import { TestBed } from '@angular/core/testing';

import { CommonpageService } from './commonpage.service';

describe('CommonpageService', () => {
  let service: CommonpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
