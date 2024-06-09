import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NotificationService } from '../../notification.service';
import firebase from 'firebase/compat/app'; // Импорт основного модуля Firebase

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  currentUser: any;

  constructor(private afAuth: AngularFireAuth, private notificationService: NotificationService) {
    this.afAuth.authState.subscribe(user => {
      this.currentUser = user;
    });
  }

  signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.signInWithProvider(provider);
  }

  private signInWithProvider(provider: firebase.auth.AuthProvider) {
    this.afAuth.signInWithPopup(provider)
      .then(result => {
        console.log('Logged in successfully', result);
        this.errorMessage = ''; // Clear any previous error messages
        this.notificationService.show('Login successful');
      })
      .catch(error => {
        console.error('Error logging in', error);
        this.handleError(error);
      });
  }


  login() {
    if (this.email && this.password) {
      this.afAuth.signInWithEmailAndPassword(this.email, this.password)
        .then(result => {
          console.log('Logged in successfully', result);
          this.errorMessage = ''; // Clear any previous error messages
          this.notificationService.show('Login successful');
        })
        .catch(error => {
          console.error('Error logging in', error);
          this.handleError(error);
        });
    } else {
      this.errorMessage = 'Email and password are required';
    }
  }

  logout() {
    this.afAuth.signOut()
      .then(() => {
        console.log('Logged out successfully');
      });
  }

  private handleError(error: any) {
    switch (error.code) {
      case 'auth/invalid-credential':
        this.errorMessage = 'The supplied auth credential is incorrect, malformed or has expired.';
        break;
      case 'auth/user-not-found':
        this.errorMessage = 'No user corresponding to this email.';
        break;
      case 'auth/wrong-password':
        this.errorMessage = 'The password is invalid.';
        break;
      default:
        this.errorMessage = 'An unknown error occurred: ' + error.message;
    }
  }
}
