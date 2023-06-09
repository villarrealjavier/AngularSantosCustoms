import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from 'src/app/interfaces/user.interface';
import { UsersService } from '../services/users.service';
import { AuthService } from '../../auth/auth.service';
import { ImagesService } from 'src/app/cars/images.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styles: [
  ]
})
export class UpdateComponent {

  userActual!:user; //Usuario actual
  user!:user //Usuario
  username!:string //Nombre de usuario
  jwt: string | null = null; // Token

//Implementamos el servcio de usuario, activatedRouter, formbuilder, authService y router
  constructor(private service:UsersService, private route:ActivatedRoute,private fb:FormBuilder, private authService:AuthService, private router:Router
    ,private imageService:ImagesService){

  }
  //Json para la peticion
  json: any = {
  username:'',
  name: '',
  password: '',
  email:''
};

  ngOnInit(){
    this.jwt = localStorage.getItem('Authorization'); //Obtenemos el token
    
    const id = this.route.snapshot.params["id"] //Recogemos el id de los parámetros
    if(this.jwt){
    this.username=this.authService.returnUser(this.jwt) //Devuelve el username a partir del token
    this.service.getUser(this.username).subscribe({ //Obtiene el usuario mediante el username
      next:(resp=>{
        this.userActual=resp //Se lo asigna el usuario a la variable
        this.service.getUser(id).subscribe({ // Busca el usuario obtenido por el parámetro
          next:(resp=>{
            this.user=resp //Se lo asigna a la variable user
            this.json.username=resp.username
            this.json.name=resp.name
            this.json.password=resp.password
            this.json.email=resp.email

            if(this.userActual.username!=this.user.username){ //Comprueba que si el usuario actual a editar es distinto del logeado, te envia a pagina notFound
              this.router.navigate(['/**'])
            }
          })
        })
        
       

      })
    })
  }
    
    
  }
  //Formulario reactivo con sus restricciones para cada campo
  myForm: FormGroup = this.fb.group({
    name:['',[Validators.required, Validators.minLength(3)]],
    email:['',[Validators.required, Validators.minLength(3),Validators.email]],
    repeatpassword:['',[Validators.required,Validators.minLength(6),Validators.maxLength(15),this.match('password')]],
    password:['',[Validators.required, Validators.minLength(6),Validators.maxLength(15),]],

  })

 

  addImageForm: FormGroup = this.fb.group({
    files:['',[Validators.required]],
    fileSource:['',[Validators.required]] //Archivo el cual añadiremos en la peticion
  })

  //Método para que cambie el archivo cada vez que se cambie el archivo introducido
  onFileChangeImage(event:any) {  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addImageForm.patchValue({
        fileSource: file
      });
    }
  }

  addImages(){
    this.service.updateUserImage(this.addImageForm.get('fileSource')?.value, this.json).subscribe({
      next:(resp)=>{
        window.location.reload();
        
      },error:(e)=>{
        alert("No se ha podido subir la imagen");
      }
    })
  }


  //Método para validar cada campo
  isValidField(field:string){
    return this.myForm?.controls[field].errors //Comprueba si tiene errores, si es inválido y si esta modificado
    && this.myForm?.controls[field].invalid && this.myForm.controls[field].touched
  }
  //Método para validar contraseña
  isValidPassword(field:string){
    return this.myForm?.controls[field].errors
    && this.myForm?.controls[field].invalid && this.myForm.controls[field].touched && this.myForm.controls[field].errors?.['mismatch']//Comprueba si tiene errores, si es inválido y si esta modificado
    // y si ambas contraseñas son iguales
  }

  //Método que comprueba que ambas contraseñas son iguales
  match(controlName: string) {
    return (control: FormControl) => {
      if (!control.parent) {
        return null;
      }

      return control.value === control.parent.get(controlName)?.value? null : { mismatch: true };
    };
  }

  //Método para actualizar un usuario
  updateUser(){
//Se le asigna los valores del formulario al json
    this.json.username=this.user.username
    this.json.password = this.myForm.get('password')?.value
    this.json.email= this.myForm.get('email')?.value
    this.json.name=this.myForm.get('name')?.value

   
    this.service.updateUser(this.json,this.myForm.get('fileSource')?.value,this.user.username).subscribe({ //Realiza la peticion llamando al servicio y recarga la página
      next:(resp)=>{
        window.location.reload()
      },
      error: (e)=>{ //Si obtenemos un error, lanzamos mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Revise los campos.',
          text: 'Recuerda escribir campos válidos!',
          footer: 'Ha ocurrido un error'
        })
      }
    })
    this.myForm.reset() //Resetea el formulario
    
  }
  

}
