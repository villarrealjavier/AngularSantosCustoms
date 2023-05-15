import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingHistoryComponent } from './shopping-history/shopping-history.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { GalleriaModule } from 'primeng/galleria';
import { RentingCartComponent } from './renting-cart/renting-cart.component';



@NgModule({
  declarations: [
    ShoppingCartComponent,
    ShoppingHistoryComponent,
    RentingCartComponent
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    GalleriaModule,
  ],exports:[
    ShoppingCartComponent,
    ShoppingHistoryComponent

  ]
})
export class ShoppingCartModule { }
