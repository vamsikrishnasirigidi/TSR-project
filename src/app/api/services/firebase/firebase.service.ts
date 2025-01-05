import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  app = initializeApp(environment.firebase);
  constructor(private firestore: AngularFirestore) {}
  getAllDocuments(collectionName: string): Observable<any[]> {
    return this.firestore.collection(collectionName).snapshotChanges()
      .pipe(
        map(actions => actions.map((a:any) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }
  getDocument(collectionName: string, documentId: string): Observable<any> {
    return this.firestore.collection(collectionName).doc(documentId).snapshotChanges()
      .pipe(
        map(action => {
          if (action.payload.exists) {
            const data = action.payload.data();
            const id = action.payload.id;
            return { id, data };
          }
          return null;
        })
      );
  }
  async addDocument(collectionName: string, data: any) {
    try {
      // Add timestamp to the document
      const documentData = {
        ...data,
        createdAt: new Date()
      };
      const docRef = await this.firestore.collection(collectionName).add(documentData);
      console.log('Document added with ID: ', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding document: ', error);
      throw error;
    }
  }
  addCollection(collectionName: string, documentName:string,data: any) {
   return this.firestore.collection(collectionName).doc(documentName).set(data);
  }
  deleteDocument(collection:string, id: string) {
    const docRef = this.firestore.collection(collection).doc(id);
    return docRef.get()
      .toPromise()
      .then(doc => {
        if (doc.exists) {
          return docRef.delete()
            .then(() => {
              return { success: true, message: 'Document deleted successfully' };
            })
            .catch(error => {
              return { success: false, message: 'Error deleting document', error };
            });
        } else {
          return { success: false, message: 'Document does not exist' };
        }
      })
      .catch(error => {
        return { success: false, message: 'Error checking document', error };
      });
  }
}
