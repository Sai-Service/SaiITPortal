import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { erpauthGuard } from './erpauth.guard';

describe('erpauthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => erpauthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
