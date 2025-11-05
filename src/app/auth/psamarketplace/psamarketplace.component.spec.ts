import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsamarketplaceComponent } from './psamarketplace.component';

describe('PsamarketplaceComponent', () => {
  let component: PsamarketplaceComponent;
  let fixture: ComponentFixture<PsamarketplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsamarketplaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsamarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
