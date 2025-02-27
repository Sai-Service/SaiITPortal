import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErpsupportreportComponent } from './erpsupportreport.component';

describe('ErpsupportreportComponent', () => {
  let component: ErpsupportreportComponent;
  let fixture: ComponentFixture<ErpsupportreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErpsupportreportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErpsupportreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
