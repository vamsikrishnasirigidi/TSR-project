import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseService } from 'src/app/api/services/firebase/firebase.service';
import { serverTimestamp } from 'firebase/firestore';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  headerText: string =
    'Built & open ONLY to plot owners, outside public is NOT allowed!';
  documents$: Observable<any[]>;
  galleryData: any[] = [];
  constructor(private firebaseService: FirebaseService) {}
  ngOnInit() {
    this.getGallery();
  }

  getGallery() {
    this.firebaseService.getAllDocuments('gallery').subscribe((data) => {
      this.galleryData = data;
    });
  }
}
