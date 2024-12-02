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
  removeItem(key: string) {
    localStorage.removeItem(key);
  }
  removeArrayOfKeys(array) {
    array.forEach((key) => {
      localStorage.removeItem(key);
    });
  }
  encriptAndStoreData(key:string,data:any) {
    const encriptedData = btoa(JSON.stringify(data));
    localStorage.setItem(key, encriptedData);
  }
  getDecryptedData(key:string) {
    const encryptedData = localStorage.getItem(key);
    return JSON.parse(atob(encryptedData))
  }
}
