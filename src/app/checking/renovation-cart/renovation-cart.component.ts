import { Component } from '@angular/core';
import { cars } from 'src/app/interfaces/cars.interface copy';
import { ActivatedRoute, Router } from '@angular/router';
import { CarsService } from 'src/app/cars/cars.service';
import { ShoppingService } from 'src/app/shopping-cart/services/shopping.service';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';
import { Renting } from 'src/app/interfaces/renting.interface';

@Component({
  selector: 'app-renovation-cart',
  templateUrl: './renovation-cart.component.html',
  styleUrls: ['./renovation-cart.component.css']
})
export class RenovationCartComponent {

  car!:cars //Coche el cual vamos a hacerle el renting
  username!:string //Username del usuario
  precioRenting!:number //Precio del renting
  precioRenting48!:number //Precio del renting en 48 meses
  renting!:Renting //Renting
  jwt: string | null = null; // Token
   constructor(private route:ActivatedRoute, private carService:CarsService, private shoppingService:ShoppingService,private authService:AuthService,
     private router:Router){

 
   }

   ngOnInit(){
    this.jwt = localStorage.getItem('Authorization'); //Obtenemos el token
    const id =this.route.snapshot.params["id"] //Recogemos el identificador del coche
    
    if(this.jwt){
      this.username=this.authService.returnUser(this.jwt) //Devuelve el username a partir del token
    this.shoppingService.getRenting(id).subscribe({
      next: (resp)=>{
        this.renting=resp; //Asignamos el renting
        this.car=resp.num_bastidor //Asignamos el coche
        this.precioRenting= Math.round((this.car.price/2)/24) //Asignamos un precio
        this.precioRenting48= Math.round((this.car.price/2)/48) //Asignamos otro precio
      }
    })
  }
   }

   //Metodo de aceptar el renting
   acceptRenting(plan:number){
    let planString = plan.toString(); //Pasamos el plan a String para la peticion
    let idString = this.renting.id.toString() //Pasamos el id a String para la peticion
   
    this.shoppingService.updateRenting(idString,this.username,planString).subscribe({ //Realizamos la peticion de realizar el renting
      next:(resp)=>{
        Swal.fire({
          icon: 'success',
          title: 'Gracias por su Renting!',
          text: 'Estas de vuelta en el listado!',
      });
      this.router.navigate(['/cars/listCar']) //Redirigimos a la lista de coches
      },error:(e)=>{ //Si hay algun error, lanzamos un mensaje de error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se ha podido realizar el Renting!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
        }
    })
  }
}
