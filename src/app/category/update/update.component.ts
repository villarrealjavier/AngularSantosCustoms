import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../list/Brandservices.service';
import { brand } from '../../interfaces/brand.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  //Implementamos Formbuilder para formulario reactivo, router, servicio de marca y activatedRouter para recoger los parámetros
  constructor(private fb: FormBuilder, private router:Router, private service:BrandService, private route: ActivatedRoute) { }
  myForm: FormGroup = this.fb.group({
    name_brand:['',[Validators.required, Validators.minLength(3)]],
    country:['',[Validators.required, Validators.minLength(3)]],
  })
  id!:string; //Id de la marca
  

  

 
  ngOnInit(): void {
    this.myForm.controls['name_brand'].setValue(this.route.snapshot.params["id"]) //Recogemos el id y se lo asignamos como valor al formulario
    
  }

   //Validacion para los campos
  isValidField(field:string){
    return this.myForm?.controls[field].errors //Se comprueba si tiene errores, si es inválido y si han sido modificados
    && this.myForm?.controls[field].invalid && this.myForm.controls[field].touched
  }

  //Método para actualizar una marca
  updateBrand(){
    
    this.service.updateBrand(this.myForm.controls['name_brand'].value,this.myForm.controls['country'].value).subscribe({ //Realizamos la peticion llamando al servidor
      next: (resp) => {
       
          
          if(resp){ //Si obtenemos una respuesta mandamos mensaje de éxito
          
            Swal.fire({
              icon: 'success',
              title: 'La marca ha sido editada con éxito!',
              text: 'Estas de vuelta en el listado!',
          });
          this.router.navigate(['/category/listCategory']) //Redirigimos a la lista de marcas

        }else { //Si por el contrario no obtenemos respuesta, mandamos mensaje de error
          Swal.fire({
            icon: 'error',
            title: 'Algo falló, revise los campos!',
            text: 'Algo ha fallado al actualizar!',
           
          })
          
          
        }}})
     }

  }


