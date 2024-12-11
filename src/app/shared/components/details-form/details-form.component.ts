import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LocalServiceService } from 'src/app/api/services/localStorage/local-service.service';
import { inputRequiredValidations, minLengthValidations } from 'src/app/common/utils';
import { GalleryService } from 'src/app/api/services/gallery/gallery.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService } from 'src/app/api/services/firebase/firebase.service';
@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.scss']
})
export class DetailsFormComponent {
  detailsForm:FormGroup;
  buttonLoading: boolean = false;
  previewImages: any[] = [];
  imagesBlobArray: any[] = [];
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private galleryService:GalleryService,
    private firestoreService:FirebaseService,
  ) {
    this.detailsForm = this.fb.group({
      title: ['', Validators.required],
      description: [null, Validators.required],
      location: ['',Validators.required],
      address: ['', Validators.required],
      images: [''],
      id: [''],
    });
  }
  inputRequiredValidationsErrors(form: FormGroup, type: string): boolean {
    return inputRequiredValidations(form, type);
  }
  inputLengthValidationsErrors(form: FormGroup, type: string): boolean {
    return minLengthValidations(form, type);
  }
  uploadImage(event) {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files);
      filesArray.map((file: any) => {
        if (
          file.type === 'image/jpeg' ||
          file.type === 'image/png' ||
          file.type === 'image/jpg'
        ) {
          if (file.size < 10000000) {
            this.imagesBlobArray.push(file);
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                const imageFile = reader.result as string;
                this.previewImages.push(imageFile);
              };
              reader.readAsDataURL(file);
            }
          } else {
            this.toastr.error('Image size should be less than 10 MB');
            event.target.value = '';
          }
        } else {
          this.toastr.error('Please select a valid image');
        }
      });
    }
    event.target.value = '';
  }
  removeLogo(index){
    this.previewImages.splice(index, 1);
    this.imagesBlobArray.splice(index, 1);
  }
  cancelForm(){
    this.detailsForm.reset();
    this.previewImages = [];
    this.imagesBlobArray = [];
  }
  async submitForm(){
    this.buttonLoading = true;
    const imageUrls = await this.uploadImagesToStorage();
    const data = this.detailsForm.value;
    this.saveDocumentData(data, imageUrls);
  }
  uploadImagesToStorage(): Promise<string[]> {
    return this.galleryService.uploadMultipleImages(this.imagesBlobArray).toPromise()
      .then((response) => response.map((res) => res.secure_url))
      .catch((error) => {
        console.error('Error in uploadImagesToStorage:', error);
        throw error;
      });
  }
  saveDocumentData(data: any, images: any[]=[]) {
    // const docId = data.title.toLowerCase().replace(/\s+/g, '-');
    const docId = data.title;
    const payload = {
      title: data.title,
      description: data.description,
      location: data.location,
      address: data.address,
      images: images,
      createdAt: new Date(),
    };
    console.log(payload,"payload");
    this.firestoreService.addCollection('gallery', docId, payload).then(() => {
      this.buttonLoading = false;
      this.cancelForm();
      this.toastr.success('Document added successfully');
    })
  }
}
