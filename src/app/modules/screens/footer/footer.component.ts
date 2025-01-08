import { Component, EventEmitter, Output } from '@angular/core';
interface Property {
  image: string;
  title: string;
  price: string;
  isRent?: boolean;
}
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Output() pageScrollAction = new EventEmitter<any>();
  gmap_Adress:string='https://www.google.com/maps/place/State+Bank+of+India+GURUDWARA+JUNCTION/@17.7375203,83.3086239,3a,75y,355.36h,103.08t/data=!3m7!1e1!3m5!1sNaJq2J7UdyakaxN4ND8ttw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-13.079999999999998%26panoid%3DNaJq2J7UdyakaxN4ND8ttw%26yaw%3D355.36!7i13312!8i6656!4m7!3m6!1s0x3a3943357caf5b77:0xe6f1e2ba8bc59b8d!8m2!3d17.7376397!4d83.3085741!10e5!16s%2Fg%2F1tdlspyk?entry=ttu&g_ep=EgoyMDI1MDEwMi4wIKXMDSoASAFQAw%3D%3D'
  socialLinks = [
    { icon: 'facebook', url: '#' },
    { icon: 'whatsapp', url: '#' },
    { icon: 'telegram', url: '#' },
    { icon: 'tiktok', url: '#' },
    { icon: 'google', url: '#' },
    { icon: 'linkedin', url: '#' },
    { icon: 'tumblr', url: '#' },
    { icon: 'instagram', url: '#' },
    { icon: 'wechat', url: '#' }
  ];

  quickLinks = [
    { name: 'Overview', url: 'overview' },
    { name: 'Walkthrough', url: 'walk-through' },
    { name: 'Site Layout', url: 'site layout' },
    { name: 'Gallery', url: 'gallery' },
    { name: 'Location', url: 'location' }
  ];

  contactInfo = {
    address: '50-40-16/3, 3rd Floor, TPT Colony, Seethammadhara, Visakhapatnam, 530013, A.P',
    phone: '+91 9000299698',
    email: 'tsrinfradeveloper@gmail.com',
  };
  goToInPageSection(element: string) {
    if(element==='location'){
      window.open(this.gmap_Adress, '_blank');
    }else{
      this.pageScrollAction.emit(element);
    }
  }
}
