import { Component } from '@angular/core';
import { cars } from '../../interfaces/cars.interface copy';
import { ActivatedRoute } from '@angular/router';
import { CarsService } from '../cars.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagesService } from '../images.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-one-car',
  templateUrl: './one-car.component.html',
  styles: [
  ]
})
export class OneCarComponent {
  car!:cars

  //Json que usaremos para las peticiones
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

  //Formulario de imágenes, desde el que controlaremos las restricciones que apliquemos
  addImageForm: FormGroup = this.fb.group({
    files:['',[Validators.required]],
    fileSource:['',[Validators.required]] //Archivo el cual añadiremos en la peticion
  })

  //Implementamos el activatedRoute, el formbuilder para los formularios, el imageService para las peticiones relacionadas 
  //con las imágenes y el Servicio de coches para las peticiones relacionadas con los coches
  constructor(private route: ActivatedRoute, private service: CarsService,private fb:FormBuilder
    , private imageService:ImagesService){

  }

  ngOnInit(){
    const id=this.route.snapshot.params["id"] //Recogemos el id del coche
    this.service.getCarsbyId(id).subscribe({
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
      },error:(e)=>{
        Swal.fire({  // Si hay error mostramos mensaje de error
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error al recuperar el vehículo!',
          footer: 'Vuelve a la página de inicio!'
        })
      }
    })


  }

  //Método para añadir las imágenes
  addImages(){
    this.imageService.addImages(this.addImageForm.get('fileSource')?.value, this.json ).subscribe({
      next:(resp)=>{
        window.location.reload(); // Si la petición es correcta recargamos la página para ver el resultado
      },error:(e)=>{ // Si hay algún error, lanzamos mensaje
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error al subir la imagen!',
          footer: 'Selecciona una imagen de tipo: jpg, jpeg o png'
        })
      
      }
    })
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

  //Método para eliminar una imágen
  deleteImage(id:number){ //Recogemos el id de la imagen
    Swal.fire({
      title: '¿Seguro que quieres borrar la foto?',
      showDenyButton: true,
      confirmButtonText: 'Borrar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.imageService.deleteImages(id).subscribe({ //Si confirma, eliminamos la imagen
          next:(resp)=>{
            window.location.reload(); //Recargamos para ver el resultado
          },error:(e)=>{  // Si hay algún error, lanzamos mensaje
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ha ocurrido un error al eliminar la imagen!',
              footer: 'Intentalo de nuevo!'
            })
          }
        })
      } else if (result.isDenied) { //Si cancela, informamos al usuario
        Swal.fire('Cambios Cancelados', '', 'info')
      }
    })
    
    
  }

}
