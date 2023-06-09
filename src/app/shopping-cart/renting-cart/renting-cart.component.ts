import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarsService } from 'src/app/cars/cars.service';
import { cars } from 'src/app/interfaces/cars.interface copy';
import Swal from 'sweetalert2';
import { ShoppingService } from '../services/shopping.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-renting-cart',
  templateUrl: './renting-cart.component.html',
  styleUrls: ['./renting-cart.component.css']
})
export class RentingCartComponent {

  car!:cars //Coche el cual vamos a hacerle el renting
 username!:string
 precioRenting!:number
 precioRenting48!:number
 jwt: string | null = null; // Token
  constructor(private route:ActivatedRoute, private carService:CarsService, private shoppingService:ShoppingService,private authService:AuthService,
    private router:Router){

  }

  ngOnInit(){
    this.jwt = localStorage.getItem('Authorization'); //Obtenemos el token
    const id =this.route.snapshot.params["id"] //Recogemos el identificador del coche
    console.log(id)
    if(this.jwt){
      this.username=this.authService.returnUser(this.jwt) //Devuelve el username a partir del token
      this.carService.getCarsbyId(id).subscribe({ //Buscamos el coche mediante su identificador
        next:(resp)=>{
          this.car=resp //Asignamos el coche a la variable
          this.precioRenting= Math.round((this.car.price/2)/24)
          this.precioRenting48= Math.round((this.car.price/2)/48)
         //Devuelve el username a partir del token
          
         
          
          
          
  
        },error:(e)=>{ //Si hay algun error, lanzamos un mensaje de error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se ha podido obtener la marca!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
        }
      })
    }
  }

  acceptRenting(plan:number){
    let planString = plan.toString();
    console.log(plan)
    this.shoppingService.addRenting(this.car.num_bastidor,this.username,planString).subscribe({
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


 

