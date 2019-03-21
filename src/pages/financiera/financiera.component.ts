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
  constructor(
    private ServicesProvider: ServicesProvider,
private http: HttpClient
) {





  }


  ngOnInit() {

    var formatoPesos=d3.format(",.0f");
    var aColors=['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5'];
    var aAnios=[2014,2015,2016,2017,2018];
    var barchart = c3.generate({
        bindto:"#bar_chart",
        data: {
            size:{
                height:500,
                width: 500
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
