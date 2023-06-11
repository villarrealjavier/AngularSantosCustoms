import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { images } from '../interfaces/images.interfaces';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  addImages(file:File, json:any):Observable<images>{
    const formData = new FormData(); //Creamos un formdata
   
    formData.append('file', file, file.name); //Metememos el file
    formData.append('car', new Blob([JSON.stringify(json)], {type: 'application/json'})); // Metemos el json que almacena el coche
    
    return this.http.post<images>(environment.urlApi+"Images", formData)

   }

   deleteImages(id:number):Observable<images>{
    return this.http.delete<images>(environment.urlApi+"Image/"+id);

   }


}
