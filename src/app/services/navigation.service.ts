import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() { }

   private readonly ROUTE_ORDER: string[] = [
    '/about-us',
    '/industries/it-services',
    '/industries/food-pharma',
    '/industries/chemicals',
    '/industries/finance',
    '/industries/infra',
    '/industries/automobile',
    '/industries/banking',
    '/industries/agriculture',
    '/industries/ecommerce',
    '/industries/electronics',
    '/service',
    '/devsecops',
    '/devsec',
    '/cloudnative',
    '/platformengi',
    '/agiledevops',
    '/uiux',
    '/mobile-app',
    '/digital-marketing/smm',
    '/digital-marketing/seo',
    '/digital-marketing/smo',
    '/digital-marketing/consulting',
    '/digital-marketing/lead-generation',
    '/digital-marketing/sms',
    '/digital-marketing/whatsapp',
    '/digital-marketing/voice-calling',
    '/instrument-supplier',
    '/staffing',
    '/careers',
    '/blog',
    '/contact'
  ];
    getRoutes() {
    return this.ROUTE_ORDER;
  }

}
