import { TestBed } from '@angular/core/testing';

import { FormvalidatorService } from './formvalidator.service';

describe('FormvalidatorService', () => {
  let service: FormvalidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormvalidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
