import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import emailjs from '@emailjs/browser';
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private corsProxy = 'https://cors-anywhere.herokuapp.com/';
  private apiUrl = `https://api.sendgrid.com/v3/mail/send`;

  constructor(private http: HttpClient) {
   
  }
  ngOnInit(): void { emailjs.init(environment.emailJS.public_key);}

  sendEmail(formData: any) {
    const emailData = {
      personalizations: [{
        to: [{ email: 'vamsikrishna.sirigidi@imaginnovate.com' }],
        from: { email: environment.sendgrid.verified_Email },  
        subject: 'New Contact Form Submission'
      }],
      content: [{
        type: 'text/html',
        value: `
          <div style="padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2>Contact Details</h2>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Contact:</strong> ${formData.contactNumber}</p>
            <p><strong>Address:</strong> ${formData.address}</p>
            <p><strong>Description:</strong> ${formData.message}</p>
          </div>
        `
      }]
    };

    return this.http.post(this.corsProxy + this.apiUrl, emailData, {
      headers: {
        'Authorization': `Bearer ${environment.sendgrid.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }
  sendEmailToEmailJS(formData: any){
    const templateParams = {
      name: formData.name,
      phone: formData.contactNumber,
      email: formData.email,
      address: formData.address,
      message: formData.message
    };
   return emailjs.send(
      environment.emailJS.service_Id,
      environment.emailJS.template_Id,
      templateParams,
      environment.emailJS.public_key
    )
  }
}
