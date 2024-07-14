import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { currentUser } from 'src/app/environement/global';
import { PubService } from 'src/app/services/publi_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

current_user:any;
liste:any=[];
reseaux:any=[];
current_rss:any;


constructor(private pubService:PubService,private toastService:NgToastService) {};

ngOnInit(): void {
    this.load();
  };


load(){
  this.reseaux=currentUser.reseaux;
  this.current_rss=this.reseaux[0];
  this.getPubBySecteur(this.current_rss);
  
}


getPubBySecteur(name:string){
  this.current_rss=name;
  const nom=name;
  this.pubService.getBySecteur(nom).subscribe(
    (res)=>{
      console.log(res);
      this.liste=res;
    },
    (error)=>{
      console.log(error);
      this.toastService.error({detail:"erreur",summary:"Une erreur est survenu ",duration:3000})
    }
  );
  
  
}



}
