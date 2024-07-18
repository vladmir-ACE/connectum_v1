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
    send_demande(data:any){
        return this.http.post<any>(api.url+"api/v1/demandeAmi/envoyer",data,{headers :this.header});
    };

    accepter_demande(data:any){
        return this.http.post<any>(api.url+"api/v1/demandeAmi/accepter",data,{headers :this.header});
    };

    get(){
        return this.http.get<any>(api.url+"avis/listeDemandeAmiPossible",{headers :this.header});
    }

    getAmi(){
        return this.http.get<any>(api.url+"api/v1/demandeAmi/listeAmis",{headers :this.header});
    }

    getDemandeRecus(){
        return this.http.get<any>(api.url+"api/v1/demandeAmi/listeAmieRecue",{headers :this.header});
    }

    deleteAmi(email:string){
        return this.http.delete<any>(api.url+"api/v1/demandeAmi/supprimerAmi/"+email,{headers :this.header});
    }

    

    

}