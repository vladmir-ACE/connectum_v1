import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './pages/home/home.component';
import { MessageComponent } from './pages/message/message.component';
import { PublicationComponent } from './pages/publication/publication.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  {path:'',component:MainComponent,
    children:[
       {path:'',redirectTo:'/home',pathMatch:'full'},
       {path:'home',component:HomeComponent},
       {path:'message',component: MessageComponent},
       {path:'publication',component:PublicationComponent},
       {path:'setting',component:SettingsComponent},
      
    ]},
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
