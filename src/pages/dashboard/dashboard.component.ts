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
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  
icon_flip:boolean=true;
bSeleccionFuente:boolean=false;
oFuente:any;
iIndexBolas:number=0;
titulo="";
categoria="";
  constructor(
    private ServicesProvider: ServicesProvider,
private http: HttpClient
) {





  }


  ngOnInit() {

  }

  fn_getFuente(item:any){
    this.bSeleccionFuente=true;
    console.log(item);
    this.oFuente=item;
    this.fn_getCamposFuente(item.fichero);
  }

  fn_setBolas(index:any){
    this.iIndexBolas=index;
  }


  fn_getCamposFuente(ruta:any){

      this.ServicesProvider.preloaderOn();
      this.http.get(ruta)
      .subscribe(response => {
        this.ServicesProvider.preloaderOff();
        this.oFuente.campos=response;
      })
/*
      this.ServicesProvider.get(ruta, {}).then(data=>{
        this.oFuente.campos=data;
         this.ServicesProvider.preloaderOff();
        }, _fail => {
           this.ServicesProvider.preloaderOff();
              //this.ServicesProvider.alertaOn("Éxito", "Se acaba de eliminar un detalle de avance");
            this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema al obtener el entregable",null);
        });  */    
  }




}
