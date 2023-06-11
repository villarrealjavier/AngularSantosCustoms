import { Component, ViewChild } from '@angular/core';
import { BrandService } from '../../category/list/Brandservices.service';
import { brand } from '../../interfaces/brand.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ExemplaryService } from '../services/exemplary.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styles: [
  ]
})
export class UpdateComponent {
  @ViewChild('formLogin') formLogin!: NgForm //Formulario de tipo template

  name_brand!:string
  brands:brand[]=[] //Listado de marcas
  name_exemplary!:string; //Nombre del modelo
  brand!:brand //Marca
  opcionSeleccionado: string  = '0'; //Opcion seleccionada
  verSeleccion: string        = ''; // Valor de la seleccion

  //Implementamos servicio de las marcas, ActivatedRouter, servicio de modelos y Router
  constructor(private fb: FormBuilder,private brandService:BrandService, private route:ActivatedRoute, private exemplaryService:ExemplaryService,private router:Router){

  }
  ngOnInit(){
    this.name_exemplary=this.route.snapshot.params["id"] //Recogemos el id del modelo
    this.getBrands() // Obtenemos las marcas
    
    

  }
   //Formulario reactivo el cual posee las restricciones para cada campo
   myForm: FormGroup = this.fb.group({
    name_brand:['',[Validators.required, Validators.minLength(3)]],
  })

   //Validacion para los campos
   isValidField(field:string){
    return this.myForm?.controls[field].errors //Se comprueba si tiene errores, si es inválido y si han sido modificados
    && this.myForm?.controls[field].invalid && this.myForm.controls[field].touched
  }

  //Métodos para obtener las marcas y las asignamos a la lista
  getBrands(){

    this.brandService.getBrands().subscribe({
      next:(resp=>{
        this.brands=resp

      })
    })
  }

  //Método para actualizar un modelo
  updateExemplary(){
    this.name_brand=this.myForm.get('name_brand')?.value
    this.brandService.getBrandbyId(this.name_brand).subscribe({ //Realizamos la peticion llamando al servicio para obtener una marca mediante su id
      next:(resp=>{
        this.brand=resp //Asignamos la marca a la variaable
        return this.exemplaryService.updateExemplary(this.name_exemplary,this.brand).subscribe({ //Realizamos la peticion de actualizar el modelo llamando al servicio
          next:(resp=>{
            if(resp){ //Si obtenemos una respuesta, mandamos mensaje de éxito
              Swal.fire({
                icon: 'success',
                title: 'El modelo ha sido editado con éxito!',
                text: 'Estas de vuelta en el listado!',
            });
            this.router.navigate(['/exemplary/listExemplary']) //Redirigimos al listado de modelos
              
            }else { //Si no obtenemos respuesta, mandamos mensaje de error
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo debe haber salido mal!',
                footer: '<a href="">Why do I have this issue?</a>'
              })
              
              
            }
          })
        })
      })
    })
    

  }
  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.opcionSeleccionado;
    
}

}
