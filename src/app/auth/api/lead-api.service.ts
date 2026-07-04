import { Injectable } from '@angular/core';
import {
HttpClient,
HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

export interface LeadPayload {
username: string;
mobile: string;
}

@Injectable({
providedIn: 'root'
})
export class LeadApiService {

private apiUrl =
'https://api.psatechall.com/api/ecom/api/auth/capture-lead';

constructor(
private http: HttpClient
) {}

captureLead(
payload: LeadPayload,
projectId: string
): Observable<any> {


const headers = new HttpHeaders({
  'x-project-id': projectId
});

return this.http.post(
  this.apiUrl,
  payload,
  { headers }
);


}

}
