import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseService } from 'src/app/api/services/firebase/firebase.service';
import { serverTimestamp } from 'firebase/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalServiceService } from 'src/app/api/services/localStorage/local-service.service';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
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
  constructor(private firebaseService: FirebaseService,private route:ActivatedRoute,private toastr: ToastrService,private LocalService:LocalServiceService,private Router:Router) {}
  ngOnInit() {
    this.LocalService.removeItem('gallery_doc');
    const currentRoute = this.route.snapshot['_routerState'].url.split('/')[1];
    this.isAdminLogin=currentRoute==='admin'
    this.getGallery();
  }
  imageClicked(data) {
    if(!this.isAdminLogin){
      this.showGalleria = true;
      this.images = data.images;
    }else{
    this.LocalService.encriptAndStoreData('gallery_doc', data);
    this.Router.navigate(['/admin/gallery/edit'])
    }
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
