import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:UntypedFormGroup;

  constructor(private formBuilder:UntypedFormBuilder,private authService:AuthService,private tokenService:TokenService,private toastrService:ToastrService) { }

  ngOnInit(): void {
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
          console.log('data',data)
           this.tokenService.addClientId(data.client);
          this.tokenService.addRefreshToken(data.refreshTokenValue);
          this.tokenService.addToken(data.token);
        },(error)=>{
          console.log(error)
        })
      }
  }
}