import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIssueLogComponent } from './user-issue-log.component';

describe('UserIssueLogComponent', () => {
  let component: UserIssueLogComponent;
  let fixture: ComponentFixture<UserIssueLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserIssueLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserIssueLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
