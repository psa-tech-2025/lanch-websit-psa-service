import { TestBed } from '@angular/core/testing';

import { WhatsappRoleGuard } from './whatsapp-role.guard';

describe('WhatsappRoleGuard', () => {
  let guard: WhatsappRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WhatsappRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
