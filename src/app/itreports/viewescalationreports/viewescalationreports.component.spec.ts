import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewescalationreportsComponent } from './viewescalationreports.component';

describe('ViewescalationreportsComponent', () => {
  let component: ViewescalationreportsComponent;
  let fixture: ComponentFixture<ViewescalationreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewescalationreportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewescalationreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
