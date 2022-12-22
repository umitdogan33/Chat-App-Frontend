import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChangeFeelText } from 'src/app/models/changeFeelText';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-statusdialog',
  templateUrl: './statusdialog.component.html',
  styleUrls: ['./statusdialog.component.css']
})
export class StatusdialogComponent implements OnInit {
  sendData:ChangeFeelText = new ChangeFeelText();
  status:any;
  flt:any;
  showit:boolean = false;
  constructor(private userService:UserService,private authService:AuthService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.authService.setCurrentUserId();
    this.userService.getUserById(this.authService.getCurrentUserId()).subscribe((data)=>{
      this.status = data.feelText;
      this.flt = data.feelText;

    })
  }

  updateFeelText(){
    this.sendData.userId = this.authService.getCurrentUserId();
    this.sendData.feelText = this.status;
    this.userService.changeFeelText(this.sendData).subscribe((data)=>{
      this.flt = this.status;
      this.toastrService.success("Status Updated Successfully");
    })
  }

  style(){
    if(this.status == this.flt){
      return "pointer-events:none; cursor: not-allowed; background-color: rgb(229, 229, 229) !important; border:0px;"
    }
    return "";
  }
  
}
