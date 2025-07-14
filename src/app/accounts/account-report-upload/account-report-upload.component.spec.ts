import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule,FormBuilder,FormControl } from '@angular/forms';
import { AccountReportUploadComponent } from './account-report-upload.component';

describe('AccountReportUploadComponent', () => {
  let component: AccountReportUploadComponent;
  let fixture: ComponentFixture<AccountReportUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountReportUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountReportUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
