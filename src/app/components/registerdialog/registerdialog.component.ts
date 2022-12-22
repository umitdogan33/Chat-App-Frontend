import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { SpinnerService, SpinnerType } from 'src/app/utilities/spinner.service';

@Component({
  selector: 'app-registerdialog',
  templateUrl: './registerdialog.component.html',
  styleUrls: ['./registerdialog.component.css']
})
export class RegisterdialogComponent implements OnInit {
  registerForm:UntypedFormGroup;

  constructor(private router:Router,private formBuilder:UntypedFormBuilder,private authService:AuthService,private tokenService:TokenService,private toastrService:ToastrService,private spinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      userName: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      confirmPassword:['',Validators.required]
    });
  }

  controlPassword(){
    let password = this.registerForm.get('password').value;
    let confirmPassword = this.registerForm.get('confirmPassword').value;
    if(password != confirmPassword){
      this.registerForm.get('confirmPassword').setErrors({'mismatch':true});
      this.toastrService.error("Validation Error","password must be a same as confirmation")
    }
  }

    Register(){
      if(this.registerForm.valid){
        this.controlPassword();
        let loginModel = Object.assign({},this.registerForm.value)
        
        this.authService.Register(loginModel).subscribe((response)=>{
          let data = response;
           this.tokenService.addClientId(data.client);
          this.tokenService.addRefreshToken(data.refreshTokenValue);
          this.tokenService.addToken(data.token);
          this.router.navigate(['/main']).then(()=>{
            window.location.reload();
          })
        },(error)=>{
          console.log(error)
        })
      }
    }

}
