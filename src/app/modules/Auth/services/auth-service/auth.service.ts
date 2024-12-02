import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseurl: string = environment.API_URL + 'api/';
  constructor(private http: HttpClient) {}
  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseurl}auth/authenticate`, data);
  }
  refreshToken(): Observable<any> {
    let object = {
      token: localStorage.getItem('refreshToken'),
    };
    return this.http.post<any>(`${this.baseurl}auth/refreshToken`, object);
  }
  forgotPassword(data: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('email', data);
    return this.http.post<any>(`${this.baseurl}auth/forgot-password`, '', {
      params: params,
    });
  }
  setNewPassword(data: any, token: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('token', token);
    return this.http.post<any>(`${this.baseurl}auth/set-password`, data, {
      params: params,
    });
  }
  setForgotPassword(data: any, token: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('token', token);
    return this.http.post<any>(
      `${this.baseurl}auth/set-forgot-password`,
      data,
      {
        params: params,
      }
    );
  }
  resetPassword(data: any, userId: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseurl}users/${userId}/reset-password`,
      data
    );
  }
}
