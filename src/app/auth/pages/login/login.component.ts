import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth_service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model:User=new User();

  constructor(private authService:AuthService,private toastService:NgToastService,private router: Router){    
  }

  login(){
    
    let data={
      username:this.model.username,
      password:this.model.mdp
    };
    console.log(data);
    this.authService.login(data).subscribe(
      (resonse)=>{
        console.log(resonse);
        this.authService.setTokenIfo(resonse.bearer);
        this.authService.setUserInfo(resonse.utilisateur);
        this.toastService.success({
          detail:"login",
          summary:"login success",
          position:"topRight"
        });
        this.redirect();
      },
      (error)=>{
        this.toastService.error({
          detail:"login",
          summary:"login failed",
          position:"topRight"
        });
             
      }
      );
  }


  redirect(){
    this.router.navigate(['/main/home']).then(() => {
      window.location.reload();
    });
  }
  



}
