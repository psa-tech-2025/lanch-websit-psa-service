
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface LeadPayload {
  username: string;
  mobile: string;
  productName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LeadApiService {

  private readonly apiUrl =
    `${environment.apiBase}/api/auth/capture-lead`;

  constructor(private http: HttpClient) {}

  captureLead(
    payload: LeadPayload,
    projectId: string
  ): Observable<any> {

    const headers = new HttpHeaders({
      'x-project-id': projectId
    });

    const requestPayload: LeadPayload = {
      username: payload.username,
      mobile: payload.mobile,
      ...(payload.productName?.trim()
        ? { productName: payload.productName.trim() }
        : {})
    };

    return this.http.post(
      this.apiUrl,
      requestPayload,
      { headers }
    );
  }
}
