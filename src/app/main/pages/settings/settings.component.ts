import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { currentUser } from 'src/app/environement/global';
import { SettingService } from 'src/app/services/setting_service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  current_user:any;
  selected_file:any;

  profile:any={
    nom:"",
    prenom:"",
    competence:"",
    statusMatri:"",
    reseaux:[]

  }
  showOtp:boolean=false;

  changePass:any={
    email:"",
    code:"",
    password:""
  }

 constructor(private settingService:SettingService,private toastService:NgToastService,private router: Router){
 }
  ngOnInit(): void {
    this.loadLocalInfo();
  }
 
  loadLocalInfo(){
    this.current_user=currentUser;
  }


  onFileSelected(event:any){
    this.selected_file = event.target.files[0];
    if (this.selected_file) {
     const reader = new FileReader();
     reader.readAsDataURL(this.selected_file);
     reader.onload = () => {
       // Lecture terminée, mettez à jour l'attribut avatar avec l'URL de données
       this.current_user.profilePictureUrl = reader.result;
       console.log('New image selected:', this.current_user.profilePictureUrl);
     };
      this.updateimg(this.selected_file);
   }
 
 }

updateimg(file:any){
  const formdata= new FormData()
  formdata.append('image',file) 
     this.settingService.UpdateAvatar(formdata).subscribe(
      (response)=>{
           console.log(response);
           this.settingService.UpdateLocaleUserInfo(response);
           this.loadLocalInfo();
           this.toastService.success({detail:"Succes",summary:"Votre image a été mise àjour",duration:3000})
      },
      (error)=>{
        console.log(error);
        this.toastService.error({detail:"Erreur",summary:"Une erreur est survenue",duration:3000})
      }
     );
 }

 updateData(){
  const data={
    nom:this.current_user.nom,
    prenom:this.current_user.prenom,
    sexe:this.current_user.sexe,
    date_de_naissance:this.current_user.date_de_naissance,
    reseaux:this.current_user.reseaux,
    experience:this.current_user.experience,
    statusMatri:this.current_user.statusMatri
  }
  console.log(data);
  this.settingService.UpdateProfile(data).subscribe(
   (response)=>{
    console.log(response);
    this.settingService.UpdateLocaleUserInfo(response);
     this.loadLocalInfo();
    this.toastService.success({detail:"Succes",summary:"Info  mise àjour",duration:3000})

   },
   (error)=>{
    console.log(error);
    this.toastService.error({detail:"Erreur",summary:"Une erreur est survenue",duration:3000})
   }
  );
 }



 toggleRelation(relation: string) {
  const index = this.current_user.reseaux.indexOf(relation);
  if (index > -1) {
    this.current_user.reseaux.splice(index, 1);
  } else {
    this.current_user.reseaux.push(relation);
  }

  console.log(this.current_user);
}


sendCode(){
  const data={email:this.changePass.email};
  console.log(data);
  this.settingService.sendCode(data).subscribe(
    (response)=>{
      console.log(response);
      this.showOtp=true;
    },
    (error)=>{
      console.log(error);
      this.toastService.error({detail:"Erreur",summary:"Une erreur est survenue",duration:3000})
    }
  )

}
updatePass(){
  console.log(this.changePass);
  this.settingService.changeMdp(this.changePass).subscribe(
    (response)=>{
      console.log(response);
      this.showOtp=false;
      this.toastService.success({detail:"success",summary:"Mdp modifié",duration:3000})
      this.router.navigate(['/auth/login']).then(() => {
        window.location.reload();
      });
    },
    (error)=>{
      console.log(error);
      this.toastService.error({detail:"Erreur",summary:"Une erreur est survenue",duration:3000})
    }
  )


}


}
