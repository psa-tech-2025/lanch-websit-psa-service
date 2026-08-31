import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovtHospitalComponent } from './govt-hospital.component';

describe('GovtHospitalComponent', () => {
  let component: GovtHospitalComponent;
  let fixture: ComponentFixture<GovtHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovtHospitalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovtHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
