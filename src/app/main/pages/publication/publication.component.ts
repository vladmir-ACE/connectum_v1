import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { currentUser } from 'src/app/environement/global';
import { PubService } from 'src/app/services/publi_services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

    // form step 
    step:number=1;
    TypeChoisit:string="";
    selected_file:any;
    selected_id:number=0;
    file_url:any;
    text:any={
      message:""
    };

    @ViewChild('fileInput') fileInput: any;

    triggerFileInput(): void {
      this.fileInput.nativeElement.click();
    }
    selected1:boolean=false;
    selected2:boolean=false;
    selected3:boolean=false;

    constructor(private pubService:PubService,private toastService:NgToastService){
    }

    ngOnInit(): void {
      this.getPub();
    }
  
    changeStep(){
      this.step=this.step==1?2:1;
    }

    choix(type:string){
       this.TypeChoisit=type
    };

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

   closbtn(){
    this.TypeChoisit="";
    this.file_url=null;
    this.selected_file=null;
    this.text=null;
    this.step=1;
    
   }

   addPub(){
    const data= new FormData();
    const pub= JSON.stringify({message:this.text.message,reseaux:this.TypeChoisit,date_publication:Date.now()});
    console.log(pub);
    data.append("file",this.selected_file);
    data.append("publication",pub);
     this.pubService.add(data).subscribe(
      (res)=>{
        console.log(res);
        this.toastService.success({detail:"Success",summary:"publication envoyé ",duration:3000});
        this.getPub();
      },
      (err)=>{
        console.log(err);
        this.toastService.error({detail:"erreur",summary:"Une erreur est survenu ",duration:3000})
      }
     );

   }

   liste:any=[];
   getPub(){
    this.pubService.get().subscribe(
      (res)=>{
        console.log(res);
        this.liste=res;
      },
      (error)=>{
        console.log(error);
        this.toastService.error({detail:"erreur",summary:"Une erreur est survenu ",duration:3000})
      }
    );
   }

   getDataToUpdate(pub:any){
    this.TypeChoisit=pub.reseaux;
    this.text.message=pub.message;
    this.file_url=pub.file;
    this.selected_id=pub.id;
    this.selected_file=null;
   };


   update(){
    const data= new FormData();
    const pub= JSON.stringify({message:this.text.message,reseaux:this.TypeChoisit,date_publication:Date.now()});
    console.log(pub);
    data.append("file",this.selected_file);
    data.append("publication",pub);
     this.pubService.update(data,this.selected_id).subscribe(
      (res)=>{
        console.log(res);
        this.toastService.success({detail:"Success",summary:"publication mis à jour ",duration:3000});
        this.getPub();
      },
      (err)=>{
        console.log(err);
        this.toastService.error({detail:"erreur",summary:"Une erreur est survenu ",duration:3000})
      }
     );

   }

   delete(id:number){
    Swal.fire({
      text:'Voulez vous vraiment suprimer cete publication ? !!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText:"Non",
      confirmButtonText: 'Oui',
      customClass: {
      actions: 'my-actions',
      cancelButton: 'order-1 right-gap',
      confirmButton: 'order-2',
      denyButton: 'order-3',
      },
      }).then((result) => {
      if (result.isConfirmed) {
        // delete operation
        this.pubService.delete(id).subscribe(
          (res)=>{
            console.log(res);
            this.getPub();
            this.toastService.success({detail:"Success",summary:"publication supprimé ",duration:300})
          },
          (err)=>{
            console.log(err);
            this.toastService.error({detail:"erreur",summary:"Une erreur est survenu ",duration:3000})
          }
        );
          
      } 
      });

   
  






  

   }



}
