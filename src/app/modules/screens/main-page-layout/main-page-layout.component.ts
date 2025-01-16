import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/api/services/firebase/firebase.service';
import { GalleryService } from 'src/app/api/services/gallery/gallery.service';
import { LocalServiceService } from 'src/app/api/services/localStorage/local-service.service';
import { ImageData, userData } from 'src/app/common/models/interfaces';

@Component({
  selector: 'app-main-page-layout',
  templateUrl: './main-page-layout.component.html',
  styleUrls: ['./main-page-layout.component.scss'],
})
export class MainPageLayoutComponent {
  mainImageData: ImageData = {
    url: '',
    uploadedAt: '',
    uploadedBy: '',
  };
  isUploading = false;
  uploadProgress = 0;
  galleryImages: any[] = [];
  pageLoader: boolean = false;
  userDetails: userData = {
    lastName: '',
    firstName: '',
    email: '',
    contactNumber: 0,
  };
  ImagesCollectionName: string = 'homeLayoutImages';
  layoutCollectionName: string = 'homeLayout';
  layoutDocumentId:string='homeImage'
  constructor(
    private firebaseService: FirebaseService,
    private toastr: ToastrService,
    private LocalService: LocalServiceService,
    private galleryService: GalleryService
  ) {}

  ngOnInit() {
    this.getMainPageLayoutData();
    this.getMainPageImagesData();
    this.getUserDetails();
  }
  getUserDetails() {
    this.LocalService.getItem('user_details')
      ? (this.userDetails = JSON.parse(
          this.LocalService.getItem('user_details')
        ))
      : {};
  }
  setAsMainImage(imageData): void {
    const payload = {
      url: imageData.url,
      updatedAt: new Date(),
      updatedBy: `${this.userDetails.firstName} ${this.userDetails.lastName}`,
    };
    this.firebaseService
      .updateDocument(this.layoutCollectionName, this.layoutDocumentId, payload)
      .then((res: any) => {
        this.toastr.success('Image set as main image successfully');
        this.mainImageData = {
          ...this.mainImageData,
          url: imageData.url,
        };
      });
  }

  deleteImage(imageData): void {
    if (
      imageData.url !== this.mainImageData.url &&
      confirm('Are you sure you want to delete this image?')
    ) {
      this.firebaseService
        .deleteDocument(this.ImagesCollectionName, imageData.id)
        .then((res: any) => {
          this.galleryImages = this.galleryImages.filter(
            (img) => img.url !== imageData.url
          );
          this.toastr.success('Image deleted successfully');
        });
    }
  }

  async onFileSelected(event: any): Promise<void> {
    const files = event.target.files;
    if (!files || !files[0]) return;

    const progressInterval = setInterval(() => {
      if (this.uploadProgress < 90) this.uploadProgress += 10;
    }, 200);

    try {
      this.isUploading = true;
      const filesArray = Array.from(files);

      const response = await this.galleryService
        .uploadMultipleImages(filesArray)
        .toPromise();

      response.map(async (res) => {
        const docId = new Date().getTime().toString();
        const payload = {
          url: res.secure_url,
          updatedAt: new Date(),
          updatedBy: `${this.userDetails.firstName} ${this.userDetails.lastName}`,
        };

        await this.firebaseService.addCollection(
          this.ImagesCollectionName,
          docId,
          payload
        );
        this.galleryImages = [...this.galleryImages, payload];

        if (!this.mainImageData.url) {
          this.mainImageData.url = payload.url;
        }
      });

      this.uploadProgress = 100;
      this.toastr.success('Images uploaded successfully');
    } catch (error) {
      console.error('Upload failed:', error);
      this.toastr.error('Failed to upload images');
    } finally {
      clearInterval(progressInterval);
      this.isUploading = false;
      event.target.value = '';

      setTimeout(() => {
        this.uploadProgress = 0;
      }, 1000);
    }
  }
  getMainPageLayoutData() {
    this.firebaseService
      .getDocument(this.layoutCollectionName, this.layoutDocumentId)
      .subscribe((res: any) => {
        this.mainImageData = { id: res.id, ...res.data };
      });
  }
  getMainPageImagesData() {
    this.pageLoader = true;
    this.firebaseService
      .getAllDocuments(this.ImagesCollectionName)
      .subscribe((res: any) => {
        this.galleryImages = res;
        setTimeout(() => {
          this.pageLoader = false;
        }, 1000);
      });
  }
}
