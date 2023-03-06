import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  httpOptions={
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(private http: HttpClient) { }

  register(username:string,password:string,email:string,name:string):Observable<boolean>{
    console.log(username,password)
    
    return this.http.post<any>(environment.urlApi+"sign_up/submit",{'username':username,'password':password,'email':email,'name':name})
    .pipe(switchMap(resp=>{
    

      return of(true);
    
  }),catchError(error=>{
    Swal.fire({
      icon: 'error',
      title: 'Error al registrarse, pruebe con otra direccion de correo electrónico o nombre de usuario',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>'
    })
   
    
    return of(false)
  })
  )
  }
  
 
}
