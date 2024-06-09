import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  currentUser: any;
  uploadedFiles: Observable<any[]> = of([]); // Initialize with empty observable

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.uploadedFiles = this.firestore.collection('posts', ref =>
          ref.where('authorId', '==', this.currentUser.uid)
             .where('downloadURL', '!=', null) // Ensure the document has downloadURL property
        ).valueChanges();
      }
    });
  }

  deleteFile(file: any) {
    const fileRef = this.afStorage.refFromURL(file.downloadURL);
    fileRef.delete().subscribe(() => {
      this.firestore.collection('posts', ref => ref.where('downloadURL', '==', file.downloadURL)).get().subscribe(snapshot => {
        snapshot.forEach(doc => {
          this.firestore.collection('posts').doc(doc.id).delete();
        });
      });
    });
  }
}
