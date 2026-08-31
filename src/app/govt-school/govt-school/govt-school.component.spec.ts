import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovtSchoolComponent } from './govt-school.component';

describe('GovtSchoolComponent', () => {
  let component: GovtSchoolComponent;
  let fixture: ComponentFixture<GovtSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovtSchoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovtSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
