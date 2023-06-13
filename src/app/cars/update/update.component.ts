import { Component, OnInit, HostListener } from '@angular/core';
import { exemplary } from '../../interfaces/exemplary.interface';
import { CarsService } from '../cars.service';
import { ExemplaryService } from '../../exemplary/services/exemplary.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cars } from '../../interfaces/cars.interface copy';
import Swal from 'sweetalert2';
import { ImagesService } from '../images.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  dateDay = new Date().getFullYear();  // Año actual
  car!:cars //Coche el cual vamos a updatear
  exemplaries:exemplary[]= [] // Lista de modelos las cuales vamos a mostrar
  opcionSeleccionado: string  = '0'; // Opcion seleccionada en el desplegable por defecto
  verSeleccion: string        = ''; // Seleccion escogida (Valor)
  file!: File | null;

  mimeTypesAllowed: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg', 'image/webp'];

//Json utilizado para actualizar un coche
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

  //Implementamos el servicio de modelos, el router, el servicio de coches, formbuilder para la validacion
  // y el activatedRouter para recoger los parametros
  constructor(private exemplaryService:ExemplaryService, private router:Router, 
    private carService:CarsService,private fb:FormBuilder,private route:ActivatedRoute, private imageService:ImagesService) { }

    ngOnInit(): void {
      const id =this.route.snapshot.params["id"] //Recogemos el identificador del coche
      this.carService.getCarsbyId(id).subscribe({ //Buscamos el coche mediante su identificador
        next:(resp)=>{
          this.car=resp //Asignamos el coche a la variable
          this.json.num_bastidor=resp.num_bastidor
          this.json.year=resp.year
          this.json.color=resp.color
          this.json.hp=resp.hp
          this.json.cubic_cent=resp.cubic_cent
          this.json.sold=resp.sold
          this.json.price=resp.price
          this.json.name_exemplary=resp.name_exemplary
          
          
          

        },error:(e)=>{ //Si hay algun error, lanzamos un mensaje de error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se ha podido obtener la marca!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
        }
      })
      this.getExemplaries() // Llamamos al método el cual obtiene todos los modelos
     
    }

      //Formulario reactivo con sus respectivos campos y validaciones para cada uno de ellos
  addCarForm: FormGroup = this.fb.group({
  
    year:['',[Validators.required, Validators.min(1970), Validators.max(this.dateDay)]], //Fecha mayor que 1970 y menor que la actual
    hp:['',[Validators.required,Validators.min(50), Validators.max(1000)]],
    color:['',[Validators.required,Validators.minLength(3)]],
    cubic_cent:['',[Validators.required, Validators.min(1000), Validators.max(9000)]],
    name_exemplary:['',[Validators.required]],
    sold:['false',[Validators.required]],
    price:['',[Validators.required, Validators.min(1), Validators.max(5000000)]],
  
  })

  addImageForm: FormGroup = this.fb.group({
    files:['',[Validators.required]],
    fileSource:['',[Validators.required]] //Archivo el cual añadiremos en la peticion
  })

 


//Validacion de campo
  isValidField(field:string){
    return this.addCarForm?.controls[field].errors //Comprobamos si tiene errores, si es inválido y si está modificado
    && this.addCarForm?.controls[field].invalid && this.addCarForm.controls[field].touched
  }
  //Método el cual llama al servicio para cargar todos sus modelos
  getExemplaries(){
    this.exemplaryService.getExemplaries().subscribe({
      next:(resp)=>{
        this.exemplaries=resp // Asigna las respuestas a la lista de modelos
      },error:(e)=>{ //Si hay algun error, lanzamos mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error al obtener los modelos!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    })
  }

 

  
//Método para añadir las imágenes
  addImages(){
   
    this.imageService.addImages(this.addImageForm.get('fileSource')?.value, this.json ).subscribe({ // Si la petición es correcta recargamos la página para ver el resultado
      next:(resp)=>{
        window.location.reload(); // Si la petición es correcta recargamos la página para ver el resultado
      },error:(e)=>{// Si hay algún error, lanzamos mensaje
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error al subir la imagen!',
          footer: 'Selecciona una imagen de tipo: jpg, jpeg o png'
        })
      }
    })
  }
//Método para eliminar una imágen
  deleteImage(id:number){//Recogemos el id de la imagen

    Swal.fire({
      title: '¿Seguro que quieres borrar la foto?',
      showDenyButton: true,
      confirmButtonText: 'Borrar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.imageService.deleteImages(id).subscribe({ //Si confirma eliminamos la imagen
          next:(resp)=>{
            window.location.reload(); //Recargamos para ver el resultado
          },error:(e)=>{ //Si hay error, lanzamos el mensaje
            alert("No se ha podido subir la imagen");
          }
        })
      } else if (result.isDenied) { //Si cancela informamos al usuario
        Swal.fire('Cambios cancelados', '', 'info')
      }
    })
    
    
  }


//Metodo para actualizar el coche
  updateCar(){
    //Asignamos los valores del formulario al json creado
    this.json.num_bastidor=this.car.num_bastidor
  this.json.year=this.addCarForm.get('year')?.value
  this.json.color=this.addCarForm.get('color')?.value
  this.json.hp=this.addCarForm.get('hp')?.value
  this.json.cubic_cent=this.addCarForm.get('cubic_cent')?.value
  this.json.sold=this.addCarForm.get('sold')?.value
  this.json.price=this.addCarForm.get('price')?.value

  

  this.exemplaryService.getExemplaryById(this.addCarForm.get('name_exemplary')?.value).subscribe({ //Buscamos el modelo por id recogido del formulario
    next:(resp)=>{
      this.json.name_exemplary=resp
      
      this.carService.updateCars(this.addCarForm.get('fileSource')?.value, this.json,this.car.num_bastidor).subscribe({ //Realizamos la peticion y le pasamos el json y el fileSource
        next:(resp)=>{
          
         window.location.reload() //Actualizamos la página para ver los cambios
         this.addCarForm.reset() //Reseteamos los valores del formulario
        },error:(e)=>{ //Si captamos algun error, lanzamos mensaje de error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al actualizar!',
          })
        }
      })
    },error:(e)=>{ //Si captamos algun error, lanzamos mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error al obtener el coche!',
      })
    }
  })

  }


  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.opcionSeleccionado;
    
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
  onFileChangeImage(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addImageForm.patchValue({
        fileSource: file
      });
    }
  }

  onFileChangeImagess(event:any) {

    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      if(this.file!.size > 1048576) {
        Swal.fire({
          icon: 'error',
          title: 'Wow, an error has occurred',
          text: 'Images larger than 1 mb are not allowed'
        })
        // this.file=null

  }else if(!this.mimeTypesAllowed.includes(this.file?.type!)) {
    Swal.fire({
      icon: 'error',
      title: 'Wow, an error has occurred',
      text: 'The mimetype are not allowed'
    })
    // this.file = null;
  }else {
    this.addImageForm.patchValue({
      fileSource: this.file
    })

  } 

 }
}

  

}
