import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudeNativeComponent } from './cloude-native.component';

describe('CloudeNativeComponent', () => {
  let component: CloudeNativeComponent;
  let fixture: ComponentFixture<CloudeNativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloudeNativeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloudeNativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
