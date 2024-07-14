import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { api } from 'src/app/environement/api.env';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AmiService {

    constructor(private http: HttpClient) { }


    header:HttpHeaders=new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      });


     //add 
    add(data:any){
        return this.http.post<any>(api.url+"api/v1/publication",data,{headers :this.header});
    };

    get(){
        return this.http.get<any>(api.url+"avis/listeUtilisateurs",{headers :this.header});
    }

    getBySecteur(name:string){
        return this.http.get<any>(api.url+"api/v1/publication/getPublicationBy/"+name,{headers :this.header});
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