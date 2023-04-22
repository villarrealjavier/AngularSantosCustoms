import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, CanActivateChild } from '@angular/router';

import { RolGuardGuard } from '../rol-guard.guard';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingHistoryComponent } from './shopping-history/shopping-history.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: 'cart',
        component: ShoppingCartComponent,
    
      },
      {
        path: 'history/:id',
        component: ShoppingHistoryComponent,
    
      },
     
    ]

  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
