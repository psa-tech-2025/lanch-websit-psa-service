import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavControlsComponent } from './nav-controls.component';

describe('NavControlsComponent', () => {
  let component: NavControlsComponent;
  let fixture: ComponentFixture<NavControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
