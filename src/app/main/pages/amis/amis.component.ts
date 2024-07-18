import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { AmiService } from 'src/app/services/ami_service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-amis',
  templateUrl: './amis.component.html',
  styleUrls: ['./amis.component.css']
})
export class AmisComponent implements OnInit {


  ListeUser:any[]=[];

  ListOfDemande:any[]=[];
  ListAmis:any[]=[];

  selected_user:any;
  showProfile:boolean=false;


  constructor(private amibService:AmiService,private toastService:NgToastService){
  }
  ngOnInit(): void {
    this.load();
  }


  load(){
    this.getUsers();
    this.getAmis();
    this.getDemande();
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

  getDemande(){

    this.amibService.getDemandeRecus().subscribe(
      (res:any)=>{
        console.log(res);
        this.ListOfDemande=res;
      },
      (err:any)=>{
        console.log(err);
        this.toastService.error({detail:"erreur",summary:"Une erreur est survenu ",duration:3000});
      }
    );
  }

  getAmis(){
    this.amibService.getAmi().subscribe(
      (res:any)=>{
        console.log(res);
        this.ListAmis=res;
      },
      (err:any)=>{
        console.log(err);
        this.toastService.error({detail:"erreur",summary:"Une erreur est survenu ",duration:3000});
      }
    );

  }

  send_demande(email:string){
    console.log(email);
    this.amibService.send_demande({email:email}).subscribe(
      (res:any)=>{
        console.log(res);
        this.toastService.success({detail:"success",summary:"Demande envoyé",duration:3000});
        this.load();
      },
      (err:any)=>{
        console.log(err);
        this.toastService.error({detail:"erreur",summary:"Une erreur est survenu ",duration:3000});
      },
    );
  };

  accepter_demande(id:number){
    this.amibService.accepter_demande({demandeId:id}).subscribe(
      (res:any)=>{
        console.log(res);
        this.toastService.success({detail:"success",summary:"Demande accepté",duration:3000});
        this.load();
      },
      (err:any)=>{
        console.log(err);
        this.toastService.error({detail:"erreur",summary:"Une erreur est survenu ",duration:3000});
      },
    );

  }

  deleteAmi(email:string){
    Swal.fire({
      text:'Voulez vous vraiment suprimer cet amis ? !!',
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
      background: '#333', // Background color for dark mode
      color:'#fff'
      }).then((result) => {
      if (result.isConfirmed) {
        // delete operation
        this.amibService.deleteAmi(email).subscribe(
          (res:any)=>{
            console.log(res);
            this.toastService.success({detail:"success",summary:"Amis supprimé",duration:3000});
            this.load();
          },
          (err:any)=>{
            console.log(err);
            this.toastService.error({detail:"erreur",summary:"Une erreur est survenu ",duration:3000});
          },
        );
        
      }})
  }

  voirProfile(user:any){
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
