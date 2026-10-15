
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LiveCourse } from '../../models/live-course';


@Injectable({
  providedIn: 'root'
})
export class LiveCourseService {
  private BASE_URL = environment.apiBase;
  private baseUrl = `${this.BASE_URL}/api`;

  constructor(private http: HttpClient) {}

  // GET ALL COURSES FROM PRODUCTS API
  getAllProducts(
    projectId: string = 'Ecom-02'
  ): Observable<LiveCourse[]> {
    const headers = new HttpHeaders({
      'x-project-id': projectId
    });

    return this.http.get<LiveCourse[]>(
      `${this.baseUrl}/products`,
      { headers }
    );
  }

  // GET ONE COURSE/PRODUCT BY ID
  getProductById(
    idOrCode: string,
    projectId: string = 'Ecom-02'
  ): Observable<LiveCourse> {
    const headers = new HttpHeaders({
      'x-project-id': projectId
    });

    return this.http.get<LiveCourse>(
      `${this.baseUrl}/products/${encodeURIComponent(idOrCode)}`,
      { headers }
    );
  }
}
