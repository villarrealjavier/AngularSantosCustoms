import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { exemplary } from 'src/app/interfaces/exemplary.interface';
import { environment } from 'src/environments/environment.prod';
import { brand } from '../../interfaces/brand.interface';

@Injectable({
  providedIn: 'root'
})
export class ExemplaryService {
//Implementamos httpClient para realizar las peticiones
  constructor(private http:HttpClient) { }

  //Peticion para obtener todos los modelos
  getExemplaries():Observable<exemplary[]>{
    return this.http.get<any>(environment.urlApi+"Models")

  }
  //Peticion para actualizar un modelos
  updateExemplary(name_exemplary:string,name_brand:brand):Observable<any>{
    return this.http.put<any>(environment.urlApi+"Models/"+name_exemplary,{"name_exemplary":name_exemplary,"name_brand":name_brand})
  }
  //Peticion para eliminar un modelos
  deleteExemplary(name_exemplary:string):Observable<exemplary> {
    return this.http.delete<any>(environment.urlApi+"Models/"+name_exemplary)

  }
  //Peticion para obtener un modelo por id
  getExemplaryById(name_exemplary:string):Observable<exemplary> {
    return this.http.get<any>(environment.urlApi+"Models/"+name_exemplary)

  }
  //Peticion para añadir un modelo
  saveExemplary(name_exemplary:string,name_brand:brand):Observable<any>{
    return this.http.post<any>(environment.urlApi+"Models",{"name_exemplary":name_exemplary,"name_brand":name_brand})
    
  }
}
