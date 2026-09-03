import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessWebsiteMarathiComponent } from './business-website-marathi.component';

describe('BusinessWebsiteMarathiComponent', () => {
  let component: BusinessWebsiteMarathiComponent;
  let fixture: ComponentFixture<BusinessWebsiteMarathiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessWebsiteMarathiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessWebsiteMarathiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
