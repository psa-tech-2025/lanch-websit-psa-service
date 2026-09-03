import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPartnershipComponent } from './business-partnership.component';

describe('BusinessPartnershipComponent', () => {
  let component: BusinessPartnershipComponent;
  let fixture: ComponentFixture<BusinessPartnershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessPartnershipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessPartnershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
