import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarsService } from '../cars.service';
import { cars } from '../../interfaces/cars.interface copy';
import Swal from 'sweetalert2';
import { ImagesService } from '../images.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  car!:cars //Coche el cual vamos a obtener
 sold!:boolean; // Propiedad del coche la cual vamos a mapear

 //Implementamos el router, el servicio de coches, y el activatedRouter para recoger los parámetros
  constructor( private router:Router, 
    private carService:CarsService,private route:ActivatedRoute,private imageService:ImagesService) { }

  ngOnInit(): void {
    const id =this.route.snapshot.params["id"] //Recogemos el id del coche
    this.carService.getCarsbyId(id).subscribe({ //Buscamos ese coche mediante su id
      next:(resp)=>{
        this.car=resp //Asignamos el coche a la variable
        this.sold=resp.sold // Asignamos la propiedad del coche a la variable la cual vamos a mapear
     

      },error:(e)=>{ // Si capta algun error, lanzamos el mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se ha podido obtener el coche!',
        })
      }
    })
  }
  deleteImage(id:number){

    Swal.fire({
      title: '¿Seguro que quieres borrar la foto?',
      showDenyButton: true,
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
        Swal.fire('Cambios cancelados', '', 'info')
      }
    })
    
    
  }

  //Metodo para eliminar el coche
  deleteCar(){
    this.carService.deleteCars(this.car.num_bastidor).subscribe({ //Realizamos la peticion llamando al servicio y le pasamos el numero de bastidor del coche a eliminar
      next:(resp)=>{
        Swal.fire({ //Si no da error, mensaje de éxito
          icon: 'success',
          title: 'El coche ha sido eliminado con éxito!',
          text: 'Estas de vuelta en el listado!',
      });
      this.router.navigate(['/cars/listCar']) //Redirigimos al listado de coches
      },error:(e)=>{ //Si encontramos algun error, lanzamos el mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error al eliminar el coche!',
          
        })
      }
    })
  }

}
