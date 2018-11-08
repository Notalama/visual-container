
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AppComponent } from '../app.component';
import { SignupComponent } from '../signup/signup.component';
import { MainPageComponent } from '../main-page/main-page.component';

const routes: Routes = [
    { path: 'login',  component: LoginComponent },
    { path: 'signup',  component: SignupComponent },
    { path: 'main',  component: MainPageComponent },


];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {


}
