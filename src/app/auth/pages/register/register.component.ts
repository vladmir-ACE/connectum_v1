import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
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
    }else if(type==2){
      this.selected2=!this.selected2;
    }else if (type==3){
      this.selected3=!this.selected3;
    }
  }
    


}
