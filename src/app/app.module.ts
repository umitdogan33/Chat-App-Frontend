import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { CookieModule } from 'ngx-cookie';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeComponent } from './pages/main/home/home.component';
import {ButtonModule} from 'primeng/button';
import {MenuModule} from 'primeng/menu';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import { ChatmainComponent } from './pages/main/chatmain/chatmain.component';
import {DialogModule} from 'primeng/dialog';
import { LogindialogComponent } from './components/logindialog/logindialog.component';
import { RegisterdialogComponent } from './components/registerdialog/registerdialog.component';
import { DARK_MODE_OPTIONS } from 'angular-dark-mode';
import { OldContactDialogComponent } from './components/old-contact-dialog/old-contact-dialog.component';
import { ProfileComponent } from './pages/main/profile/profile.component';
import { MyprofileComponent } from './pages/main/myprofile/myprofile.component';
import { StatusdialogComponent } from './components/statusdialog/statusdialog.component';
import { WelcomepageComponent } from './pages/main/welcomepage/welcomepage.component';
import { ProfilephotodialogComponent } from './components/profilephotodialog/profilephotodialog.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    ChatmainComponent,
    LogindialogComponent,
    RegisterdialogComponent,
    OldContactDialogComponent,
    ProfileComponent,
    MyprofileComponent,
    StatusdialogComponent,
    WelcomepageComponent,
    ProfilephotodialogComponent
  ],
  imports: [
    BrowserModule,
    TableModule,
    DialogModule,
    BrowserAnimationsModule,
    MenuModule,
    InputTextModule,
    SocialLoginModule,
    ButtonModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    HttpClientModule,
    CookieModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-atom' }),
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {
      
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("994427830337-29kssne09t3kvslrtk4fu49te2p1mhle.apps.googleusercontent.com")
          }
        ],
        onError: err => console.log(err)
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
