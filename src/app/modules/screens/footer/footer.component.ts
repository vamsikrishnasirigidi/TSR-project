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
    phone: '+91 8886361431',
    email: 'youremails@gmail.com',
    skype: 'yourskypeid'
  };
  goToInPageSection(element: string) {
    this.pageScrollAction.emit(element);
  }
}
