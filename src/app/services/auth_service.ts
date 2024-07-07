import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { api } from 'src/app/environement/api.env';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }


    login(user:any):Observable<any>{
        return this.http.post<any>(api.url+'connexion', user);
      }
    
    
      logout(refresh_token:string):Observable<string>{
        return this.http.post<string>(api.url+'auth/logout', refresh_token);
      }
      
    
      register(data:User):Observable<any>{
        return this.http.post<User>(api.url+'inscription', data);
      }

      otp(data:string):Observable<any>{
        return this.http.post<User>(api.url+'activation', {code:data});
      }


      setTokenIfo(token:string){
        localStorage.setItem("token",token);
        localStorage.setItem("is_auth","true");
      }

      setUserInfo(info:Object){
        localStorage.setItem("user",JSON.stringify(info))
      }
    
     
    

}