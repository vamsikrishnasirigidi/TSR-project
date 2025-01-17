import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LocalServiceService } from 'src/app/api/services/localStorage/local-service.service';
import { inputRequiredValidations, minLengthValidations } from 'src/app/common/utils';
import { GalleryService } from 'src/app/api/services/gallery/gallery.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService } from 'src/app/api/services/firebase/firebase.service';
import { AppDialogRef } from '../app-dialog/app-dialog.ref';
import { userData } from 'src/app/common/models/interfaces';
import * as _ from 'lodash';
import { AppDialogConfig } from '../app-dialog/app-dialog.config';
@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent {
  detailsForm:FormGroup;
  buttonLoading: boolean = false;
  previewImages: any[] = [];
  imagesBlobArray: any[] = [];
 
  userDetails: userData = {
    lastName: '',
    firstName: '',
    email: '',
    contactNumber: 0,
  };
  videosData: any[]=[];
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private galleryService:GalleryService,
    private config: AppDialogConfig,
    private firestoreService:FirebaseService,
    private dialog:AppDialogRef,
    private LocalService:LocalServiceService
  ) {
    this.detailsForm = this.fb.group({
      title: ['', Validators.required],
      description: [null],
      location: ['',Validators.required],
      address: [''],
      url: ['', Validators.required],
      images: [''],
      id: [''],
    });
  }
  ngOnInit() {
    this.videosData = _.get(this.config, 'data.videosData', []);
    this.getUserDetails();
  }
  getUserDetails() {
    this.LocalService.getItem('user_details')
      ? (this.userDetails = JSON.parse(
          this.LocalService.getItem('user_details')
        ))
      : {};
  }

  inputRequiredValidationsErrors(form: FormGroup, type: string): boolean {
    return inputRequiredValidations(form, type);
  }
  inputLengthValidationsErrors(form: FormGroup, type: string): boolean {
    return minLengthValidations(form, type);
  }
  checkTitleDuplicate(title: string) {
    return this.videosData.findIndex((data) => data.title === title) > -1;
  }
  // uploadImage(event) {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const filesArray = Array.from(event.target.files);
  //     filesArray.map((file: any) => {
  //       if (
  //         file.type === 'image/jpeg' ||
  //         file.type === 'image/png' ||
  //         file.type === 'image/jpg'
  //       ) {
  //         if (file.size < 10000000) {
  //           this.imagesBlobArray.push(file);
  //           if (file) {
  //             const reader = new FileReader();
  //             reader.onload = () => {
  //               const imageFile = reader.result as string;
  //               this.previewImages.push(imageFile);
  //             };
  //             reader.readAsDataURL(file);
  //           }
  //         } else {
  //           this.toastr.error('Image size should be less than 10 MB');
  //           event.target.value = '';
  //         }
  //       } else {
  //         this.toastr.error('Please select a valid image');
  //       }
  //     });
  //   }
  //   event.target.value = '';
  // }
  // removeLogo(index){
  //   this.previewImages.splice(index, 1);
  //   this.imagesBlobArray.splice(index, 1);
  // }
  checkUrl(url: string) {
    if(url){
      const test= url.includes('youtu.be') || url.includes('drive') || url.includes('youtube');
      return !test 
    }
      return false
  }
  cancelForm(){
    this.dialog.close();
  }
  // async submitForm(){
  //   this.buttonLoading = true;
  //   const imageUrls = await this.uploadImagesToStorage();
  //   const data = this.detailsForm.value;
  //   // this.saveDocumentData(data, imageUrls);
  // }
  // uploadImagesToStorage(): Promise<string[]> {
  //   return this.galleryService.uploadMultipleImages(this.imagesBlobArray).toPromise()
  //     .then((response) => response.map((res) => res.secure_url))
  //     .catch((error) => {
  //       console.error('Error in uploadImagesToStorage:', error);
  //       throw error;
  //     });
  // }
  submitForm() {
    this.buttonLoading = true;
    const data = this.detailsForm.value;
    // const docId = data.title.toLowerCase().replace(/\s+/g, '-');
    const docId = data.title;
    const payload = {
      title: data.title,
      description: data.description,
      location: data.location,
      // address: data.address,
      url: data.url,
      createdBy:`${this.userDetails.firstName} ${this.userDetails.lastName}`,
      createdAt: new Date(),
    };
    console.log(payload,"video payload");
    this.firestoreService.addCollection('videos', docId, payload).then(() => {
      this.buttonLoading = false;
      this.dialog.close(true);
      this.toastr.success('Video added successfully');
    })
  }
}
