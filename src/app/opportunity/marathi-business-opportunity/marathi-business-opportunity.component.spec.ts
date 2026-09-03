import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarathiBusinessOpportunityComponent } from './marathi-business-opportunity.component';

describe('MarathiBusinessOpportunityComponent', () => {
  let component: MarathiBusinessOpportunityComponent;
  let fixture: ComponentFixture<MarathiBusinessOpportunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarathiBusinessOpportunityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarathiBusinessOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
