import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountReportViewComponent } from './account-report-view.component';

describe('AccountReportViewComponent', () => {
  let component: AccountReportViewComponent;
  let fixture: ComponentFixture<AccountReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountReportViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
