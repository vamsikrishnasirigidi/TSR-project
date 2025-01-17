import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { trigger, transition, style, animate } from '@angular/animations';
import { UploadVideoComponent } from 'src/app/shared/components/upload-video/upload-video.component';
import { AppDialogService } from 'src/app/shared/components/app-dialog/app-dialog.service';
import { FirebaseService } from 'src/app/api/services/firebase/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
interface VideoItem {
  id: number;
  url: string;
  title: string;
  location: string;
  description: string;
}
@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class VideoPageComponent {
  videos: VideoItem[] = [];
  selectedVideoId: number | null = null;
  showAddForm = false;
  isAdminLogin = false;
  pageLoader = false;
  headerText =
    'Discover what our satisfied customers say about their journey with TSR Infra Developers';
  newVideo: Partial<VideoItem> = {};
  modalRef: any;
  collectionName: string = 'videos';
  constructor(
    private sanitizer: DomSanitizer,
    public dialog: AppDialogService,
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    const currentRoute = this.route.snapshot['_routerState'].url.split('/')[1];
    this.isAdminLogin = currentRoute === 'admin';
    this.getVideosData();
  }
  getVideosData() {
    this.pageLoader = true;
    this.firebaseService
      .getAllDocuments(this.collectionName)
      .subscribe((data) => {
        console.log(data);
        
        this.videos = data;
        this.pageLoader = false;
      });
  }
  getEmbedUrl(url: string): SafeResourceUrl {
    let embedUrl = '';
    const type = url.includes('drive') ? 'drive' : 'youtube';
    if (type === 'youtube') {
      // Extract video ID from YouTube URL
      const videoId = this.extractYouTubeId(url);
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (type === 'drive') {
      // Extract file ID from Drive URL
      const fileId = this.extractDriveId(url);
      embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  extractDriveId(url: string): string {
    const regExp = /\/file\/d\/([^/]+)/;
    const match = url.match(regExp);
    return match ? match[1] : '';
  }
  extractYouTubeId(url: string): string {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
  }

  deleteVideo(doc) {
    if (confirm('Are you sure you want to delete this video?')) {
      this.firebaseService.deleteDocument('videos', doc.id).then((res: any) => {
        if (res.success) {
          this.toastr.success(res.message);
          this.videos = this.videos.filter((video) => video.id !== doc.id);
        } else {
          this.toastr.error(res.message);
        }
      });
    }
  }

  addVideo() {
    this.modalRef = this.dialog.open(UploadVideoComponent, {
      data: { title: 'Add Video' ,videosData:this.videos},
    });
    this.modalRef.afterClosed.subscribe((result) => {
      if (result) {
        this.getVideosData();
      }
    });
  }
}
