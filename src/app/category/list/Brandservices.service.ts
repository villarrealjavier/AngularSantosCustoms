import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { brand } from 'src/app/interfaces/brand.interface';
import { Observable, switchMap, of, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  //Implementamos httpClient para realizar las peticiones
  constructor(private http:HttpClient) { }

  token:any=localStorage.getItem('Authorization'); 
  

  //Peticion para eliminar una marca
  deleteBrand(name_brand:string):Observable<brand>{
    
    return this.http.delete<brand>(environment.urlApi+"brand/"+name_brand)

  }

  
//Peticion para añadir una marca
  saveBrand(name_brand:string,country:string):Observable<boolean>{   
    return this.http.post<any>(environment.urlApi+"brand",{'name_brand':name_brand,'country':country})
    .pipe(switchMap(resp=>{ //Si no da error, devolvemos true
    

      return of(true);
    
  }),catchError(error=>{ //Si capta algun error, devolvemos false y mandamos mensaje de error
    Swal.fire({
      icon: 'error',
      title: 'Marca existente!',
      text: 'No puedes introducir una marca con ese nombre!',
      
    })
    return of(false)
  }))
  }

  //Peticion para obtener una marca mediante el id
  getBrandbyId(id:string):Observable<brand>{
    
    return this.http.get<brand>(environment.urlApi+"brand/"+id)

  }

  //Peticion para updatear una marca
  updateBrand(name_brand:string,country:string):Observable<boolean>{
    return this.http.put<any>(environment.urlApi+"brand/"+name_brand,{'country':country})
    .pipe(switchMap(resp=>{ //Si no da error, devolvemos true
    
      return of(true);
    
  }),catchError(error=>{ //Si capta algun error, devolvemos false y mandamos mensaje de error
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No tienes permisos!',
    })
    return of(false)
  }))
  }

  

  //Peticion para obtener una lista de marcas
  getBrands():Observable<brand[]>{
    return this.http.get<brand[]>(environment.urlApi+"brand")
  }


}
