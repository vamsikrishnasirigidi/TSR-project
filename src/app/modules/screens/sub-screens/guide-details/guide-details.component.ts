import { Component } from '@angular/core';

interface Step {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-guide-details',
  templateUrl: './guide-details.component.html',
  styleUrls: ['./guide-details.component.scss'],
})
export class GuideDetailsComponent {
  mainTitle = 'Premium Residential Plots in Prime Locations of Visakhapatnam';
  subTitle = 'GATED COMMUNITY PLOTS WITH WORLD-CLASS AMENITIES';

  steps: Step[] = [
    {
      icon: 'fa fa-map-marker',
      title: 'Choose Your Location',
      description:
        'Select your dream plot in our prime locations across Visakhapatnam. Our experts are available to help you choose the perfect plot that matches your requirements and budget.',
    },
    {
      icon: 'fa fa-volume-control-phone',
      title: 'Schedule Site Visit',
      description:
        'Our dedicated team will arrange a site visit at your convenience. Experience the location firsthand, understand the development plans, and explore the upcoming amenities in the community.',
    },
    {
      icon: 'fa fa-bookmark',
      title: 'Secure Your Investment',
      description:
        'Easy and flexible payment options available including Bank Loans, EMI schemes, and direct payments. Our team will assist you with all documentation and legal procedures for a hassle-free booking process.',
    },
  ];
}