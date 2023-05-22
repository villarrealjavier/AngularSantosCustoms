import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckingRentingComponent } from './checking-renting/checking-renting.component';
import { checkingRoutingModule } from './verify-routing.module';

import { ShoppingRoutingModule } from '../shopping-cart/shopping-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { GalleriaModule } from 'primeng/galleria';
import { RenovationCartComponent } from './renovation-cart/renovation-cart.component';



@NgModule({
  declarations: [
    CheckingRentingComponent,
    RenovationCartComponent
  ],
  imports: [
    CommonModule,
    checkingRoutingModule,
    ShoppingRoutingModule,
    SharedModule,
    FormsModule,
    GalleriaModule,
  ],exports:[
    CheckingRentingComponent

  ]
})
export class CheckingModule { }
