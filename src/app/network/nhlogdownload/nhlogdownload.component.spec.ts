import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhlogdownloadComponent } from './nhlogdownload.component';

describe('NhlogdownloadComponent', () => {
  let component: NhlogdownloadComponent;
  let fixture: ComponentFixture<NhlogdownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NhlogdownloadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NhlogdownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
