import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080';
  private swaggerUrl = 'http://localhost:8080/swagger-ui/index.html#/';
  constructor(private http: HttpClient) { }
  
  getSwaggerUrl(): string {
    return this.swaggerUrl;
  }
  getCountries(): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/countries`);
  }

  getPandemics(): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/pandemics`);
  }
  
  getInfectionByPandemics(): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/infections/pandemics/{id}`);
  }

  getInfectionByCountries(): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/infections/countries/{id}`);
  }

  getReportsBypandemics(): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/reports/pandemics/{id}`);
  }

  getReportsByCountries(): Observable<any> 
  {
    return this.http.get(`${this.apiUrl}/reports/countries/{id}`);
  }

  getReportByDate(): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/reports/date/{date}`);
  }

  postCountries(data: any): Observable<any>
  {
    return this.http.post(`${this.apiUrl}/countries`, data);
  }
  
  postPandemics(data: any): Observable<any>
  {
    return this.http.post(`${this.apiUrl}/pandemics`, data);
  }

  postInfection(data: any): Observable<any>
  {
    return this.http.post(`${this.apiUrl}/infections`, data);
  }

  patchCountries(id: number, data: any): Observable<any>
  {
    return this.http.patch(`${this.apiUrl}/countries/${id}`, data);
  }

  patchPandemics(id: number, data: any): Observable<any>
  {
    return this.http.patch(`${this.apiUrl}/pandemics/${id}`, data);
  }

  patchInfections(id: number, data: any): Observable<any>
  {
    return this.http.patch(`${this.apiUrl}/infections/${id}`, data);
  }

  patchReports(id: number, data: any): Observable<any>
  {
    return this.http.patch(`${this.apiUrl}/reports/${id}`, data);
  }

  deleteCountries(id: number): Observable<any>
  {
    return this.http.delete(`${this.apiUrl}/countries/${id}`);
  }

  deletePandemics(id: number): Observable<any>
  {
    return this.http.delete(`${this.apiUrl}/pandemics/${id}`);
  }

  deleteInfections(id: number): Observable<any>
  {
    return this.http.delete(`${this.apiUrl}/infections/${id}`);
  }

  deleteReports(id: number): Observable<any>
  {
    return this.http.delete(`${this.apiUrl}/reports/${id}`);
  }


}
