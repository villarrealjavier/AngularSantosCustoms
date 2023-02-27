import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { CarsForBrandComponent } from './cars-for-brand/cars-for-brand.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: 'addCar',
        component: AddComponent,
    
      },
      {
        path: 'deleteCar',
        component: DeleteComponent,
    
      },
      {
        path: 'listCar',
        component: ListComponent,
    
      },
      {
        path: 'updateCar',
        component: UpdateComponent,
    
      },
      {
        path: 'carsByBrand/:id',
        component: CarsForBrandComponent,
    
      },
    ]

  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule { }
