import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { finalize } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid'; // Импортируем uuid для генерации уникальных идентификаторов

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  postTitle: string = '';
  postContent: string = '';
  selectedFile: File | null = null;
  uploadInProgress: boolean = false;
  downloadURL: string | null = null; // Добавляем переменную для хранения URL загруженного файла

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {}

  async uploadFile(event: any) {
    const file = event.target.files[0];
    if (!file) {
      console.error('No file selected');
      return;
    }

    this.uploadInProgress = true;

    const uniqueFileName = uuidv4(); // Генерация уникального имени файла
    const filePath = `uploads/${uniqueFileName}`; // Используем уникальное имя файла в пути
    const fileRef = this.afStorage.ref(filePath);
    const uploadTask = this.afStorage.upload(filePath, file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(downloadURL => {
          console.log('File uploaded successfully. Download URL:', downloadURL);
          this.downloadURL = downloadURL; // Сохраняем URL загруженного файла
          this.uploadInProgress = false;
        });
      })
    ).subscribe();
  }

  async createPost() {
    const user: firebase.User | null = await this.afAuth.currentUser;

    if (!user) {
      console.error('You need to be logged in to create a post');
      return;
    }

    if (!this.postTitle || !this.postContent) {
      console.error('Title and content are required');
      return;
    }

    const postData: {
      title: string;
      content: string;
      authorId: string;
      authorName: string | null;
      authorEmail: string | null;
      downloadURL?: string; // URL загруженного файла (если есть)
    } = {
      title: this.postTitle,
      content: this.postContent,
      authorId: user.uid,
      authorName: user.displayName,
      authorEmail: user.email,
      downloadURL: this.downloadURL ?? undefined // Убедимся, что значение downloadURL не null
    };

    this.savePostData(postData); // Сохраняем пост в Cloud Firestore
  }

  private savePostData(postData: any) {
    this.firestore.collection('posts').add(postData)
    .then(() => {
      console.log('Post created successfully');
      this.postTitle = '';
      this.postContent = '';
      this.selectedFile = null;
      this.downloadURL = null; // Сбрасываем URL после сохранения поста
    })
    .catch(error => {
      console.error('Error creating post:', error);
    });
  }
}
