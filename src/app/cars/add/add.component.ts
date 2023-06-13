import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarsService } from '../cars.service';
import { brand } from 'src/app/interfaces/brand.interface';
import { ExemplaryService } from '../../exemplary/services/exemplary.service';
import { exemplary } from '../../interfaces/exemplary.interface';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  
 dateDay = new Date().getFullYear(); // Año actual
  exemplaries:exemplary[]= [] // Lista de modelos las cuales vamos a mostrar
  opcionSeleccionado: string  = '0'; // Opcion seleccionada en el desplegable por defecto
  verSeleccion: string        = ''; // Seleccion escogida (Valor)
  file!: File | null;

  mimeTypesAllowed: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg', 'image/webp'];

  //Implementamos Servicio de modelos, router, servicio de coches, formbuilder para la validacion
  constructor(private exemplaryService:ExemplaryService, private router:Router, 
    private carService:CarsService,private fb:FormBuilder) { }


    //Json utilizado para añadir un coche
  json: any = {
    num_bastidor:'',
    year: '',
    hp: '',
    color:'',
    cubic_cent:'',
    name_exemplary:'',
    sold:'',
    price:'',

  };


  //Formulario reactivo con sus respectivos campos y validaciones para cada uno de ellos
  addCarForm: FormGroup = this.fb.group({
    num_bastidor:['',[Validators.required, Validators.minLength(11),Validators.maxLength(12)]],
    year:['',[Validators.required, Validators.min(1970), Validators.max(this.dateDay)]], //Fecha mayor que 1970 y menor que la actual
    hp:['',[Validators.required,Validators.min(50), Validators.max(1000)]],
    color:['',[Validators.required,Validators.minLength(3)]],
    cubic_cent:['',[Validators.required, Validators.min(1000), Validators.max(9000)]],
    name_exemplary:['',[Validators.required]],
    sold:['false',[Validators.required]],
    file:['',[Validators.required]],
    price:['',[Validators.required, Validators.min(1), Validators.max(5000000)]],
    fileSource:['',[Validators.required]] //Archivo el cual añadiremos en la peticion
    






    
  })

  //Validacion de campo
  isValidField(field:string){
    return this.addCarForm?.controls[field].errors //Comprobamos si tiene errores, si es inválido y si está modificado
    && this.addCarForm?.controls[field].invalid && this.addCarForm.controls[field].touched
  }


  ngOnInit(): void {
    this.getExemplaries() // Llamamos al método el cual cargará todos nuestros modelos
   
  }


  //Método el cual llama al servicio para cargar todos sus modelos
  getExemplaries(){
    this.exemplaryService.getExemplaries().subscribe({
      next:(resp)=>{
        this.exemplaries=resp // Asigna las respuestas a la lista de modelos
      }
    })
  }

//Metodo para cuando cambie el valor del desplegable que se actualice
  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.opcionSeleccionado;
    
}

//Método el cual añadirá nuestro coche, llamando al servicio
addCar(){
  //Asignamos los valores del formulario al json creado
  this.json.num_bastidor=this.addCarForm.get('num_bastidor')?.value
  this.json.year=this.addCarForm.get('year')?.value
  this.json.color=this.addCarForm.get('color')?.value
  this.json.hp=this.addCarForm.get('hp')?.value
  this.json.cubic_cent=this.addCarForm.get('cubic_cent')?.value
  this.json.sold=this.addCarForm.get('sold')?.value
  this.json.price=this.addCarForm.get('price')?.value

 

  this.exemplaryService.getExemplaryById(this.addCarForm.get('name_exemplary')?.value).subscribe({ //Buscamos el modelo por id recogido del formulario
    next:(resp)=>{ //Si obtenemos respuesta
      this.json.name_exemplary=resp //Le asigamos la respuesta al json
      this.carService.addCars(this.addCarForm.get('fileSource')?.value, this.json).subscribe({ //Realizamos la peticion y le pasamos el json y el fileSource
        next:(resp)=>{ //Si no posee errores, lanzamos mensaje 
          Swal.fire({
            icon: 'success',
            title: 'El coche ha sido añadido con éxito!',
            text: 'Estas de vuelta en el listado!',
        });
         this.router.navigate(['/cars/listCar']) //Redirigimos al listado
        },error:(e)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al añadir el coche!',
            
          })
        }
      })
    },error:(e)=>{ //Si capta errores, lanzamos el mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error al obtener el coche!',
       
      })
    }
  })
 

}

onFileChange(event:any) {
   
    
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.addCarForm.patchValue({
      fileSource: file
    });
  }
}

//Método por si cambiamos la imagen
onFileChangeImages(event:any) {

  if (event.target.files.length > 0) {
    this.file = event.target.files[0];
    if(this.file!.size > 1048576) {
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text: 'No soporta imágenes de más de 1mb'
      })
      // this.file=null

}else if(!this.mimeTypesAllowed.includes(this.file?.type!)) {
  Swal.fire({
    icon: 'error',
    title: 'Ha ocurrido un error',
    text: 'El tipo elegido no es soportado'
  })
  // this.file = null;
}else {
  this.addCarForm.patchValue({
    fileSource: this.file
  })

} 

}
}



}
