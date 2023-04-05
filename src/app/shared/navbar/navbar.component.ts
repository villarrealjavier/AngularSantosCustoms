import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { RolGuardGuard } from '../../rol-guard.guard';
import { user } from '../../interfaces/user.interface';
import { UsersService } from '../../users/services/users.service';
import { cars } from '../../interfaces/cars.interface copy';
import { ShoppingService } from '../../shopping-cart/services/shopping.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router,private authService: AuthService,private userService:UsersService, private shopping:ShoppingService) { }

  username!:string //username
  admin!:boolean //Booleano que indica si es admin o no
  jwt: string | null = null; //token del usuario actual
  user!:user  // usuario logeado

  carrito: cars[]= this.shopping.getShopping(); //Recupera el carrito

  
  
  
  

  ngOnInit(): void {
    this.jwt = localStorage.getItem('Authorization'); //Recupera el token
    

    

    
    if(this.jwt){ //Comprueba si tiene el token
      this.admin = this.authService.isUserAdmin(this.jwt); //Le asigna true or false en funcion de si es admin o no
      this.username=this.authService.returnUser(this.jwt) // Devuelve el username actual en funcion del token
      this.userService.getUser(this.username).subscribe({ //Obtiene el usuario en funcion del username, realizando la peticion
        next:(resp=>{
          this.user=resp //Asigna el el usuario a la variable
         

        })
      })
    }
  }
 

  //Metodo para realizar logout 
  logout(){
    localStorage.removeItem("Authorization"); //Eliminamos el token
    localStorage.removeItem("username"); //Eliminamos el username
    localStorage.removeItem("role"); //Eliminamos el rol
    localStorage.setItem("loggin","false") //Ponemos el loggin a false
    window.location.reload() //Recargamos el navbar para que salga el boton de iniciar sesion
    

  }

  
  
}
