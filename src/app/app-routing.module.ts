import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { MainComponent } from './components/main/main.component';
import { PublicComponent } from './components/public/public.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { AuthGuard } from './guards/auth.guard';
import { AccountComponent } from './components/account/account.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'main', component: MainComponent },
  { path: '', component: PublicComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
