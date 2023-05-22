import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckingRentingComponent } from './checking-renting/checking-renting.component';
import { RenovationCartComponent } from './renovation-cart/renovation-cart.component';


const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: '',
        component: CheckingRentingComponent,
    
      },
      {
        path: 'renovation/:id',
        component: RenovationCartComponent,
    
      },
      
     
    ]

  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class checkingRoutingModule { }
