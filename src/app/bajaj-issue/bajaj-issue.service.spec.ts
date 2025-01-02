import { TestBed } from '@angular/core/testing';

import { BajajIssueService } from './bajaj-issue.service';

describe('BajajIssueService', () => {
  let service: BajajIssueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BajajIssueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
