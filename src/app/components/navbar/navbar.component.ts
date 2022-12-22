import { Component, OnInit} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loginForm:UntypedFormGroup;
  items: MenuItem[];
  constructor(private formBuilder:UntypedFormBuilder,private authService:AuthService,private toastrService:ToastrService,private tokenService:TokenService,private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    });
  }

  control(){
    if(this.authService.isAuthencation()){
      return false;
    }
    return true;
  }

  Login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({},this.loginForm.value)
     
      this.authService.login(loginModel).subscribe((response)=>{
        let data = response;
        console.log(data);
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