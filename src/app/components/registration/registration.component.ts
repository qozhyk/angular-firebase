import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private afAuth: AngularFireAuth, private notificationService: NotificationService) {}

  register() {
    if (this.email && this.password) {
      if (this.password.length < 6) {
        this.errorMessage = 'Password must be at least 6 characters long';
        return;
      }
      this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
        .then(userCredential => {
          console.log('User created:', userCredential);
          this.errorMessage = ''; // Clear any previous error messages
          this.notificationService.show('Registration successful');
        })
        .catch(error => {
          console.error('Error creating user', error);
          this.handleError(error);
        });
    } else {
      this.errorMessage = 'Email and password are required';
    }
  }

  private handleError(error: any) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        this.errorMessage = 'The email address is already in use by another account. Please log in instead.';
        break;
      case 'auth/invalid-email':
        this.errorMessage = 'The email address is badly formatted.';
        break;
      case 'auth/operation-not-allowed':
        this.errorMessage = 'Email/password accounts are not enabled.';
        break;
      case 'auth/weak-password':
        this.errorMessage = 'The password is too weak.';
        break;
      default:
        this.errorMessage = 'An unknown error occurred: ' + error.message;
    }
  }
}
