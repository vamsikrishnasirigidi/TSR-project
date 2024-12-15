import { environment } from './../../../../environments/environment';
import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-link',
  templateUrl: './whatsapp-link.component.html',
  styleUrls: ['./whatsapp-link.component.scss'],
})
export class WhatsappLinkComponent {
  private phoneNumber = environment.CONTACT_NUMBER;
  openWhatsApp() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const message = encodeURIComponent(
      `Hello! I'm interested in your Plots.\n` + `Please Contact Me...`
    );

    if (isMobile) {
      // Direct to WhatsApp app on mobile
      window.location.href = `whatsapp://send?phone=${
        this.phoneNumber
      }&text=${encodeURIComponent(message)}`;
    } else {
      // Open WhatsApp Web in new tab on desktop
      window.open(
        `https://web.whatsapp.com/send?phone=${this.phoneNumber}&text=${message}`,
        '_blank'
      );
    }
  }
}
