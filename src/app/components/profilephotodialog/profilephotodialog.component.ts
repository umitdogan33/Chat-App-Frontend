import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profilephotodialog',
  templateUrl: './profilephotodialog.component.html',
  styleUrls: ['./profilephotodialog.component.css']
})
export class ProfilephotodialogComponent implements OnInit {
  imageSrc:any;
  files:any;
  constructor(private userService:UserService,private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.setCurrentUserId();
  }

  onChange(event: any) {
    this.imageSrc = [];
    if (event.target.files) {
      this.files = event.target.files;
      for (const [key, value] of Object.entries(this.files)) {
        // @ts-ignore
        let file: File = this.files[key];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageSrc.push(reader.result as string);
        }
      }
    }
  }

  uploadPhoto(){
    console.log("id",this.authService.getCurrentUserId())
    this.userService.updateUserPhoto(this.files[0],this.authService.getCurrentUserId()).subscribe((data)=>{
      window.location.reload();
    })
  }

  style(){
    if(this.files == null){
      return "pointer-events:none; cursor: not-allowed; background-color: rgb(229, 229, 229) !important; border:0px;"
    }
    return "";
  }

}
