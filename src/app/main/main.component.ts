import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  // form step 
  step:number=1;
  listeTypeChoisit:string[]=[];
  selected1:boolean=false;
  selected2:boolean=false;
  selected3:boolean=false;

  changeStep(){
    this.step=this.step==1?2:1;
  }
  choix(type:number){
    if(type==1){
      this.selected1=!this.selected1;

      if(this.selected1==true){
        this.listeTypeChoisit.push("AMICAL");
      }else{
        this.listeTypeChoisit.splice(this.listeTypeChoisit.indexOf("AMICAL"),1);
      }

    }else if(type==2){
      this.selected2=!this.selected2;

      if(this.selected2==true){
        this.listeTypeChoisit.push("PROFESSIONEL");
      }else{
        this.listeTypeChoisit.splice(this.listeTypeChoisit.indexOf("PROFESSIONEL"),1);
      }

    }else if (type==3){
      this.selected3=!this.selected3;
      if(this.selected3==true){
        this.listeTypeChoisit.push("AMOUREUSE");
      }else{
        this.listeTypeChoisit.splice(this.listeTypeChoisit.indexOf("AMOUREUSE"),1);
      }
    }
  }

}
