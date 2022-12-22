import { EncryptionService } from './../../../utilities/encryption.service';
import { TokenService } from './../../../services/token.service';
import { StorageService } from './../../../services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import * as CryptoJS from 'crypto-js';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private tokenService: TokenService,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    this.loginGoogle();
  }

  loginGoogle() {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
          this.authService.loginGoogle(user).subscribe(
            (data) => {
              this.tokenService.addClientId(data.client);
            this.tokenService.addRefreshToken(data.refreshTokenValue);
            this.tokenService.addToken(data.token);
            },
            (err) => {
              console.log(err);
            }
          );
      })
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  Login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let loginModel = Object.assign({}, this.loginForm.value);

      this.authService.login(loginModel).subscribe(
        (response) => {
          let data = response;
          console.log('data', data);
          debugger;
          this.tokenService.addClientId(data.client);
          // this.tokenService.addRefreshToken(data.refreshToken);
          this.tokenService.addRefreshToken(data.refreshTokenValue);
          // this.tokenService.addToken(data.token);
          this.tokenService.addToken(data.token);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
