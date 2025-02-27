import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeoreportsComponent } from './ceoreports.component';

describe('CeoreportsComponent', () => {
  let component: CeoreportsComponent;
  let fixture: ComponentFixture<CeoreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CeoreportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CeoreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
