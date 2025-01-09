import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseService } from 'src/app/api/services/firebase/firebase.service';
import { serverTimestamp } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  images: any;
  showGalleria: boolean = false;
  autoPlayImages: boolean = false;
  activeIndex: number = 0;
  isAdminLogin:boolean=false;
  responsiveOptions: { breakpoint: string; numVisible: number }[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 2,
    },
  ];
  pageLoader: boolean=false;
  constructor(private firebaseService: FirebaseService,private route:ActivatedRoute,private toastr: ToastrService) {}
  ngOnInit() {
    const currentRoute = this.route.snapshot['_routerState'].url.split('/')[1];
    this.isAdminLogin=currentRoute==='admin'
    this.getGallery();
  }
  imageClicked(data) {
    this.showGalleria = true;
    this.images = data.images;
  }
  fullScreen() {
    var elem = document.getElementById('galleria');
    elem.requestFullscreen();
  }
  playImages(){
    this.autoPlayImages=true
  }

  getGallery() {
    this.pageLoader=true
    this.firebaseService.getAllDocuments('gallery').subscribe((data) => {
      this.galleryData = data;
      this.pageLoader=false
    });
  }
  deleteDocument(doc){
    this.firebaseService.deleteDocument('gallery',doc.id).then((res:any) => {
      if(res.success){
        this.toastr.success(res.message);
        this.getGallery();
      }
      else{
        this.toastr.error(res.message);
      }
    })
  }
}
