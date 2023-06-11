import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { CarsForBrandComponent } from './cars-for-brand/cars-for-brand.component';
import { RolGuardGuard } from '../rol-guard.guard';
import { OneCarComponent } from './one-car/one-car.component';


const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: 'addCar',
        component: AddComponent,
        canActivate:[RolGuardGuard]
    
      },
      {
        path: 'car/:id',
        component: OneCarComponent,
        canActivate:[RolGuardGuard]
    
      },
      {
        path: 'deleteCar/:id',
        component: DeleteComponent,
        canActivate:[RolGuardGuard]
    
      },
      {
        path: 'listCar',
        component: ListComponent,
    
      },
      {
        path: 'updateCar/:id',
        component: UpdateComponent,
        canActivate:[RolGuardGuard]
    
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
