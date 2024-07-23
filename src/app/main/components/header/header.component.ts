import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { currentUser } from 'src/app/environement/global';
import { AmiService } from 'src/app/services/ami_service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  current_user:any;
  amis:any={
    username:""
  }

  showProfile:boolean=false;
selected_user:any;

  ngOnInit(): void {
    this.loadInfo();
  }

  searchList:any[]=[];

  constructor(private amiService:AmiService,private toastService:NgToastService){
  }

  loadInfo(){
    this.current_user=currentUser;
  }

  search(){

    this.amiService.searchAmi(this.amis.username).subscribe(
      (res)=>{
        console.log(res)
        this.searchList[0]=res;

      },
      (error)=>{
        console.log(error);
      }
      )
    

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




}
