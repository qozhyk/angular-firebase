import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'; // Импорт основного модуля Firebase
import 'firebase/compat/auth'; // Импорт модуля аутентификации Firebase

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})

export class NavBarComponent {
currentUser: firebase.User | null = null; // Используйте firebase.User вместо User из AngularFire

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout() {
    this.afAuth.signOut()
      .then(() => {
        console.log('Logged out successfully');
      });
  }
}
