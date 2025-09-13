import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiolougeCompComponent } from './diolouge-comp.component';

describe('DiolougeCompComponent', () => {
  let component: DiolougeCompComponent;
  let fixture: ComponentFixture<DiolougeCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiolougeCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiolougeCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
