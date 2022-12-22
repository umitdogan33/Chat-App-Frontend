import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  apiUrl:any = environment.apiUrl+"/api/";
  constructor(private http:HttpClient) { }

  uploadFile(file:any):Observable<string[]>{
    let formData: FormData = new FormData();
    for (let i = 0; i < file.length; i++){
      formData.append("files", file[i]);
    }
    return this.http.post<string[]>("https://localhost:8001/api/FileUpload",formData);
  }
}
