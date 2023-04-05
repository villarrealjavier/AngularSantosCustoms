import { Component } from '@angular/core';
import { user } from 'src/app/interfaces/user.interface';
import { UsersService } from '../services/users.service';
import { AuthService } from '../../auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
  
})
export class ListComponent {
  listUsers:user[]=[] //Listado de usuarios
  usernameActual!:string; //Username del usuario
  userActual!:user
  jwt: string | null = null; //token del usuario actual
  admin!:boolean;
  userAcambiar!:user

  //Implementamos el servicio de usuarios, y el authService
  constructor(private service:UsersService, private authService:AuthService){

  }


  ngOnInit(){

    this.jwt = localStorage.getItem('Authorization'); //Recupera el token
    
    if(this.jwt){ //Comprueba si tiene el token
      this.admin = this.authService.isUserAdmin(this.jwt); //Le asigna true or false en funcion de si es admin o no
      this.usernameActual=this.authService.returnUser(this.jwt) // Devuelve el username actual en funcion del token
      this.service.getUser(this.usernameActual).subscribe({ //Obtiene el usuario en funcion del username, realizando la peticion
        next:(resp=>{
          this.userActual=resp //Asigna el el usuario a la variable
         

        })
      })
    }
    this.service.getUsers().subscribe({ //Obtenemos todos los usuarios y se los asignamos a la lista
      next:(resp=>{
        this.listUsers=resp
      
      })
    })
}

 //Json para la peticion
 json: any = {
  username:'',
  name: '',
  password: '',
  email:'',
  role:''
};

changeRol(rol:string,username:string){
  
  this.service.getUser(username).subscribe({ //Obtiene el usuario en funcion del username, realizando la peticion
    next:(resp=>{
      this.json.username=resp.username
      this.json.name=resp.name
      this.json.password=resp.password
      this.json.email=resp.email
      this.json.role=rol;
      this.service.updateUserRole(this.json).subscribe({
        next:(resp)=>{
          alert("Rol cambiado");
          window.location.reload();
        }
      })
     

    })
  })
}


}
