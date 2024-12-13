import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappLinkComponent } from './whatsapp-link.component';

describe('WhatsappLinkComponent', () => {
  let component: WhatsappLinkComponent;
  let fixture: ComponentFixture<WhatsappLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
