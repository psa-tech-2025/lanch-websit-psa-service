import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsaServiceComponent } from './psa-service.component';

describe('PsaServiceComponent', () => {
  let component: PsaServiceComponent;
  let fixture: ComponentFixture<PsaServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsaServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsaServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
