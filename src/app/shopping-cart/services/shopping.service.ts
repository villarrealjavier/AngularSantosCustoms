import { Injectable } from '@angular/core';
import { cars } from '../../interfaces/cars.interface copy';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(private http: HttpClient) { }

 shoppingCart:cars[]=[] //Lista de la compra


 getShopping(){ //Método que nos devuelve la lista de la compra
  return this.shoppingCart;
 }

 //Método que realiza la peticion para grabar la compra
 Purchase(listCars:cars[], username:string):Observable<cars[]>{
  const formData = new FormData(); //Creamos un formulario
  formData.append('numbers_bast', new Blob([JSON.stringify(listCars)], {type: 'application/json'}), 'numbers_bast'); //Añadimos la lista de coches
  formData.append('username', username); //Añadimos el username al formulario
  

  return this.http.post<any>(`${environment.urlApi}Purchase`,formData)
}


  

}
