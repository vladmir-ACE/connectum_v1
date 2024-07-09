import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { api } from 'src/app/environement/api.env';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class SettingService {

    constructor(private http: HttpClient) { }


    header:HttpHeaders=new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      });


     //Update avatar
    UpdateAvatar(data:any):Observable<any>{
        return this.http.post<any>(api.url+"avis/upload-image",data,{headers :this.header});
    }

    UpdateLocaleUserInfo(info:Object){
        localStorage.setItem("user",JSON.stringify(info))
      }
    
      UpdateProfile(data:any):Observable<any>{
        return this.http.put<any>(api.url+"updateUser",data,{headers :this.header});
    }

    sendCode(data:any){
        return this.http.post<any>(api.url+"modifier-mot-de-passe",data,{headers :this.header});
    }

    changeMdp(data:any){
        return this.http.post<any>(api.url+"nouveau-mot-de-passe",data,{headers :this.header});
    }
    

}