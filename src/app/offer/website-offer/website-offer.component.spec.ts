import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteOfferComponent } from './website-offer.component';

describe('WebsiteOfferComponent', () => {
  let component: WebsiteOfferComponent;
  let fixture: ComponentFixture<WebsiteOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsiteOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebsiteOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
