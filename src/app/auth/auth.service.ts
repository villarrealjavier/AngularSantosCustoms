import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import { user } from '../interfaces/user.interface';
import { token } from '../interfaces/token.interface';
import { UsersService } from '../users/services/users.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Cabecera para mandar un json
  httpOptions={
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }
  user!:user //Variable usuario

  //Importamos el httpClient para realizar las peticiones y el servicio de usuario
  constructor(private http:HttpClient,private service:UsersService) { }

  //Método el cual hará login
  login(username:string,password:string):Observable<boolean>{
    
    return this.http.post<any>(environment.urlApi+"signin",{'username':username,'password':password}, this.httpOptions) //Realizamos la peticion
    .pipe(switchMap(resp=>{
 
      localStorage.setItem('Authorization',resp.token) // Metemos el token en el localStorage
      
      const decodedToken :token = jwt_decode(resp.token); // Descodificamos el token
      localStorage.setItem("role", decodedToken.role) // Metemos el rol en el localStorage
      localStorage.setItem("username", decodedToken.sub) //Metemos el username en el localStorage
      localStorage.setItem('loggin',"true"); // Ponemos el loggin a true
      return of(true); //Devolvemos true
    
  }),catchError(error=>{ // Si captamos algun error, ponemos el login a false, borramos el token y devolvemos mensaje de error
    Swal.fire({
      icon: 'error',
      title: 'Nombre de usuario o contraseña incorrectos',
      text: 'Ha ocurrido un error al realizar el login!',
      
    })
    localStorage.setItem('loggin',"false");
    localStorage.removeItem("Authorization");
    
    return of(false) //Devolvemos false
  }))
  }
  //Metodo para registrarse
  register(username:string,password:string,email:string,name:string):Observable<boolean>{
    
    
    return this.http.post<any>(environment.urlApi+"sign_up/submit",{'username':username,'password':password,'email':email,'name':name}, this.httpOptions)
    .pipe(switchMap(resp=>{ //Realizamos la peticion
    

      return of(true);//Si no da error, devolvemos true
    
  }),catchError(error=>{ //Si da error devolvemos un mensaje de error y devolvemos false
    Swal.fire({
      icon: 'error',
      title: 'Ha ocurrido un error al registrarse, prueba con otro correo o nombre de usuario',
      text: 'Ha ocurrido un error!',
    })
    
    
    return of(false)
  })
  )
  }
    //Método para comprobar si esta autenticado
    isAuthenticated() {
      return localStorage.getItem('loggin') === 'true'
    }

    isUserAdmin(jwt: string): boolean {
      // Decodifica el token JWT
      const decodedToken :user = jwt_decode(jwt);
    
      // Verifica si el rol del usuario es 'administrador'
      if (decodedToken.role === 'ADMIN') {
        return true;
      } else {
        return false;
      }
    }

    returnUser(jwt: string):any{
      const decodedToken :token = jwt_decode(jwt);
      
      
      if(decodedToken){
        const username=decodedToken.sub
       
        return username;
      }

     
    }
   


}
