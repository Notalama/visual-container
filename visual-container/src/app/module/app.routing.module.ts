import { AuthGuard } from './../auth/auth.guard';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { HomeComponent } from '../home/home.component';
import { MainPageComponent } from '../main-page/main-page.component';

const routes: Routes = [
    { path: 'login',  component: LoginComponent },
    { path: 'signup',  component: SignupComponent },
    { path: 'home', component: HomeComponent,  canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' },
    { path: 'main',  component: MainPageComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {


}
