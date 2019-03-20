import { Component,OnInit,Input } from '@angular/core';
//viewChild
import { ServicesProvider } from '../../providers/services';
//import  { FormControl, Validators,FormGroup } from '@angular/forms';
import  {SERVICES } from '../../config/webservices';
import { VARIABLES } from '../../config/variables';
import { HttpClient } from '@angular/common/http'; 
import * as d3 from 'd3';
//import Neo4jd3 from 'Neo4jd3';

@Component({
  selector: 'financiera',
  templateUrl: './financiera.component.html',
  styleUrls: ['./financiera.component.scss']
})
export class FinancieraComponent implements OnInit {
bMostraMapa=true; //muestra botones el mapa
  constructor(
    private ServicesProvider: ServicesProvider,
private http: HttpClient
) {





  }


  ngOnInit() {

  }

  /*fn_getFuente(item:any){
    this.bSeleccionFuente=true;
    console.log(item);
    this.oFuente=item;
    this.fn_getCamposFuente(item.fichero);
  }*/


  /*fn_getProceso(item:any){
    console.log(item);
  }*/



  /*fn_getCamposFuente(ruta:any){

 

      this.ServicesProvider.get(ruta, {}).then(data=>{
        this.oFuente.campos=data;
         this.ServicesProvider.preloaderOff();
        }, _fail => {
           this.ServicesProvider.preloaderOff();
              //this.ServicesProvider.alertaOn("Éxito", "Se acaba de eliminar un detalle de avance");
            this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema al obtener el entregable",null);
        });   
  }*/




}
