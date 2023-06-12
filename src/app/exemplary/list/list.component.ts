import { Component } from '@angular/core';
import { exemplary } from '../../interfaces/exemplary.interface';
import { ActivatedRoute } from '@angular/router';
import { ExemplaryService } from '../services/exemplary.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  listExemplary:exemplary[]=[] // Listado de modelos
  role:string | null=localStorage.getItem("role")  //Obtenemos el rol para alternar la vista
  //Implementamos ActivatedRouter y el servicio del modelo
  constructor(private route:ActivatedRoute,private service:ExemplaryService ){

  }

  ngOnInit(){
     this.service.getExemplaries().subscribe({ //Obtenemos todos los modelos y le asignamos la lista a las variables
      next:(resp=>{
      this.listExemplary=resp
    
      })
     })

  }
}
