import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformEngineeringComponent } from './platform-engineering.component';

describe('PlatformEngineeringComponent', () => {
  let component: PlatformEngineeringComponent;
  let fixture: ComponentFixture<PlatformEngineeringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatformEngineeringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatformEngineeringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
