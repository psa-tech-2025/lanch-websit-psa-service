import { TestBed } from '@angular/core/testing';

import { DiolougeService } from './diolouge.service';

describe('DiolougeService', () => {
  let service: DiolougeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiolougeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
