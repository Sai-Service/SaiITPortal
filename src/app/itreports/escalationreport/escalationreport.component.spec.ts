import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalationreportComponent } from './escalationreport.component';

describe('EscalationreportComponent', () => {
  let component: EscalationreportComponent;
  let fixture: ComponentFixture<EscalationreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EscalationreportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscalationreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
