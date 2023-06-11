import { Injectable } from '@angular/core';
import { cars } from '../../interfaces/cars.interface copy';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Purchase } from 'src/app/interfaces/Purchase.interface';
import { Renting } from 'src/app/interfaces/renting.interface';

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

 //Método que realiza la peticion para grabar la compra
 getPurchaseByUser(username:string):Observable<Purchase[]>{
  return this.http.get<any>(`${environment.urlApi}Purchase/${username}`);
}

 //Método que realiza la peticion para obtener el historial de Renting
 getRentingByUser(username:string):Observable<Renting[]>{
  return this.http.get<any>(`${environment.urlApi}HistoryRenting/${username}`);
}

//Método que realiza la peticion para grabar el renting
addRenting(num_bastidor:string, username:string, plan:string):Observable<cars[]>{
  const formData = new FormData(); //Creamos un formulario
  formData.append('num_bastidor', num_bastidor); //Añadimos el username al formulario
  formData.append('username', username); //Añadimos el username al formulario
  formData.append('plan', plan); //Añadimos el username al formulario
  

  return this.http.post<any>(`${environment.urlApi}Renting`,formData)
}

//Método que realiza la peticion para actualizar el renting
updateRenting(idRenting:string, username:string, plan:string):Observable<cars[]>{
  const formData = new FormData(); //Creamos un formulario
  formData.append('idRenting', idRenting); //Añadimos el username al formulario
  formData.append('username', username); //Añadimos el username al formulario
  formData.append('plan', plan); //Añadimos el username al formulario
  

  return this.http.put<any>(`${environment.urlApi}Renting`,formData)
}

 //Método que realiza la peticion para buscar el renting
getRenting(id:string):Observable<Renting>{
  return this.http.get<any>(`${environment.urlApi}Renting/${id}`);
}

 //Método que realiza la peticion para grabar la compra
 PurchaseCar(car:cars, id:string, username:string, diffAnnos:string):Observable<cars>{
  console.log(car, id,username,diffAnnos)
  const formData = new FormData(); //Creamos un formulario
  formData.append('numbers_bast', new Blob([JSON.stringify(car)], {type: 'application/json'}), 'numbers_bast'); //Añadimos la lista de coches
  formData.append('username', username); //Añadimos el username al formulario
  formData.append('annos', diffAnnos); //Añadimos el numero de Años al formulario
  formData.append('idR', id); //Añadimos el numero de Años al formulario


  

  return this.http.post<any>(`${environment.urlApi}PurchaseCar`,formData)
}


  

}
