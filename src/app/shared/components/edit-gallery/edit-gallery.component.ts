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
   console.log(this.property,"data");
   
  }
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private propertyService: GalleryService,
    private firebaseService: FirebaseService,private toastr: ToastrService,private LocalService:LocalServiceService,private Router:Router
    
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
      this.propertyService.updateProperty(updatedProperty).subscribe(() => {
        this.isEditing = false;
        this.property = updatedProperty;
      });
    }
  }

  triggerImageUpload() {
    this.fileInput.nativeElement.click();
  }

  onImageSelected(event: any) {
    const files = event.target.files;
    if (files && this.property) {
      console.log(files,"files");
      
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
      this.propertyService.updateProperty(this.property).subscribe();
      // Optionally delete from storage
      // this.propertyService.deleteImage(imageUrl).subscribe();
    }
  }

  setAsPrimary(index: number) {
    if (this.property) {
      const [selectedImage] = this.property.images.splice(index, 1);
      this.property.images.unshift(selectedImage);
      this.propertyService.updateProperty(this.property).subscribe();
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
}
