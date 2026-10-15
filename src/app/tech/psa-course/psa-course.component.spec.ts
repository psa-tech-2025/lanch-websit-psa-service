import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsaCourseComponent } from './psa-course.component';

describe('PsaCourseComponent', () => {
  let component: PsaCourseComponent;
  let fixture: ComponentFixture<PsaCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsaCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsaCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
