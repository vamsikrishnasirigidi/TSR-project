import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private cloudName = 'djblpphro';
  private uploadPreset = 'gallery';
  private apiUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;

  constructor(private http: HttpClient,private db: AngularFirestore) {}
  uploadMultipleImages(files: File[]): Observable<any[]> {
    const uploadPromises = files.map(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', this.uploadPreset);
      
      return this.http.post(this.apiUrl, formData).toPromise();
    });

    return from(Promise.all(uploadPromises));
  }
  getProperty(id: string): Observable<any> {
    return this.db.doc<any>(`properties/${id}`).valueChanges();
  }

  updateProperty(property: any) {
    return from(this.db.doc(`properties/${property.id}`).update(property));
  }

  // Implement image upload/delete methods
  uploadImages(files: FileList) {
    // Handle upload to Cloudinary
  }

  deleteImage(url: string) {
    // Handle deletion from storage
  }
}
