import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelManagerComponent } from './excel-manager.component';

describe('ExcelManagerComponent', () => {
  let component: ExcelManagerComponent;
  let fixture: ComponentFixture<ExcelManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcelManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
