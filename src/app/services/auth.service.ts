import { EncryptionService } from './../utilities/encryption.service';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { HttpClient } from '@angular/common/http';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LoginGoogle } from '../models/loginGoogle';
import { LoginFacebook } from '../models/loginFacebook';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelperService: JwtHelperService = new JwtHelperService();
  currentUserId: string;
  currentRoles: string;
  NewPath= environment.localApiUrl+"/api/Auth/"
  constructor(private tokenService:TokenService,private httpClient:HttpClient,private encService:EncryptionService) {}
  
  
  token = this.tokenService.getToken();

  login(user:LoginModel):Observable<TokenModel>{
    return this.httpClient.post<TokenModel>(this.NewPath+"login",user);
  }

  loginGoogle(googleUser:LoginGoogle):Observable<TokenModel>{
    return this.httpClient.post<TokenModel>(this.NewPath+"logingoogle",googleUser)
  }

  Register(user:RegisterModel):Observable<TokenModel>{
  return this.httpClient.post<TokenModel>(this.NewPath+"register",user) 
}



setCurrentUserId() {
  var decoded = this.getDecodedToken()
  console.log("decoded",decoded);
  var propUserId = Object.keys(decoded).filter(x => x.endsWith("/nameidentifier"))[0];
  this.currentUserId = String(decoded[propUserId]);
}

isAuthencation(){
  if(this.tokenService.getToken()){
    return true;
  }

  else{
    return false;
  }
}

setRoles() {
  var decoded = this.getDecodedToken()
  var propUserId = Object.keys(decoded).filter(x => x.endsWith("/role"))[0];
  this.currentRoles = String(decoded[propUserId]);
}
getCurrentRoles(): string {
  console.log(this.currentRoles);
  
  return this.currentRoles
}
getCurrentUserId(): string {
  return this.currentUserId
}
getDecodedToken() {
  try {
    return this.jwtHelperService.decodeToken(this.token);
  }
  catch (Error) {
    return null;
  }
}
async setUserStats() {
  if (this.loggedIn()) {
    this.setCurrentUserId()
    this.setRoles()
  }
}

logout() {
  this.tokenService.deleteToken();
  this.tokenService.deleteRefreshToken();
  this.tokenService.deleteClientId();
}
loggedIn(): boolean {
  let isExpired = this.jwtHelperService.isTokenExpired(this.token);
  return !isExpired;
}

tokenIsExpired(): boolean{
  if(this.token == undefined || this.token == null){
    return false;
  }
  console.log("authservicetoken",this.token)
  let isExpired = this.jwtHelperService.isTokenExpired(this.token);
  return isExpired;
}
}
