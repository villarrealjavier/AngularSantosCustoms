import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteComponent } from './delete/delete.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { CarsRoutingModule } from './cars-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { CarsForBrandComponent } from './cars-for-brand/cars-for-brand.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DeleteComponent,
    AddComponent,
    ListComponent,
    UpdateComponent,
    CarsForBrandComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    SharedModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    InputTextModule,
    ReactiveFormsModule

  ],exports:[
    DeleteComponent,
    AddComponent,
    ListComponent,
    UpdateComponent,
    CarsRoutingModule,
    CarsForBrandComponent
  ]
})
export class CarsModule { }
