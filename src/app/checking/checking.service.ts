import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Renting } from '../interfaces/renting.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CheckingService {

  constructor(private http: HttpClient) { }

  //Metodo que realiza la peticion para eliminar un coche
  deleteRenting(id:string):Observable<Renting>{
    return this.http.delete<Renting>(environment.urlApi+"Renting/"+id)

  }
}
