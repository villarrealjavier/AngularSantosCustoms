import { Component } from '@angular/core';
import { cars } from '../../interfaces/cars.interface copy';
import { ActivatedRoute } from '@angular/router';
import {  CarsService } from '../cars.service';
import { ShoppingService } from 'src/app/shopping-cart/services/shopping.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cars-for-brand',
  templateUrl: './cars-for-brand.component.html',
  styles: [
  ]
})
export class CarsForBrandComponent {

  carsbyBrand:cars[]=[] //Lista de coches

  //Implementamos el activateRouter, para recoger el parametro y el servicio de coches
  constructor(private route:ActivatedRoute,private service:CarsService, private shoppingService:ShoppingService){

  }
  ngOnInit(){
    const id = this.route.snapshot.params["id"] //Recogemos el id de la marca
    this.service.getCarsbyBrand(id).subscribe({ //Realizamos la peticion y buscamos todos los coches en funcion de la marca
      next:(resp=>{
        this.carsbyBrand=resp;
        
      })
    })
  }

  //Añadir a la bolsa de la compra
  addShoppingCart(car:cars){ // Recibirá un coche
    let encontrado=false; // Variable que usaremos para asegurarnos de que el coche no esta ya en el carrito
    for(let item of this.shoppingService.shoppingCart){ // Recorremos la lista de la compra
      if(item.num_bastidor==car.num_bastidor){ //Comprobamos que no haya un coche con el mismo identificador
        encontrado=true; //Si lo hay ponemos la variable a true
      }
    }
    if(encontrado==false){ //Si por el contrario no lo hay, añadimos el coche al carrito y actualizamos la lista del sessionStorage
      this.shoppingService.shoppingCart.push(car)
      window.sessionStorage.setItem('carrito', JSON.stringify(this.shoppingService.shoppingCart));
      Swal.fire({
        icon: 'success',
        title: 'Vehículo añadido al carrito',
        text: 'Su producto se encuentra en el carrito!',
    });


    }
  }
}
