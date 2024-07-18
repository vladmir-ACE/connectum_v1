import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { api } from 'src/app/environement/api.env';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

    constructor(private http: HttpClient) { }


    header:HttpHeaders=new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      });


     //add 
    send(data:any){
        return this.http.post<any>(api.url+"api/v1/messages",data,{headers :this.header});
    };

    send_file(data:any){
        return this.http.post<any>(api.url+"api/v1/messages",data,{headers :this.header});
    };

    get_m_recus(id:number){
        return this.http.get<any>(api.url+"api/v1/messages/recue/from/"+id,{headers :this.header});
    }

    get_m_send(id:number){
        return this.http.get<any>(api.url+"api/v1/messages/envoyer/to/"+id,{headers :this.header});
    }



    
    update(data:any,id:number){
        return this.http.put<any>(api.url+"api/v1/publication/"+id,data,{headers :this.header});
    }

    delete(id:number){
        return this.http.delete<any>(api.url+"api/v1/publication/"+id,{headers :this.header});
    }

    // changeMdp(data:any){
    //     return this.http.post<any>(api.url+"nouveau-mot-de-passe",data,{headers :this.header});
    // }
    

}