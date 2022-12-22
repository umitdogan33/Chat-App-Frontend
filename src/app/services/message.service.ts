import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetLastContact } from '../models/getLastContact';
import { Message } from '../models/message';
import { SendMessageModel } from '../models/sendMessageModel';
import { User } from '../models/userModel';
import { StorageService } from './storage.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public messages = new BehaviorSubject<Message | null>(null);
  private hubConnection: signalR.HubConnection;
  private apiUrl:string = environment.apiUrl;
  private hubUrl:string = this.apiUrl + "/messagehub?Authorization=";
  private sendMessageModel:SendMessageModel = new SendMessageModel();
  constructor(private tokenService:TokenService,private storageService:StorageService,private httpClient:HttpClient) { }

  connectHub(userId:string,userId2:string){
    const token = this.tokenService.getToken();
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(this.hubUrl + token)
    .withAutomaticReconnect() // => bağlantı var ama birden koparsa bu çalışır
    .build()
     this.hubConnection.start()
     this.hubConnection.on('receiveMessage',data => {
      this.messages.next(data);
    })
   }

   sendMessage(message:string,receiverUserId:string,senderUserId:string,isPhoto:boolean){
    this.sendMessageModel.message = message;
    if(receiverUserId == null){
      alert("Refresh");
    }
    this.sendMessageModel.receiverUserId = receiverUserId;
    this.sendMessageModel.senderUserId = senderUserId;
    this.sendMessageModel.isPhoto = isPhoto;
    this.hubConnection.invoke("SendMessageAsync",this.sendMessageModel);
   }

   getAllMessageByUserId(userid:string,userid2:string):Observable<Message[]>{
    return this.httpClient.get<Message[]>("https://localhost:8001/api/Message/getmessagebyuserid?userId="+userid+"&userId2="+userid2);
    
   }

   getLastContact(userid:string):Observable<User[]>{
    return this.httpClient.get<User[]>("https://localhost:8001/api/Message/GetLastContact?userId="+userid);
    
   }
}
