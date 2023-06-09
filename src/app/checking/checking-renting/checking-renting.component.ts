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

  num_bastidor!:string //Numero de identificacion del coche
  id!:string; //Id
  username!:string; //Username del usuario
  renting!:Renting // Renting
  car!:cars //Coche
  constructor(private route:ActivatedRoute, private carService: CarsService, private checkingService:CheckingService, private shoppingService:ShoppingService,
    private router:Router){

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.num_bastidor=params['car']  //Recoge el codigo de los parametros mediante los queryParams
      this.id=params['car']  //Recoge el codigo de los parametros mediante los queryParams
      this.username=params['username']//Recoge el username de los parametros mediante los queryParams
      console.log(this.num_bastidor, this.id,this.username)
      this.shoppingService.getRenting(this.id).subscribe({
        next:(resp)=>{
          this.car=resp.num_bastidor;
          this.renting=resp; //Asigamos el renting
          
        }
      })


    })
  }

  //Eliminamos un renting
  deleteRenting(){
    let idString= this.renting.id.toString()
    this.checkingService.deleteRenting(idString).subscribe({ //Llamamos al servicio para realizar la eliminacion del renting
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

  //Cambiar renting
  changeRenting(){
    let idString= this.renting.id.toString()
    this.checkingService.deleteRenting(idString).subscribe({ //Eliminamos el renting, mediante la llamada al servicio
      next:(resp)=>{
          Swal.fire({
            icon: 'success',
            title: 'Renting Eliminado, escoja nuevo renting!',
            text: 'Estas de vuelta en el listado para elegir nuevo Renting!',
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

  //Comprar vehículo actual
  purchaseVehicle(){
    
    let fecha1 = new Date(this.renting.date_start); //Recogemos la fecha de inicio
    var fecha2=new Date(this.renting.date_end);//Recogemos la fecha de fin

    // Obtener los años y meses de diferencia
    var diffAnios = fecha2.getFullYear() - fecha1.getFullYear();

  // Verificar si la fecha final es anterior a la fecha inicial en el mismo mes y día
  if (fecha2 < new Date(fecha1.getFullYear() + diffAnios, fecha1.getMonth(), fecha1.getDate())) {
    diffAnios--;
  }
    let precio;
   
    let idString = this.renting.id.toString(); //Pasamos a String para poder realizar la peticion
    let annosString = diffAnios.toString(); //Pasamos a String para poder realizar la peticion
    
    this.shoppingService.PurchaseCar(this.car,idString,this.username, annosString).subscribe({ //Mandamos la peticion la cual realizará la comrpa
      next:(resp)=>{
          precio=resp.price;
          Swal.fire({ //Alerta de realizar la compra
            title: 'Seguro que quiere realizar la compra?',
            text: "El precio con el descuento por año es de:" + precio,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, comprar!'
          }).then((result) => {
            if (result.isConfirmed) { 
              this.router.navigate(['/cars/listCar']) //Redirigimos a la lista de coches
              Swal.fire(
                'Gracias por su compra!',
                'Recibirá su coche en unos dias.',
                'success'
              )
            }
          })

       
      },error:(e)=>{ //Si hay algun error, lanzamos un mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se ha podido realizar la compra!',
          footer: 'Pruebe en otro momento'
        })
      }
    })
  }
 
}
