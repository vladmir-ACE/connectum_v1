import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './components/header/header.component';
import { MessageComponent } from './pages/message/message.component';
import { PublicationComponent } from './pages/publication/publication.component';
import { SettingsComponent } from './pages/settings/settings.component';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    MessageComponent,
    PublicationComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatIconModule 
    
  ]
})
export class MainModule { }
