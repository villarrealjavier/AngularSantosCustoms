import { Component } from '@angular/core';
import { cars } from '../../interfaces/cars.interface copy';
import { ShoppingService } from '../services/shopping.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsersService } from '../../users/services/users.service';
import { user } from '../../interfaces/user.interface';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  listShoppingCart:cars[] =[] 
  total!:number;
  usernameActual!:string
  json: any = {
    username:'',
    name: '',
    password: '',
    email:''
  };


  constructor(private service: ShoppingService, private router:Router,private userService:UsersService){


  }

  ngOnInit(){
   
    let username= localStorage.getItem('username')
   
   if(username!=null){
    this.usernameActual=username
    this.getCart()
    
  }
  
    this.total=this.getTotal()

  }

  getCart() {
    const carrito = window.sessionStorage.getItem('carrito');
    if (carrito) {
      this.listShoppingCart = JSON.parse(carrito);
    }
  }
  deleteItem(index:number){
    this.total= this.total-this.listShoppingCart[index].price
   
    this.listShoppingCart.splice(index,1)
    this.service.shoppingCart.splice(index,1)
    
    window.sessionStorage.setItem('carrito', JSON.stringify(this.listShoppingCart));

  }

  vaciarCarrito(){
    this.listShoppingCart=[]
    this.service.shoppingCart=[]
    window.sessionStorage.setItem('carrito', JSON.stringify(this.listShoppingCart));


  }

 

  getTotal() {
    let totalCompra=0
    for (const car of this.listShoppingCart) {
      totalCompra=totalCompra + car.price
    
      
    }
    
    return totalCompra

  
  }
  Purchase(){
    
    this.service.Purchase(this.listShoppingCart,this.usernameActual).subscribe({
      next:(resp)=>{
        
        Swal.fire({
          icon: 'success',
          title: 'Gracias por su compra!',
          text: 'Estas de vuelta en el listado!',
      });
       this.router.navigate(['/cars/listCar'])
       this.vaciarCarrito();
       this.total=0


       
      },error:(e)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido al tratar de realizar la compra!',
        })

      }
    })
  }
  

}
