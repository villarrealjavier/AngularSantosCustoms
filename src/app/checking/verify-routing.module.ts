import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckingRentingComponent } from './checking-renting/checking-renting.component';


const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: '',
        component: CheckingRentingComponent,
    
      },
     
    ]

  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class checkingRoutingModule { }
