import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { Table } from 'primeng/table'
import { User } from 'src/app/models/userModel';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { SpinnerService, SpinnerType } from 'src/app/utilities/spinner.service';
import { Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users:any;
  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;
  loading: boolean = true;
  constructor(private messageService:MessageService,private userService:UserService,private darkModeService: DarkModeService) { }

  ngOnInit(): void {
    this.messageService.connectHub(null,null);
    this.GetAllUserByStatus();
  }

  GetAllUserByStatus(){
    this.userService.getByStatus().subscribe((data)=>{
      console.log(data);
      this.users = data;
    })
  }


  onToggle(): void {
    this.darkModeService.toggle();
  }

}
