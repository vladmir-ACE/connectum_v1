import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { currentUser } from 'src/app/environement/global';
import { AmiService } from 'src/app/services/ami_service';
import { PubService } from 'src/app/services/publi_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

current_user:any=currentUser;
liste:any=[];
listAmis:any=[];
reseaux:any=[];
current_rss:any;
showProfile:boolean=false;
selected_user:any;

comment:any={
  content:""
}


constructor(private amibService:AmiService,private pubService:PubService,private toastService:NgToastService) {};

ngOnInit(): void {
    this.load();
  };


load(){
  this.reseaux=currentUser.reseaux;
  this.current_rss=this.reseaux[0];
  this.getPubBySecteur(this.current_rss);
  this.getAmis();
  
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

getAmis(){
  this.amibService.getAmi().subscribe(
    (res:any)=>{
      console.log(res);
      this.listAmis=res;
    },
    (err:any)=>{
      console.log(err);
      this.toastService.error({detail:"erreur",summary:"Une erreur est survenu ",duration:3000});
    }
  );
}

selectUser(user:any){
  this.selected_user=user;
  console.log(this.selected_user);
  this.selected_user.date_de_naissance = this.convertIsoToDate(this.selected_user.date_de_naissance);
  this.showProfile=true;
}


convertIsoToDate(isoDate: string): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}


addCommentaire(pub_id:number){

  this.pubService.addComm(pub_id,{content:this.comment.content}).subscribe(
    (res)=>{
      this.toastService.success({detail:"commentaire",summary:"envoyé avec success ",duration:3000})
      this.comment.content="";
      this.getPubBySecteur(this.current_rss);
    },
    (error)=>{
      console.log(error);
      this.toastService.error({detail:"erreur",summary:"Une erreur est survenu ",duration:3000})
    }
  )
}

deleteCom(com_id:number){
  this.pubService.delCom(com_id).subscribe(
    (res)=>{
      this.toastService.success({detail:"commentaire",summary:"delete ",duration:3000})
      this.comment.content="";
      this.getPubBySecteur(this.current_rss);
    },
    (error)=>{
      console.log(error);
      this.toastService.error({detail:"erreur",summary:"Une erreur est survenu ",duration:3000})
    }
  )

}

addLike(pub_id:number){
  this.pubService.addLike(pub_id,{}).subscribe(
    (res)=>{
      this.toastService.success({detail:"like",summary:"publication liké ",duration:3000})
      this.comment.content="";
      this.getPubBySecteur(this.current_rss);
    },
    (error)=>{
      console.log(error);
      this.toastService.error({detail:"erreur",summary:"dejas liké ",duration:3000})
    }
  )
}

dislike(pub_id:number){
  this.pubService.dislike(pub_id).subscribe(
    (res)=>{
      this.toastService.success({detail:"dislike",summary:"dislike ",duration:3000})
      this.comment.content="";
      this.getPubBySecteur(this.current_rss);
    },
    (error)=>{
      console.log(error);
      this.toastService.error({detail:"erreur",summary:"Une erreur est survenu ",duration:3000})
    }
  )
}

}
