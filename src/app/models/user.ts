export class  User{

      nom: string
      prenom: string
      mdp: string
      email: string
      sexe: string
      username: string
      date_de_naissance:string
      profilePictureUrl:any
      publication:any[]
      reseaux:string[]
      statusMatri:any
      experience:any
      centre_interet:any
      competence:any
        constructor (){
            this.nom="",
            this.prenom="",
            this.email="",
            this.mdp="",
            this.sexe="",
            this.username="",
            this.date_de_naissance="",
            this.publication=[],
            this.reseaux=[]
            

        }
    
    }