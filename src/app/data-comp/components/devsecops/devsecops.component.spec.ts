import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevsecopsComponent } from './devsecops.component';

describe('DevsecopsComponent', () => {
  let component: DevsecopsComponent;
  let fixture: ComponentFixture<DevsecopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevsecopsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevsecopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
