import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  settingsOrganizationObject,
  settingsOrganizationResponse,
  settingsUpdateUserResponse,
  settingsUserResponse,
  settingsUserUpdateObject,
} from 'src/app/common/models/interfaces';
import { environment } from 'src/environments/environment';
import { LocalServiceService } from '../localStorage/local-service.service';
@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private baseUrl: string = environment.API_URL + 'api/user';
  userId = localStorage.getItem('userId');
  logoChanges = new EventEmitter<boolean>();
  constructor(
    private http: HttpClient,
    private localService: LocalServiceService
  ) {
    this.localService.userId.subscribe((id) => {
      this.userId = id;
    });
  }
  getOrganizationDetails(): Observable<settingsOrganizationResponse> {
    return this.http.get<settingsOrganizationResponse>(
      `${this.baseUrl}/${this.userId}/organization`
    );
  }
  updateOrganizationDetails(
    data: any
  ): Observable<settingsOrganizationResponse> {
    return this.http.put<settingsOrganizationResponse>(
      `${this.baseUrl}/${this.userId}/update-organization`,
      data
    );
  }
  getUserDetails(): Observable<settingsUserResponse> {
    return this.http.get<settingsUserResponse>(
      `${this.baseUrl}s/${this.userId}/user-profile`
    );
  }
  updateUserDetails(data: any): Observable<settingsUpdateUserResponse> {
    return this.http.put<settingsUpdateUserResponse>(
      `${this.baseUrl}/${this.userId}/update-user-profile`,
      data
    );
  }
}
