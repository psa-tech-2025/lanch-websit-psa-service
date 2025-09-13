import { TestBed } from '@angular/core/testing';

import { ValiditionMsgService } from './validition-msg.service';

describe('ValiditionMsgService', () => {
  let service: ValiditionMsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValiditionMsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
