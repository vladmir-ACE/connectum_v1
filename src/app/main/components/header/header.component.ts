import { Component, OnInit } from '@angular/core';
import { currentUser } from 'src/app/environement/global';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  current_user:any;

  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo(){
    this.current_user=currentUser;
  }





}
