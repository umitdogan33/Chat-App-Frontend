import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-old-contact-dialog',
  templateUrl: './old-contact-dialog.component.html',
  styleUrls: ['./old-contact-dialog.component.css']
})
export class OldContactDialogComponent implements OnInit {
  data : User[] = [];
  constructor(private authService:AuthService,private messageService:MessageService) { }

  ngOnInit(): void {
    this.getLastContact();
  }

  getLastContact(){
    this.authService.setCurrentUserId();
    this.messageService.getLastContact(this.authService.getCurrentUserId()).subscribe((data)=>{
      this.data = data;
    })
  }

}
