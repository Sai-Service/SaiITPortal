import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewreportsallComponent } from './viewreportsall.component';

describe('ViewreportsallComponent', () => {
  let component: ViewreportsallComponent;
  let fixture: ComponentFixture<ViewreportsallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewreportsallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewreportsallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
