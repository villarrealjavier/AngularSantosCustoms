import { Component } from '@angular/core';
import { Renting } from 'src/app/interfaces/renting.interface';
import { user } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/users/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-renting-history',
  templateUrl: './renting-history.component.html',
  styleUrls: ['./renting-history.component.css']
})
export class RentingHistoryComponent {

  user!:user //Usuario
  listRenting:Renting[]=[]; //Lista de renting
  

  constructor(private service:UsersService, private route:ActivatedRoute ,private router:Router, private shoppingService:ShoppingService){

  }

  ngOnInit(){
    const id = this.route.snapshot.params["id"] //Recogemos el id de los parámetros
    
    this.shoppingService.getRentingByUser(id).subscribe( {
    next:(resp)=>{
      this.listRenting=resp;
    }
   })
   
  }
}
