import { Component } from '@angular/core';
import { UsersService } from 'src/app/users/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from 'src/app/interfaces/user.interface';
import { ShoppingService } from '../services/shopping.service';
import { Purchase } from '../../interfaces/Purchase.interface';

@Component({
  selector: 'app-shopping-history',
  templateUrl: './shopping-history.component.html',
  styleUrls: ['./shopping-history.component.css']
})
export class ShoppingHistoryComponent {

  user!:user //Usuario
  listPurchase:Purchase[]=[];

  constructor(private service:UsersService, private route:ActivatedRoute, private router:Router, private shoppingService:ShoppingService){

  }

  ngOnInit(){
    const id = this.route.snapshot.params["id"] //Recogemos el id de los parámetros
    this.shoppingService.getPurchaseByUser(id).subscribe( {
    next:(resp)=>{
      this.listPurchase=resp;
    }
   })
   
  }

}
