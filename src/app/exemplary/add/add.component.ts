import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandService } from '../../category/list/Brandservices.service';
import { brand } from '../../interfaces/brand.interface';
import { ExemplaryService } from '../services/exemplary.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
  ]
})
export class AddComponent {

  //Implementamos formbuilder, router, servicio de marcas, y servicio de modelos
  constructor(private fb: FormBuilder, private router:Router, private brandService:BrandService, private exemplaryService:ExemplaryService ) { }

  brand!:brand //Marca
  name_brand!:string
  brands:brand[]=[] //Lista de marcas
  opcionSeleccionado: string  = '0'; // Opcion seleccionada
  verSeleccion: string        = ''; //Valor seleccionado
  name_exemplary:string='' //Nombre del modelo

  ngOnInit(): void {
    this.getBrands() //Obtenemos las marcas
  }
  //Formulario reactivo el cual posee las restricciones para cada campo
  myForm: FormGroup = this.fb.group({
    name_exemplary:['',[Validators.required, Validators.minLength(2)]],
    name_brand:['',[Validators.required, Validators.minLength(3)]],
  })

   //Validacion para los campos
   isValidField(field:string){
    return this.myForm?.controls[field].errors //Se comprueba si tiene errores, si es inválido y si han sido modificados
    && this.myForm?.controls[field].invalid && this.myForm.controls[field].touched
  }

  //@ViewChild('formLogin') formLogin!: NgForm //Formulario de tipo template

  //Validador del nombre del modelo
  /*
  validateExemplary(): boolean{
    //Asignamos el valor a una variable que mas tarde usaremos
    this.name_exemplary = this.formLogin?.controls['name_exemplary'].value;
    
    return this.formLogin?.controls['name_exemplary'].invalid //Comprobamos si es inválido o si esta modificado
    && this.formLogin?.controls['name_exemplary'].touched;

  }*/

  
 
  //Método para guardar un modelo
  saveExemplary(){
    this.name_exemplary=this.myForm.get('name_exemplary')?.value
    this.name_brand=this.myForm.get('name_brand')?.value
    this.brandService.getBrandbyId(this.name_brand).subscribe({ //Realiza la peticion llamando al servicio, y busca la marca por id
      next:(resp)=>{
        console.log(resp)
        this.brand=resp //Asigna la marca a una variable
        return this.exemplaryService.saveExemplary(this.name_exemplary,this.brand).subscribe({ // Realiza la peticion para guardar el modelo llamando al servicio
          next:(resp)=>{
            if(resp){ //Si obtenemos una respuesta le enviamos un mensaje de éxito
              Swal.fire({
                icon: 'success',
                title: 'El modelo ha sido añadido con éxito!',
                text: 'Estas de vuelta en el listado!',
            });
            this.router.navigate(['/exemplary/listExemplary']) //Redirigimos al listado de modelos
              
            }
          },
          error: (e)=>{ //Si obtenemos un error, lanzamos mensaje de error
            Swal.fire({
              icon: 'error',
              title: 'Modelo existente.',
              text: 'Recuerda que el nombre de los modelos son únicos de cada marca!',
              footer: '<a href="">Why do I have this issue?</a>'
            })
          }
        })
      },
      error: (e)=>{ //Si obtenemos un error, lanzamos mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error, por favor revisa los campos.',
          text: 'Revisa los campos del modelo introducido!',
          footer: 'Ha ocurrido un error!'
        })
      }
    })
    

  }
  //Método que realiza una peticion de todas las marcas y las asigna a la lista
  getBrands(){

    this.brandService.getBrands().subscribe({
      next:(resp=>{
        this.brands=resp

      })
    })
  }
  //Método para que cambie la seleccion en funcion del valor escogido
  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.opcionSeleccionado;
    
}

}
