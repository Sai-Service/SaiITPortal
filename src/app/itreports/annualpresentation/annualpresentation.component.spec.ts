import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualpresentationComponent } from './annualpresentation.component';

describe('AnnualpresentationComponent', () => {
  let component: AnnualpresentationComponent;
  let fixture: ComponentFixture<AnnualpresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnnualpresentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnualpresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
