import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaiuserhomepageComponent } from './saiuserhomepage.component';

describe('SaiuserhomepageComponent', () => {
  let component: SaiuserhomepageComponent;
  let fixture: ComponentFixture<SaiuserhomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaiuserhomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaiuserhomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
