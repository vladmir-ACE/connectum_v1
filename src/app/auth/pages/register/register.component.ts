import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth_service';

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

  showOtp:boolean=false;

  model:User=new User();
  otp:any={
    value:""
  };
  

  changeStep(){
    this.step=this.step==1?2:1;
  }

  constructor(private authService:AuthService,private toastService:NgToastService){    
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
    
  register(){
    this.model.reseaux=this.listeTypeChoisit;
    let data=this.model;
    console.log(data);
    this.authService.register(data).subscribe(
      (resonse)=>{
        console.log(resonse);
        this.showOtp=true;
      },
      (error)=>{
        this.showOtp=true;
        // this.toastService.error({
        //   detail:"register",
        //   summary:"register failed",
        //   position:"topRight"
        // });
             
      }
      );
  }


  validateOtp(){
    console.log(this.otp.value)
    this.authService.otp(this.otp.value).subscribe(
      (resonse)=>{
        this.showOtp=false;
        this.toastService.success({
          detail:"Inscription réussi",
          summary:"Vous pouvez vous connectez ",
          position:"topRight"
        });
      },
      (error)=>{
        this.toastService.error({
          detail:"OTP",
          summary:"OTP failed",
          position:"topRight"
        });

      }
    )
  }

}
