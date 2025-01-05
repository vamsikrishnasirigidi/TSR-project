import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tsr-project';
  constructor(private auth: AngularFireAuth) {}

  ngOnInit() {
    // Debug Firebase initialization
    this.auth.authState.subscribe(
      user => console.log('Firebase Auth initialized:', !!user),
      error => console.error('Firebase Auth error:', error)
    );
  }
}
