import { Component } from '@angular/core';
import { BrandService } from '../../category/list/Brandservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ExemplaryService } from '../services/exemplary.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styles: [
  ]
})
export class DeleteComponent {
  
  name_exemplary!:string; //Nombre del modelo
  name_brand!:string //Nombre de la marca


  //Implementamos el servicio de marca, activatedRouter para recoger los parámetros, y el servicio de modelos, y router
  constructor( private route:ActivatedRoute, private exemplaryService:ExemplaryService,private router:Router){

  }
  ngOnInit(){
    this.name_exemplary=this.route.snapshot.params["id"] //Recoge el identificador del modelo
    this.getExemplary() //Busca el modelo
    
    
    

  }

  //Método el cual busca el modelo mediante el identificador
  getExemplary(){
    this.exemplaryService.getExemplaryById(this.name_exemplary).subscribe({
      next:(resp=>{
        this.name_brand=resp.name_brand.name_brand //Le asigna el nombre de la marca a la variable para mostrarlo
      })
    })

    
   
  }

  //Método para eliminar un modelo
  deleteBrand(){
    return this.exemplaryService.deleteExemplary(this.name_exemplary).subscribe({ //Realiza la peticion para eliminar una marca llamando al servicio
      next:(resp=>{
        if(resp){ //Si obtiene una respuesta manda mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: 'El modelo ha sido eliminado con éxito!',
            text: 'Estas de vuelta en el listado!',
        });
        this.router.navigate(['/exemplary/listExemplary']) // Redirige al listado de modelo
          
        }else { //Si no obtiene respuesta, manda mensaje de error.
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo debe haber salido mal!',
          })
          
          
        }
      })
    })
  }
}
