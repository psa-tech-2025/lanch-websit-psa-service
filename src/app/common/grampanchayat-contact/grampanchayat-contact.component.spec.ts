import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrampanchayatContactComponent } from './grampanchayat-contact.component';

describe('GrampanchayatContactComponent', () => {
  let component: GrampanchayatContactComponent;
  let fixture: ComponentFixture<GrampanchayatContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrampanchayatContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrampanchayatContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
