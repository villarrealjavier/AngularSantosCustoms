import { cars } from "./cars.interface copy"

export interface Renting { //Interfaz de marca
    id:number,
    num_bastidor:cars
    total_import:number,
    cuota_mes:number,
    date_start:Date,
    date_end:Date,
}