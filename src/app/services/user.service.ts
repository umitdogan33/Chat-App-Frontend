import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangeFeelText } from '../models/changeFeelText';
import { ResponseModel } from '../models/resposeModel';
import { UpdateUserModel } from '../models/updateUserModel';
import { User } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.apiUrl+"/api/user/";
  constructor(private httpClient:HttpClient) { }

  getallUser():Observable<User[]>{
    return this.httpClient.get<User[]>(this.url+"getall");
  }

   getUserById(userId:string):Observable<User>{
    return this.httpClient.get<User>(this.url+"getuserbyid?UserId="+userId);
  }

  getByStatus():Observable<User>{
    return this.httpClient.get<User>(this.url+"getbystatus");
  }

  changeFeelText(entity:ChangeFeelText):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url+"ChangeUsername",entity);
  }

  updateUser(entity:UpdateUserModel){
    return this.httpClient.post<ResponseModel>(this.url+"UpdateUser",entity);
  }
  updateUserPhoto(file:any,userId:string){
    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);
    return this.httpClient.post<ResponseModel>(this.url+"UpdateUserPhoto",formData);
  }
}
