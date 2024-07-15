import { identifierName } from '@angular/compiler';
import { Component, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { currentUser } from 'src/app/environement/global';
import { AmiService } from 'src/app/services/ami_service';
import { MessageService } from 'src/app/services/message_service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  ListAmis:any[]=[];
  selected_ami:any;
  current_user:any=currentUser;

  List_message_recus: any[] = [
    {
      id: 1,
      message: "Hi, I’m John",
      type: 'received'
    },
    {
      id: 3,
      message: "I’m selling a photo of a sunset. It’s a print on canvas, signed by the photographer. Do you like it? 😊",
      type: 'received'
    },
    {
      id: 4,
      message: null,
      file:this.current_user.profilePictureUrl,
      type: 'received'
    }
  ];

  List_message_envoyer: any[] = [
    {
      id: 2,
      message: "I’m Lisa. welcome John",
      type: 'sent'
    },
    {
      id: 5,
      message: "Wow, it’s beautiful. How much ? 😍",
      type: 'sent'
    },
    {
      id: 6,
      message: null,
      file:this.current_user.profilePictureUrl,
      type: 'sent'
    }
  ];

  List_messages: any[] = [];

  message:any={
    content:""
  }

  // image 
  selected_file:any;
    
  file_url:any;

  @ViewChild('fileInput') fileInput: any;

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }
  onFileSelected(event:any){
    this.selected_file = event.target.files[0];
    if (this.selected_file) {
     const reader = new FileReader();
     reader.readAsDataURL(this.selected_file);
     reader.onload = () => {
       // Lecture terminée, mettez à jour l'attribut avatar avec l'URL de données
       this.file_url = reader.result;
       console.log('New image selected:', this.file_url);
     };
      
   }
 
 }


  constructor(private amibService:AmiService,
    private messageService:MessageService,
    private toastService:NgToastService){
  }
  ngOnInit(): void {
    this.load();
   
  
  }

  load(){
    this.getAmis()
    this.reloadMessage();
    
  }

  reloadMessage(){
    // this.get_message_recu();
    // this.get_message_send();

    this.List_messages = [...this.List_message_recus, ...this.List_message_envoyer];
    this.List_messages.sort((a, b) => a.id - b.id);
    
  }

  getAmis(){
    this.amibService.getAmi().subscribe(
      (res:any)=>{
        console.log(res);
        this.ListAmis=res;
        this.selected_ami=this.ListAmis[0];
      },
      (err:any)=>{
        console.log(err);
        this.toastService.error({detail:"erreur",summary:"Une erreur est survenu ",duration:3000});
      }
    );

  };
  
  switch(amis:any){
    this.selected_ami=amis;
    // this.reloadMessage();
    
  }

  addEmoji(emoji:string){
    this.message.content+=emoji;
  }

  get_message_recu(){
    this.messageService.get_m_recus(this.selected_ami.email).subscribe(
      (res:any)=>{
        console.log(res);
        this.List_message_recus=res;
      },
      (err:any)=>{
        this.toastService.error({detail:"erreur",summary:"Une erreur est survenu ",duration:3000});
        console.log(err);
      }

    );
  }

  get_message_send(){
    this.messageService.get_m_send(this.selected_ami.email).subscribe(
      (res:any)=>{
        console.log(res);
        this.List_message_envoyer=res;
      },
      (err:any)=>{
        this.toastService.error({detail:"erreur",summary:"Une erreur est survenu ",duration:3000});
        console.log(err);
      }

    );
  }


}
