export type WhatsappRole =
  | 'SUPER_ADMIN'
  | 'CAMPAIGN_MANAGER'
  | 'VIEWER';


export interface WhatsappNumber {

  _id: string;

  displayNumber: string;

  businessName: string;

  phoneNumberId: string;

  businessAccountId?: string;

  status:
    | 'CONNECTED'
    | 'DISCONNECTED'
    | 'PENDING';

  active: boolean;

  authorizedUsers?: string[];

}


export interface WhatsappUser {

  _id: string;

  userId?: string;

  name: string;

  email: string;

  role:
    | 'CAMPAIGN_MANAGER'
    | 'VIEWER';

  active: boolean;

}


export interface WhatsappTemplate {

  _id: string;

  name: string;

  language: string;

  category: string;

  status:
    | 'APPROVED'
    | 'PENDING'
    | 'REJECTED';

  body: string;

  metaTemplateId?: string;

}


export interface Campaign {

  _id: string;

  name: string;

  templateName: string;

  languageCode: string;

  bodyParameters: string[];

  whatsappNumberId:
    | string
    | WhatsappNumber;

  total: number;

  queued: number;

  sent: number;

  delivered: number;

  read: number;

  failed: number;

  skipped: number;

  status:
    | 'draft'
    | 'processing'
    | 'completed'
    | 'failed';

  createdAt: string;

  updatedAt: string;

}