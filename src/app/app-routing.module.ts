import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuardian } from './auth-guardian.service';
import { CheckingModule } from './checking/checking.module';





const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
},
  

  {
    path: 'cars',
    loadChildren: () => import('./cars/cars.module').then(m => m.CarsModule)
   
  },
  {
    path: 'shoppingCart',
    loadChildren: () => import('./shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule),canActivate:[AuthGuardian]
   
  },
  {
    path: 'exemplary',
    loadChildren: () => import('./exemplary/exemplary.module').then(m => m.ExemplaryModule),canActivate:[AuthGuardian]
   
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),canActivate:[AuthGuardian]
  },
  {
    path: 'verify',
    loadChildren: () => import('./verify/verify.module').then(m => m.VerifyModule)
    },
    {
      path: 'checking',
      loadChildren: () => import('./checking/checking.module').then(m => m.CheckingModule)
      },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
