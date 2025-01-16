import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/api/services/firebase/firebase.service';
import { GalleryService } from 'src/app/api/services/gallery/gallery.service';
import { LocalServiceService } from 'src/app/api/services/localStorage/local-service.service';

@Component({
  selector: 'app-edit-gallery',
  templateUrl: './edit-gallery.component.html',
  styleUrls: ['./edit-gallery.component.scss']
})
export class EditGalleryComponent {
  property: any | null = null;
  propertyForm: FormGroup;
  isEditing = false;
  selectedImageIndex: number | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef;

  getGalleryDoc(){
   this.property = this.LocalService.getDecryptedData('gallery_doc')
  }
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private propertyService: GalleryService,
    private firebaseService: FirebaseService,private toastr: ToastrService,private LocalService:LocalServiceService,private Router:Router,private galleryService:GalleryService
    
  ) {
    this.propertyForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      location: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Load property data
    this.getGalleryDoc();
    this.propertyForm.patchValue(this.property);
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.propertyForm.patchValue(this.property!);
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.propertyForm.patchValue(this.property!);
  }

  onSubmit() {
    if (this.propertyForm.valid && this.property) {
      const updatedProperty = {
        ...this.property,
        ...this.propertyForm.value
      };
      console.log(updatedProperty,"updatedProperty");
      this.updateGalleryDocument(true,'Property updated successfully')
      // this.propertyService.updateProperty(updatedProperty).subscribe(() => {
      //   this.isEditing = false;
      //   this.property = updatedProperty;
      // });
    }
  }

  triggerImageUpload() {
    this.fileInput.nativeElement.click();
  }

  onImageSelected(event: any) {
    const files = event.target.files;
    if (files && this.property) {
      const filesArray = Array.from(files);
      this.galleryService.uploadMultipleImages(filesArray).toPromise()
      .then((response) => response.map((res) =>{
        this.property.images = [...this.property.images, res.secure_url];
        this.updateGalleryDocument(false,'Image uploaded successfully')
      }
      ))
      .catch((error) => {
        this.toastr.error('Error in uploadImagesToStorage',);
        console.error('Error in uploadImagesToStorage:', error);
        throw error;
      });
      // Handle image upload to Cloudinary/storage
      // this.propertyService.uploadImages(files).subscribe(urls => {
      //   this.property!.images = [...this.property!.images, ...urls];
      //   this.propertyService.updateProperty(this.property!).subscribe();
      // });
    }
  }

  deleteImage(index: number) {
    if (this.property && confirm('Are you sure you want to delete this image?')) {
      const imageUrl = this.property.images[index];
      this.property.images = this.property.images.filter((_, i) => i !== index);
      this.updateGalleryDocument(false,'Image deleted successfully')
    }
  }

  setAsPrimary(index: number) {
    if (this.property) {
      const [selectedImage] = this.property.images.splice(index, 1);
      this.property.images.unshift(selectedImage);
      this.updateGalleryDocument(false,"Image set as primary")
    }
  }

  openImageViewer(index: number) {
    this.selectedImageIndex = index;
  }

  closeImageViewer() {
    this.selectedImageIndex = null;
  }

  previousImage() {
    if (this.selectedImageIndex !== null && this.selectedImageIndex > 0) {
      this.selectedImageIndex--;
    }
  }

  nextImage() {
    if (this.selectedImageIndex !== null && this.property && 
        this.selectedImageIndex < this.property.images.length - 1) {
      this.selectedImageIndex++;
    }
  }

  updateGalleryDocument(update?:boolean,message?:string){
    const updatedProperty={
      ...this.property,
      ...this.propertyForm.value
    }
    this.firebaseService.updateDocument('gallery',this.property.id, updatedProperty).then((res)=>{
      if(res.success){
        if(update){
          this.isEditing = false;
          this.property =updatedProperty
        }
       this.toastr.success(message || 'Property updated successfully');
        this.LocalService.encriptAndStoreData('gallery_doc', this.property);
      }
    })
  }
}
