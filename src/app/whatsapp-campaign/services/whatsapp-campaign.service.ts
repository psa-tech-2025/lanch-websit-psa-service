import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment }
  from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WhatsappCampaignService {

  private apiUrl =
    environment.whatsappCampaignApiUrl;


  constructor(
    private http: HttpClient
  ) {}


  // ==========================================
  // DASHBOARD
  // ==========================================

  getDashboard(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/dashboard`
    );

  }


  // ==========================================
  // NUMBERS
  // ==========================================

  getWhatsappNumbers(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/numbers`
    );

  }


  getWhatsappNumber(
    id: string
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/numbers/${id}`
    );

  }


  connectWhatsappNumber(
    data: any
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/numbers/connect`,
      data
    );

  }


  removeWhatsappNumber(
    id: string
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/numbers/${id}`
    );

  }


  // ==========================================
  // AUTHORIZED USERS
  // ==========================================

getAuthorizedUsers(numberId: string) {
  return this.http.get(
    `${environment.whatsappCampaignApiUrl}/${numberId}/users`
  );
}


authorizeUser(numberId: string, data: any) {
  return this.http.post(
    `${environment.whatsappCampaignApiUrl}/${numberId}/users`,
    data
  );
}
removeAuthorizedUser(numberId: string, userId: string) {
  return this.http.delete(
    `${environment.whatsappCampaignApiUrl}/${numberId}/users/${userId}`
  );
}


  // ==========================================
  // TEMPLATES
  // ==========================================

  getTemplates(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/templates`
    );

  }


  createTemplate(
    data: any
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/templates`,
      data
    );

  }


  deleteTemplate(
    id: string
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/templates/${id}`
    );

  }


  // ==========================================
  // CAMPAIGNS
  // ==========================================

  getCampaigns(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/campaigns`
    );

  }


  importCampaign(
    formData: FormData
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/campaigns/import`,
      formData
    );

  }


  getCampaign(
    campaignId: string
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/campaigns/${campaignId}`
    );

  }


  startCampaign(
    campaignId: string
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/campaigns/${campaignId}/start`,
      {}
    );

  }


  // ==========================================
  // REPORTS
  // ==========================================

  getReports(
    from?: string,
    to?: string
  ): Observable<any> {

    let params =
      new HttpParams();


    if (from) {

      params =
        params.set(
          'from',
          from
        );

    }


    if (to) {

      params =
        params.set(
          'to',
          to
        );

    }


    return this.http.get(
      `${this.apiUrl}/reports`,
      { params }
    );

  }

getCampaignRecipients(
  campaignId: string,
  page: number = 1,
  limit: number = 25,
  status?: string,
  search?: string
) {
  let params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString());

  if (status) {
    params = params.set('status', status);
  }

  if (search) {
    params = params.set(
      'search',
      search.trim()
    );
  }

  return this.http.get(
    `${this.apiUrl}/campaigns/${campaignId}/recipients`,
    { params }
  );
}

}