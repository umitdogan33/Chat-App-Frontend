import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-logindialog',
  templateUrl: './logindialog.component.html',
  styleUrls: ['./logindialog.component.css']
})
export class LogindialogComponent implements OnInit {
  loginForm: UntypedFormGroup;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private tokenService: TokenService,
    private socialAuthService: SocialAuthService,
    private router:Router
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
            this.router.navigate(['main']).then(()=>
              window.location.reload()
            );
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
          this.tokenService.addClientId(data.client);
          // this.tokenService.addRefreshToken(data.refreshToken);
          this.tokenService.addRefreshToken(data.refreshTokenValue);
          // this.tokenService.addToken(data.token);
          this.tokenService.addToken(data.token);
          this.router.navigate(['main']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }


}
