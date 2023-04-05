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

  addImageForm: FormGroup = this.fb.group({
    files:['',[Validators.required]],
    fileSource:['',[Validators.required]] //Archivo el cual añadiremos en la peticion
  })

  constructor(private route: ActivatedRoute, private service: CarsService,private fb:FormBuilder
    , private imageService:ImagesService){

  }

  ngOnInit(){
    const id=this.route.snapshot.params["id"]
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
        alert("No se ha podido obtener el coche")
      }
    })


  }

  addImages(){
   
    this.imageService.addImages(this.addImageForm.get('fileSource')?.value, this.json ).subscribe({
      next:(resp)=>{
        window.location.reload();
      },error:(e)=>{
        alert("No se ha podido subir la imagen");
      }
    })
  }

  onFileChangeImage(event:any) {
   
    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addImageForm.patchValue({
        fileSource: file
      });
    }
  }

  deleteImage(id:number){

    Swal.fire({
      title: '¿Seguro que quieres borrar la foto?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.imageService.deleteImages(id).subscribe({
          next:(resp)=>{
            window.location.reload();
          },error:(e)=>{
            alert("No se ha podido subir la imagen");
          }
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
    
    
  }

}
