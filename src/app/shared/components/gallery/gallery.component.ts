import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  headerText: string = 'Built & open ONLY to plot owners, outside public is NOT allowed!';
  
  galleryImages: any[] = [
    {
      id: 1,
      imageUrl: 'https://dummyjson.com/image/150',
      title: 'Royal Woods',
      location: 'ANANDAPURAM',
      developer: 'TSR Infra Developers'
    },
    {
      id: 2,
      imageUrl: 'https://dummyjson.com/image/150',
      title: 'Royal Woods',
      location: 'ANANDAPURAM',
      developer: 'TSR Infra Developers'
    },
    {
      id: 3,
      imageUrl: 'https://dummyjson.com/image/150',
      title: 'Royal Woods',
      location: 'ANANDAPURAM',
      developer: 'TSR Infra Developers'
    },
    {
      id: 2,
      imageUrl: 'https://dummyjson.com/image/150',
      title: 'Royal Woods',
      location: 'ANANDAPURAM',
      developer: 'TSR Infra Developers'
    },
    {
      id: 3,
      imageUrl: 'https://dummyjson.com/image/150',
      title: 'Royal Woods',
      location: 'ANANDAPURAM',
      developer: 'TSR Infra Developers'
    },
    {
      id: 3,
      imageUrl: 'https://dummyjson.com/image/150',
      title: 'Royal Woods',
      location: 'ANANDAPURAM',
      developer: 'TSR Infra Developers'
    }
  ];
}
