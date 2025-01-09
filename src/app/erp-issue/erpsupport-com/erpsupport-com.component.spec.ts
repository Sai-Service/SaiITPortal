import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErpsupportComComponent } from './erpsupport-com.component';

describe('ErpsupportComComponent', () => {
  let component: ErpsupportComComponent;
  let fixture: ComponentFixture<ErpsupportComComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErpsupportComComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErpsupportComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
