
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
  ListAmis: any[] = [];
  selected_ami: any;
  current_user: any = currentUser;

  List_message_recus: any[] = [];

  List_message_envoyer: any[] = [];

  List_messages: any[] = [];

  message: any = {
    content: ""
  }

  // image 
  selected_file: any;

  file_url: any;

  @ViewChild('fileInput') fileInput: any;

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }
  onFileSelected(event: any) {
    this.selected_file = event.target.files[0];
    if (this.selected_file) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selected_file);
      reader.onload = () => {
        // Lecture terminée, mettez à jour l'attribut avatar avec l'URL de données
        this.file_url = reader.result;
        console.log('New image selected:', this.file_url);
      };

      // send file
      this.sendFile();
    }
  }

  constructor(
    private amibService: AmiService,
    private messageService: MessageService,
    private toastService: NgToastService
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.getAmis();
  }

  reloadMessage() {
    Promise.all([this.get_message_recu(), this.get_message_send()]).then(() => {
      this.List_message_envoyer = this.List_message_envoyer.map(message => {
        return { ...message, type: 'sent' };
      });

      this.List_message_recus = this.List_message_recus.map(message => {
        return { ...message, type: 'received' };
      });

      this.List_messages = [...this.List_message_recus, ...this.List_message_envoyer];
      this.List_messages.sort((a, b) => a.id - b.id);

      console.log("liste totale:", this.List_messages);
    }).catch((err) => {
      console.error("Erreur lors du chargement des messages:", err);
    });
  }

  getAmis() {
    this.amibService.getAmi().subscribe(
      (res: any) => {
        console.log(res);
        this.ListAmis = res;
        this.selected_ami = this.ListAmis[0];
        this.reloadMessage();
      },
      (err: any) => {
        console.log(err);
        this.toastService.error({ detail: "erreur", summary: "Une erreur est survenu ", duration: 3000 });
      }
    );
  };

  switch(amis: any) {
    this.selected_ami = amis;
     this.reloadMessage();
  }

  addEmoji(emoji: string) {
    this.message.content += emoji;
  }

  get_message_recu(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.messageService.get_m_recus(this.selected_ami.id).subscribe(
        (res: any) => {
          console.log("message recu", res);
          this.List_message_recus = res;
          resolve();
        },
        (err: any) => {
          this.toastService.error({ detail: "erreur", summary: "Une erreur est survenu ", duration: 3000 });
          console.log(err);
          reject(err);
        }
      );
    });
  }

  get_message_send(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.messageService.get_m_send(this.selected_ami.id).subscribe(
        (res: any) => {
          console.log("message sent", res);
          this.List_message_envoyer = res;
          resolve();
        },
        (err: any) => {
          this.toastService.error({ detail: "erreur", summary: "Une erreur est survenu ", duration: 3000 });
          console.log(err);
          reject(err);
        }
      );
    });
  }

  sendMessage() {
    const data = new FormData();
    data.append("contente", this.message.content);
    data.append("receiverId", this.selected_ami.id);
    this.messageService.send(data).subscribe(
      (res: any) => {
        console.log(res);
        this.toastService.success({ detail: "succes", summary: "Message envoyé ", duration: 3000 });
        this.reloadMessage();
      },
      (err: any) => {
        this.toastService.error({ detail: "erreur", summary: "Une erreur est survenu ", duration: 3000 });
        console.log(err);
      }
    );
  }

  sendFile() {
    const data = new FormData();
    data.append("file", this.selected_file);
    data.append("receiverId", this.selected_ami.id);
    
    this.messageService.send(data).subscribe(
      (res: any) => {
        console.log(res);
        this.toastService.success({ detail: "succes", summary: "Message envoyé ", duration: 3000 });
        this.reloadMessage();
      },
      (err: any) => {
        this.toastService.error({ detail: "erreur", summary: "Une erreur est survenu ", duration: 3000 });
        console.log(err);
      }
    );
  }
}
