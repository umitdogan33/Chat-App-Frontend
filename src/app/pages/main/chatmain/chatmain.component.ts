import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { SpinnerService } from 'src/app/utilities/spinner.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-chatmain',
  templateUrl: './chatmain.component.html',
  styleUrls: ['./chatmain.component.css']
})
export class ChatmainComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  userId:string;
  isLoaded:boolean = false;
  mainText:string;
  imageSrc:any[] = []
  selectedFiles:any;
  files:File[];
  user:User;
  messages:Message[] = [];
  imageForm:UntypedFormGroup;
  preview:any;
  currentFile:any;
  constructor(private formBuilder:UntypedFormBuilder,public messageService:MessageService,private router:ActivatedRoute,private userService:UserService,public authService:AuthService,private fileService:FileUploadService) { }

  ngOnInit(): void {
    this.router.params.subscribe((data)=>{
      this.userId = data["id"];
    })
    this.getAllMessageByUserId();
    this.authService.setCurrentUserId();
    this.connectHub1();
    this.messageService.messages.subscribe((data)=>{
      this.messages.push(data);
    })
    this.fetchUserData();
  }
  ngAfterViewChecked(): void {
    if (this.myScrollContainer) {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }
  }

  sendMessage(box:any,fileBox:any){
    this.messageService.sendMessage(this.mainText,this.userId,this.authService.getCurrentUserId(),false);
    if(box){
      box.value = ''
      this.mainText = null;
    }
    if(this.files != null)
      console.log("dosya kontrolü",this.files)
      this.fileService.uploadFile(this.files).subscribe((data)=>{
        console.log("gelen data",data)
        data.forEach(i => {
          this.messageService.sendMessage(i,this.userId,this.authService.getCurrentUserId(),true);
          this.imageSrc = [];
          fileBox.value = "";
        });
      })
      
    }

  fetchUserData(){
    this.userService.getUserById(this.userId).subscribe((data)=>{
      this.user = data;
    },(err)=>{
      console.log(err);
    });
  }

  checkPhoto(i:Message) {
    if(i.isPhoto == true){
      return true;
    }
    return false;
  }
  
  onChange(event: any) {
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

  getAllMessageByUserId(){
    this.authService.setCurrentUserId();
    this.messageService.getAllMessageByUserId(this.userId,this.authService.getCurrentUserId()).subscribe((data)=>{
      this.messages = data;
      this.isLoaded = true;
    })
  }

  connectHub1(){
    this.messageService.connectHub(this.userId,this.authService.getCurrentUserId())
  }

  zort(){
    
  }

  deneme(i:Message){
    if(i.senderId == this.authService.getCurrentUserId() && i.receverId == this.userId){
      return true;
    }
    return false;
  }

  deneme2(i:Message){
    if(i.senderId == this.userId && i.receverId == this.authService.getCurrentUserId()){
      return true;
    }
    return false;
  }
}