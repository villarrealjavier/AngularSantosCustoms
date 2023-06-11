import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { cars } from '../interfaces/cars.interface copy';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http: HttpClient) { }

//Metodo que realiza la peticion para obtener todos los coches
  getCars():Observable<cars[]>{
    
    return this.http.get<cars[]>(environment.urlApi+"Cars")

  }
//Metodo que realiza la peticion para obtener un coche
  getCarsbyId(id:string):Observable<cars>{
    
    return this.http.get<cars>(environment.urlApi+"Cars/"+id)

  }
//Metodo que realiza la peticion para obtener todos los coches en funcion de su marca
  getCarsbyBrand(brand:string):Observable<cars[]>{
    
    return this.http.get<cars[]>(environment.urlApi+"CarsbyBrand/"+brand)

  }
//Metodo que realiza la peticion para añadir un coche
  addCars(file:File, json:any):Observable<cars>{
    const formData = new FormData(); //Creamos un formdata
    formData.append('file', file, file.name); //Metememos el file
    formData.append('car', new Blob([JSON.stringify(json)], {type: 'application/json'})); // Metemos el json que almacena el coche
    
    return this.http.post<cars>(environment.urlApi+"Cars", formData)

   }
   updateCars(file:File, json:any, num_bastidor:string):Observable<cars>{
    const formData = new FormData(); //Creamos un formdata
    formData.append('car', new Blob([JSON.stringify(json)], {type: 'application/json'})); // Metemos el json que almacena el coche
    return this.http.put<cars>(environment.urlApi+"Cars/"+num_bastidor, formData)

   }
//Metodo que realiza la peticion para eliminar un coche
   deleteCars(id:string):Observable<cars>{
     return this.http.delete<cars>(environment.urlApi+"Cars/"+id)

   }
}
