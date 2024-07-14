import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { AmiService } from 'src/app/services/ami_service';

@Component({
  selector: 'app-amis',
  templateUrl: './amis.component.html',
  styleUrls: ['./amis.component.css']
})
export class AmisComponent implements OnInit {


  ListeUser:any[]=[];



  constructor(private amibService:AmiService,private toastService:NgToastService){
  }
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.amibService.get().subscribe(
      (res:any)=>{
        console.log(res);
        this.ListeUser=res;
      },
      (err:any)=>{
        console.log(err);
        this.toastService.error({detail:"erreur",summary:"Une erreur est survenu ",duration:3000});
      }
    );

  }

}
