import { TestBed } from '@angular/core/testing';

import { WhatsappCampaignService } from './whatsapp-campaign.service';

describe('WhatsappCampaignService', () => {
  let service: WhatsappCampaignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhatsappCampaignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
