import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId:string;
  user:any;
  constructor(private router:ActivatedRoute,private userService:UserService) { }

  ngOnInit(): void {
    this.router.params.subscribe((data)=>{
      this.userId = data["id"];
    })
    this.getUser();
  }

  getUser(){
    this.userService.getUserById(this.userId).subscribe((data)=>{
      this.user = data;
      console.log("ha",this.user);
    })
  }

}
