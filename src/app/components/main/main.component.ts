// main.component.ts
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  posts!: any[];

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.firestore.collection('posts').valueChanges().subscribe(posts => {
          this.posts = posts;
        });
      } else {
        this.router.navigate(['/auth']);
      }
    });
  }
}
