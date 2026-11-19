import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GramPanchayatWebsiteComponent } from './gram-panchayat-website.component';

describe('GramPanchayatWebsiteComponent', () => {
  let component: GramPanchayatWebsiteComponent;
  let fixture: ComponentFixture<GramPanchayatWebsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GramPanchayatWebsiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GramPanchayatWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
