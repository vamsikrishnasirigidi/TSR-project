import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalServiceService } from '../localStorage/local-service.service';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private baseUrl: string = environment.API_URL + 'api/users/';
  userId = localStorage.getItem('userId');
  userRole = localStorage.getItem('role');
  constructor(
    private http: HttpClient,
    private localService: LocalServiceService
  ) {
    this.localService.userId.subscribe((id) => {
      this.userId = id;
    });
    this.localService.userRole.subscribe((role) => {
      this.userRole = role;
    });
  }
  getUsers(
    id: number,
    pageNumber?: number,
    pageSize?: number,
    search = ''
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);
    params = params.append('search', search);
    if (this.userRole === 'superAdmin') {
      return this.http.get<any>(`${this.baseUrl}${this.userId}/${id}`, {
        params: params,
      });
    } else {
      return this.http.get<any>(
        `${this.baseUrl}${this.userId}/organization-users`,
        {
          params: params,
        }
      );
    }
  }
  createUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${this.userId}`, data);
  }
  updateUser(data: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}${this.userId}/${id}`, data);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}${this.userId}/${id}`);
  }
  deleteOrganizationUser(
    userID: number,
    organizationId: number
  ): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}${this.userId}/${userID}`);
  }
}
