import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsaJobComponent } from './psa-job.component';

describe('PsaJobComponent', () => {
  let component: PsaJobComponent;
  let fixture: ComponentFixture<PsaJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsaJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsaJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
