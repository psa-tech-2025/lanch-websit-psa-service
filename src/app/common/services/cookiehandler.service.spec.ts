import { TestBed } from '@angular/core/testing';

import { CookiehandlerService } from './cookiehandler.service';

describe('CookiehandlerService', () => {
  let service: CookiehandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookiehandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
