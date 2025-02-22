import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajajsupportComComponent } from './bajajsupport-com.component';

describe('BajajsupportComComponent', () => {
  let component: BajajsupportComComponent;
  let fixture: ComponentFixture<BajajsupportComComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BajajsupportComComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BajajsupportComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
