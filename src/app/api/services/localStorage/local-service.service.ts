import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalServiceService {
  errorLoader = new EventEmitter<boolean>();
  userId = new EventEmitter<string>();
  userRole = new EventEmitter<string>();
  constructor() {}
  getItem(key: string, type: string = 'string') {
    if (type === 'object') {
      return JSON.parse(localStorage.getItem(key));
    } else return localStorage.getItem(key);
  }
  setItem(key: string, value: any, type: string = 'string') {
    if (type === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else localStorage.setItem(key, value);
  }
  clear() {
    localStorage.clear();
  }
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}
