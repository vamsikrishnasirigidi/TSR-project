import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private cloudName = 'djblpphro';
  private uploadPreset = 'gallery';
  private apiUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;

  constructor(private http: HttpClient) {}
  uploadMultipleImages(files: File[]): Observable<any[]> {
    const uploadPromises = files.map(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', this.uploadPreset);
      
      return this.http.post(this.apiUrl, formData).toPromise();
    });

    return from(Promise.all(uploadPromises));
  }
}
