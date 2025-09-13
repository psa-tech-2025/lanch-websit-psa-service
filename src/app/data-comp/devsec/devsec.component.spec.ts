import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevsecComponent } from './devsec.component';

describe('DevsecComponent', () => {
  let component: DevsecComponent;
  let fixture: ComponentFixture<DevsecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevsecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevsecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
