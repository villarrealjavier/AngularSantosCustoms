
import { model } from './model.interface';
import { images } from './images.interfaces';
export interface cars { //Interfaz de coches
    num_bastidor:string
    year:number
    hp:number
    color:string
    cubic_cent:number
    name_exemplary:model
    sold:boolean
    price:number
    listImages: images[]
}