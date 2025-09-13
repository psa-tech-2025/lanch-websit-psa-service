import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgileDevopsComponent } from './agile-devops.component';

describe('AgileDevopsComponent', () => {
  let component: AgileDevopsComponent;
  let fixture: ComponentFixture<AgileDevopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgileDevopsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgileDevopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
