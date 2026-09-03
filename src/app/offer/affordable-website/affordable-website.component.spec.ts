import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffordableWebsiteComponent } from './affordable-website.component';

describe('AffordableWebsiteComponent', () => {
  let component: AffordableWebsiteComponent;
  let fixture: ComponentFixture<AffordableWebsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffordableWebsiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffordableWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
