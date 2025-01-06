import { TestBed } from '@angular/core/testing';

import { ErpIssueService } from './erp-issue.service';

describe('ErpIssueService', () => {
  let service: ErpIssueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErpIssueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

