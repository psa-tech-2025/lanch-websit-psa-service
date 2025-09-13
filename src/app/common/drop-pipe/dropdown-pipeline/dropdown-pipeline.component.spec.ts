import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPipelineComponent } from './dropdown-pipeline.component';

describe('DropdownPipelineComponent', () => {
  let component: DropdownPipelineComponent;
  let fixture: ComponentFixture<DropdownPipelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownPipelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
