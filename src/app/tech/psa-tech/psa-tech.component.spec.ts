import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsaTechComponent } from './psa-tech.component';

describe('PsaTechComponent', () => {
  let component: PsaTechComponent;
  let fixture: ComponentFixture<PsaTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsaTechComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsaTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
