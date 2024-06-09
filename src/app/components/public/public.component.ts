import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {
  posts!: any[];

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.firestore.collection('posts').valueChanges().subscribe(posts => {
      this.posts = posts;
      console.log(posts); // Вывод данных в консоль
    });
  }
}
