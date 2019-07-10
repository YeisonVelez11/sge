import { Component,OnInit,Input } from '@angular/core';
//viewChild
import { ServicesProvider } from '../../providers/services';
//import  { FormControl, Validators,FormGroup } from '@angular/forms';
import  {SERVICES } from '../../config/webservices';
import { VARIABLES } from '../../config/variables';
import { HttpClient } from '@angular/common/http'; 
import * as c3 from 'c3';
import * as d3 from 'd3';
import { style } from '@angular/animations';

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
titulo_proceso:any;  //tiene el titulo y también los indicadores
aJsonFuentes=VARIABLES.oFuentes;

indicador:any=null;
  constructor(
    private ServicesProvider: ServicesProvider,
private http: HttpClient
) {





  }


  ngOnInit() {
    this.archivo_adjunto=this.seleccionMenu;
    this.seleccionMenu=
      {
        "bFlecha_animacion":true,
        "fuente":"Indicadores",
        "fuente_hijos": 
          [

          ]
      }

/*
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
*/



  }

  /*fn_pintarLinea(){
    let barra=d3.select(".c3-shape.c3-shape-0.c3-bar.c3-bar-0");
    let CoordenadasBarra=d3.select(barra).node().getBBox();
    let linea=d3.selectAll(".c3-ygrid-line")[0];
    console.log(linea);
    console.log(CoordenadasBarra);
    d3.select(barra).style.transform="translate("+CoordenadasBarra.x+"px,"+"0px"+")";
  }*/



  fn_generarGrafica(){

    var formatoPesos=d3.format(",.0f");
    var aColors=['#68C04D', '#002E00', '#009644', '#399422', '#097400', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5'];
    var columns=[];

    var ultimoCaracter=this.indicador.nombre_indicador[this.indicador.nombre_indicador.length-1];   
    if(ultimoCaracter=="$"){
      let str= this.indicador.nombre_indicador;
      this.indicador.nombre_indicador = str.substring(0, str.length - 1);
      var formato="$"; //define como se muestran los valores, si en cantidad o en pesos
    }
    else{
      formato="";
    }


    if(this.indicador.aMedicionUnica.length!=0){
      var ultimoCaracter=this.indicador.aMedicionUnica[0][this.indicador.aMedicionUnica[0].length-1];   
      if(ultimoCaracter=="$"){
        //se quita el ultimo caracter
        this.indicador.aMedicionUnica[0] = this.indicador.aMedicionUnica[0].substring(0, this.indicador.aMedicionUnica[0].length - 1);
      }


      columns=[this.indicador.aMedicionUnica];
      var maxValueForValues=this.indicador.metas;

      var grid:any=
      {
        y: {
            lines: [
                
            ]
        }
     }
     for(var i in maxValueForValues){
      grid.y.lines.push(
        {
          value: maxValueForValues[i], text: 'Label'+ maxValueForValues[i], position: 'middle',class:"ocultar_linea"
        }
      ) 
     }





    }
    else{
      var auxColumn=[];
      for(var i in this.indicador.aMediciones){
          auxColumn.push(this.indicador.aMediciones[i].valores);
      }
      var maxValueForValues=undefined;

      var grid:any=false;

      columns=auxColumn;
      auxColumn=null;
    }
    var aAnios=this.titulo_proceso.anios;
    console.log(aAnios);
    console.log(columns);
    console.log(maxValueForValues);


    var barchart = c3.generate({
        bindto:"#bar_chart",
        data: {
            /*size:{
                height:320,
                width: 320
            },*/
            columns: columns,
            type: 'bar',
            labels: {
              format: function (v, id, i, j) { 
                if(maxValueForValues){
                  return (100*v/maxValueForValues[i]).toFixed(2)+"%";
                }
                return '';
              
              },

             }
        },
        grid: grid,

        color: {
          pattern: aColors
        },

         title: {
          show: false,
          text: this.indicador.nombre_indicador,
          position: 'top-center'   // top-left, top-center and top-right
        },

        axis: {
            x: {
                type: 'category',
                categories: aAnios
            },
            y : {
                tick: {
                  //"$,"
                    format: d3.format(formato+",")
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
                      return formatoPesos(d)+" "+formato;
                  },
                  title: function (d) {  return  aAnios[d]; }
                  // etc ...
              }
          },


          onrendered: function () { 
            setTimeout(()=>{

              d3.selectAll(".lineaMeta").remove();
              d3.selectAll(".texto_meta").remove();

              d3.selectAll(".c3-texts .c3-text")
              .style("fill",function(){
                let valor=d3.select(this).text();
                valor=parseFloat(valor.split("$")[0]);
                if(valor<=33.3){
                  var color:any="#e60808";
                }
                else if(valor<=99.9 && valor>=33.3){
                  var color:any="#d4d400";
                }
                else{
                  var color:any="#40bf16";
                }
                console.log(color);
                return color;
              })
              .style("font-weight","bold");

              let barra=d3.selectAll(".c3-shape.c3-bar");

              barra.each(function(d,i) { 
                let aLineas=d3.selectAll(".c3-ygrid-line line");


                //console.log(d3.selectAll(".c3-ygrid-line line")[i]);
                let lineaActual=d3.select(aLineas._groups[0][i]).node().getBBox();
                let CoordenadasBarra=d3.select(this).node().getBBox();

                d3.select(this.parentNode).append("text")
                .attr("class","texto_meta")
                .style("font-weight","bold")
                .style("fill", "#aaa")
                .style("opacity","0")
                .attr("x",CoordenadasBarra.x-12  )
                .attr("y",lineaActual.y+3)
                .text(maxValueForValues[i])

                console.log("barra",CoordenadasBarra)
                d3.select(this.parentNode).append("line")
                .attr("x1",0)
                .attr("x2",CoordenadasBarra.width)
                .attr("y1",lineaActual.y)
                .attr("y2",lineaActual.y)
                .attr("class","lineaMeta")
                .style("transform","translate("+CoordenadasBarra.x+"px,"+"0px"+")")
                .style("fill","none")
                .style("stroke-width","1")
                .style("pointer-events","all")
                .style("stroke-dasharray","4 5")
                .style("stroke","#00000")
                .on('mouseover',function(){
                  console.log("hover")
                  d3.select(this).transition()
                  .ease(d3.easeLinear)
                  .style("stroke-width","2");
                })
                .on('mouseout',function(){
                  console.log("hover")
                  d3.select(this).transition()
                  .ease(d3.easeLinear)
                  .style("stroke-width","1");
                })

              });



            })

           },
           onresized:function(){


            setTimeout(()=>{

              d3.selectAll(".lineaMeta").remove();
              d3.selectAll(".texto_meta").remove();

              d3.selectAll(".c3-texts .c3-text")
              .style("fill",function(){
                let valor=d3.select(this).text();
                valor=parseFloat(valor.split("$")[0]);
                if(valor<=33.3){
                  var color:any="#e60808";
                }
                else if(valor<=99.9 && valor>=33.3){
                  var color:any="#d4d400";
                }
                else{
                  var color:any="#40bf16";
                }
                console.log(color);
                return color;
              })
              .style("font-weight","bold");

              let barra=d3.selectAll(".c3-shape.c3-bar");

              barra.each(function(d,i) { 
                let aLineas=d3.selectAll(".c3-ygrid-line line");


                //console.log(d3.selectAll(".c3-ygrid-line line")[i]);
                let lineaActual=d3.select(aLineas._groups[0][i]).node().getBBox();
                let CoordenadasBarra=d3.select(this).node().getBBox();

                d3.select(this.parentNode).append("text")
                .attr("class","texto_meta")
                .style("font-weight","bold")
                .style("fill", "#aaa")
                .style("opacity","0")
                .attr("x",CoordenadasBarra.x-12  )
                .attr("y",lineaActual.y+3)
                .text(maxValueForValues[i])

                console.log("barra",CoordenadasBarra)
                d3.select(this.parentNode).append("line")
                .attr("x1",0)
                .attr("x2",CoordenadasBarra.width)
                .attr("y1",lineaActual.y)
                .attr("y2",lineaActual.y)
                .attr("class","lineaMeta")
                .style("transform","translate("+CoordenadasBarra.x+"px,"+"0px"+")")
                .style("fill","none")
                .style("stroke-width","1")
                .style("pointer-events","all")
                .style("stroke-dasharray","4 5")
                .style("stroke","#00000")
                .on('mouseover',function(){
                  console.log("hover")
                  d3.select(this).transition()
                  .ease(d3.easeLinear)
                  .style("stroke-width","2");
                })
                .on('mouseout',function(){
                  console.log("hover")
                  d3.select(this).transition()
                  .ease(d3.easeLinear)
                  .style("stroke-width","1");
                })

              });



            })


          }





        });
        console.log(d3.selectAll(".c3-shape.c3-shape-0.c3-bar.c3-bar-0").attr('class'));
        console.log(d3.select(".c3-shape.c3-shape-0.c3-bar.c3-bar-0").attr("class"));

        console.log(d3.select(".c3-shape.c3-shape-0.c3-bar.c3-bar-0"));
        /*setTimeout(()=>{
          console.log(d3.select(".c3-shape.c3-shape-0.c3-bar.c3-bar-0").node().getBBox());
                    //console.log(d3.select(".c3-shape.c3-shape-0.c3-bar.c3-bar-0").node().getboundingBox());
                    console.log(d3.select(".c3-shape.c3-shape-0.c3-bar.c3-bar-0").node());
                    console.log(d3.select(".c3-shape.c3-shape-0.c3-bar.c3-bar-0").node().getBoundingClientRect());

          /*bottom: 506.5
          height: 67.90908813476562
          left: 368.5
          right: 456.5
          top: 438.5909118652344
          width: 88
          x: 368.5
          y: 438.5909118652344*/


/*
height: 67.90908813476562
width: 88
x: 44
y: 182.09091186523438
*/ /*

        },5000)
*/

       

  }




  fn_setAdjuntoActual(anexo, tipo_adjunto){
    this.seleccionMenu["anexo_carga_mostrar"]=anexo;
    if(tipo_adjunto=="hijo"){
      this.seleccionMenu.nieto_seleccionado=null;
    }
  }


  fn_setRigthOption(item,tipo){
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
    this.seleccionMenu["anexo_carga_mostrar"]=item.hijo_nombre;
    this.seleccionMenu["anexo"]=item.anexo;

    this.seleccionMenu["nieto_seleccionado"]=
    {
      "nieto_seleccionado_nombre":this.seleccionMenu["anexo_carga_mostrar"],
      "nieto_seleccionado_anexo": this.seleccionMenu["anexo"]
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
