import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhloguploadComponent } from './nhlogupload.component';

describe('NhloguploadComponent', () => {
  let component: NhloguploadComponent;
  let fixture: ComponentFixture<NhloguploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NhloguploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NhloguploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
