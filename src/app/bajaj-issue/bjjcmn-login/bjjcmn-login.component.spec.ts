import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BjjcmnLoginComponent } from './bjjcmn-login.component';

describe('BjjcmnLoginComponent', () => {
  let component: BjjcmnLoginComponent;
  let fixture: ComponentFixture<BjjcmnLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BjjcmnLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BjjcmnLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
