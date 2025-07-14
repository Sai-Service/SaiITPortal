import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdftoimgComponent } from './pdftoimg.component';

describe('PdftoimgComponent', () => {
  let component: PdftoimgComponent;
  let fixture: ComponentFixture<PdftoimgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdftoimgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdftoimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
