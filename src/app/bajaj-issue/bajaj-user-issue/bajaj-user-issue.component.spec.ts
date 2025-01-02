import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajajUserIssueComponent } from './bajaj-user-issue.component';

describe('BajajUserIssueComponent', () => {
  let component: BajajUserIssueComponent;
  let fixture: ComponentFixture<BajajUserIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BajajUserIssueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BajajUserIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
