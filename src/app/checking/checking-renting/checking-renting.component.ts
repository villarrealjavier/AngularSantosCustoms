import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from '../../interfaces/user.interface';
import { cars } from 'src/app/interfaces/cars.interface copy';
import { CarsService } from 'src/app/cars/cars.service';
import { CheckingService } from '../checking.service';
import { ShoppingService } from 'src/app/shopping-cart/services/shopping.service';
import { Renting } from 'src/app/interfaces/renting.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checking-renting',
  templateUrl: './checking-renting.component.html',
  styleUrls: ['./checking-renting.component.css']
})
export class CheckingRentingComponent {

  num_bastidor!:string
  username!:string;
  renting!:Renting
  car!:cars
  constructor(private route:ActivatedRoute, private carService: CarsService, private checkingService:CheckingService, private shoppingService:ShoppingService,
    private router:Router){

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.num_bastidor=params['car']  //Recoge el codigo de los parametros mediante los queryParams
      this.username=params['username']//Recoge el username de los parametros mediante los queryParams
      this.shoppingService.getRenting(this.num_bastidor).subscribe({
        next:(resp)=>{
          this.car=resp.num_bastidor;
          this.renting=resp;
          console.log(this.renting,this.car)
        }
      })


    })
  }

  deleteRenting(){
    let idString= this.renting.id.toString()
    this.checkingService.deleteRenting(idString).subscribe({
      next:(resp)=>{
          Swal.fire({
            icon: 'success',
            title: 'Renting Eliminado!',
            text: 'Estas de vuelta en el listado!',
        });
        this.router.navigate(['/cars/listCar']) //Redirigimos a la lista de coches
      },error:(e)=>{ //Si hay algun error, lanzamos un mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se ha podido eliminar el renting!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    })
  }
}
