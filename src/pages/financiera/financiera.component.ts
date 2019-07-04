import { Component,OnInit,Input } from '@angular/core';
//viewChild
import { ServicesProvider } from '../../providers/services';
//import  { FormControl, Validators,FormGroup } from '@angular/forms';
import  {SERVICES } from '../../config/webservices';
import { VARIABLES } from '../../config/variables';
import { HttpClient } from '@angular/common/http'; 
import * as c3 from 'c3';
import * as d3 from 'd3';

//import Neo4jd3 from 'Neo4jd3';

@Component({
  selector: 'financiera',
  templateUrl: './financiera.component.html',
  styleUrls: ['./financiera.component.scss']
})
export class FinancieraComponent implements OnInit {
bMostraMapa=true; //muestra botones el mapa
sidebar_right=false;
bFlecha_animacion=true; //true es la animación de la izquierda
archivo_adjunto:any;
seleccionMenu:any;
titulo_proceso:any;
  constructor(
    private ServicesProvider: ServicesProvider,
private http: HttpClient
) {





  }


  ngOnInit() {
    console.log(this.seleccionMenu,this.titulo_proceso);
    this.archivo_adjunto=this.seleccionMenu;
    this.seleccionMenu=
      {
        "bFlecha_animacion":true,
        "fuente":"Indicadores",
        "fuente_hijos": 
          [

          ]
      }
    var formatoPesos=d3.format(",.0f");
    var aColors=['#68C04D', '#002E00', '#009644', '#399422', '#097400', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5'];
    var aAnios=[2014,2015,2016,2017,2018];
    var barchart = c3.generate({
        bindto:"#bar_chart",
        data: {
            size:{
                height:320,
                width: 320
            },
            columns: [
                ['Ingresos Operacionales', 42951108, 45600446, 51502249, 59528814, 63476014],
                ['Ingresos No Operacionales', 953688, 1726760, 2244379, 1963922, 2396226]
            ],
            type: 'bar'
        },
        color: {
          pattern: aColors
        },

         title: {
          show: false,
          text: 'Evolución de los ingresos por los años 2014 a 2018',
          position: 'top-center'   // top-left, top-center and top-right
        },

        axis: {
            x: {
                type: 'category',
                categories: aAnios
            },
            y : {
                tick: {
                    format: d3.format("$,")
    //                format: function (d) { return "$" + d; }
                }
            }            
        },
        bar: {
            width: {
                ratio: 0.5 // this makes bar width 50% of length between ticks
            }
            // or
            //width: 100 // this makes bar width 100px
        },
         tooltip: {
              format: {
                  value: function (d,i,k,l) { 
                      return formatoPesos(d);
                  },
                  title: function (d) {  return  aAnios[d]; }
                  // etc ...
              }
          }


        });


    var chart = c3.generate({
        bindto:"#chart_puntos",
        data: {
            columns: [
                ['Activo Corriente', 25540980, 31716054, 24611211, 18227453, 12009262],
                ['Pasivo Corriente', 5195788, 6947133, 9144517, 11927610, 9096654],
                ['Neto Corriente', 20345192, 24768921, 15466694, 6299843, 2912608]

            ]
        },
        color: {
          pattern: aColors
        },        
        title: {
          show: false,
          text: 'Evolución del capital de Trabajo',
          position: 'top-center'   // top-left, top-center and top-right
        },

        axis: {
            x: {
                type: 'category',
                categories: aAnios
            },
            y : {
                tick: {
                    format: d3.format("$,")
    //                format: function (d) { return "$" + d; }
                }
            }       
        },

         tooltip: {
              format: {
                  value: function (d) { 
                      return formatoPesos(d);
                  },
                  title: function (d) {  return  aAnios[d]; }
                  // etc ...
              }
          }


    });


  var pie = c3.generate({
      bindto:"#pie",
      title: {
        show: false,
        text: 'Recursos Invertidos al ciere del proyecto TEM',
        position: 'top-center'   // top-left, top-center and top-right
      },

      data: {
          // iris data from R
          columns: [
              ['Materiales', 20413394],
              ['M.O', 7552608],
              ['Cost. Indirecto', 7552608],
              ['Preoperativos', 1519420],
              ['Inventarios', 7552608],
              ['Equipos',1951376]

          ],
          type : 'pie',

      },
      color: {
        pattern: aColors
      },
      tooltip: {
          format: {
              value: function (d,i,k,l) { 
                  return formatoPesos(d);
              }
              // etc ...
          }
      }
  });




  }

/*
 loadPdf(source){
    console.log("entra")
    const xhr = new XMLHttpRequest();
    xhr.open('GET', source, true);
    xhr.responseType = 'blob';
    xhr.onload = (e: any) => {
      if (xhr.status === 200) {
        const blob = new Blob([xhr.response], {type: 'application/pdf'});
        this.archivo_adjunto = URL.createObjectURL(blob);
        console.log(xhr);

      }
    };
    xhr.send();
  }*/

  fn_setAdjuntoActual(anexo, tipo_adjunto){
    this.seleccionMenu["anexo_carga_mostrar"]=anexo;
    if(tipo_adjunto=="hijo"){
      this.seleccionMenu.nieto_seleccionado=null;
    }
  }


  fn_setRigthOption(item,tipo){
    console.log(item);
    /*{
    "hijo_nombre":"GFI-FOR-003.   Devoluciones",
    "anexo":"./assets/data/4.5.   FORMATOS/GFI-FOR-003.   Devoluciones.pdf",
    "nietos":[]
    }*/
    if(tipo=="formatos"){
      this.seleccionMenu["seleccion_formato"]=true;
      this.seleccionMenu["seleccion_instructivo"]=false;

    }
    else{
      this.seleccionMenu["seleccion_instructivo"]=true;
      this.seleccionMenu["seleccion_formato"]=false;
    }
    this.seleccionMenu["anexo_carga_mostrar"]=item.anexo;
    this.seleccionMenu["nieto_seleccionado"]=
    {
      "nieto_seleccionado_nombre":item.hijo_nombre,
      "nieto_seleccionado_anexo":item.anexo
    }

  }

/*
  pageRendered(e: CustomEvent) {
    setTimeout(()=>{
      this.ServicesProvider.preloaderOff();
    },500);*/



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
