import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItcomponentComponent } from './itcomponent.component';

describe('ItcomponentComponent', () => {
  let component: ItcomponentComponent;
  let fixture: ComponentFixture<ItcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
