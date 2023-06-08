import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  constructor(private fb: FormBuilder, private router:Router, private service:AuthService) { }

  //Formulario Reactivo con los distintos campos del registro
  registerForm: FormGroup = this.fb.group({
    username:['',[Validators.required, Validators.minLength(3)]], //Validacion de nombre de usuario
    nombre:['',[Validators.required, Validators.minLength(3)]], //Validacion de nombre 
    email:['',[Validators.required,Validators.email]], //Validacion de email
    password:['',[Validators.required,Validators.minLength(8)]], //Validacion de contraseña
    repeatpassword:['',[Validators.required,Validators.minLength(3),this.match('password')]] //Validacion de repetir contraseña
  })

  ngOnInit(): void {
  }

  //Validación de los campos
  isValidField(field:string){
    return this.registerForm?.controls[field].errors //Comprobamos si tiene errores, si es inválido y si esta modificado
    && this.registerForm?.controls[field].invalid && this.registerForm.controls[field].touched
  }

  //Validación de contraseña
  isValidPassword(field:string){
    return this.registerForm?.controls[field].errors//Comprobamos si tiene errores, si es inválido y si esta modificado, y si es la misma contraseña que la que escrita primeramente
    && this.registerForm?.controls[field].invalid && this.registerForm.controls[field].touched && this.registerForm.controls[field].errors?.['mismatch']
  }

  //Funcion la cual valida que ambas contraseñas sean iguales
  match(controlName: string) {
    return (control: FormControl) => {
      if (!control.parent) {
        return null;
      }

      return control.value === control.parent.get(controlName)?.value? null : { mismatch: true };
    };
  }

  //Metodo para guardar el usuario
  saveRegister(){
    //Asignamos los valores del formulario a las distintas variables, para no meter el valor directamente
    const username:string =this.registerForm.get('username')?.value
    const password:string = this.registerForm.get('password')?.value
    const name:string = this.registerForm.get('nombre')?.value
    const email:string =this.registerForm.get('email')?.value
    
    //Realizamos la petición 
    this.service.register(username,password,email,name
    ).subscribe({
        next: (resp) => {
          if (resp) { //Si obtenemos la respuesta, es decir el usuario
            
            if(this.registerForm.valid){ // Si el formulario es válido
            
              Swal.fire({
                icon: 'success',
                title: 'Revisa el correo electrónico y verifica el correo',
                text: '¡Bienvenido a los Santos Customs!',
            });
            this.router.navigate(['/']) //Lo redirigimos al home con para que inicie sesión, cuando verifique el correo

          }else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo debe haber salido mal!',
              footer: '<a href="">Why do I have this issue?</a>'
            })
            
            
          }}},error:(e)=>{ //Si existe algun error, devolvemos el mensaje de error
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ha ocurrido al tratar de registrar el usuario!',
            })
    
          }
        })
       }
  

  }


