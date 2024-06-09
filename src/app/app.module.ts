import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

import { AuthComponent } from './components/auth/auth.component';
import { MainComponent } from './components/main/main.component';
import { PublicComponent } from './components/public/public.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MaterialModule } from './material/material.module';
import { AccountComponent } from './components/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent,
    PublicComponent,
    RegistrationComponent,
    CreatePostComponent,
    NavBarComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
