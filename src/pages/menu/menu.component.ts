import { OnInit ,Component, Input, Output, EventEmitter  } from '@angular/core';
import { ServicesProvider } from '../../providers/services';
import { Router } from '@angular/router';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
bPrimeraVez=false;
iFuenteSeleccionada:number=-1;
oFuenteSeleccionada:any;
bMostraMapa:any=""; //true oculta el mapa
bMostraMenu:any="";
categoria="";
titulo=""
/*@Output()
fn_dashboard = new EventEmitter()*/
/*@Output()
outupSeleccionProceso = new EventEmitter()*/

aFuentes:any=
  [
    {
      "fuente":"Caracterización",
      "fuente_hijos": 
        [
        ]
    },
    {
      "fuente":"Procedimientos",
      "fuente_hijos": 
        [
          {
            "hijo_nombre":"hijo 1",
            "nietos":[
            ]
          },
          {
            "hijo_nombre":"hijo 2",
            "nietos":[
              
            ]
          },
          {
            "hijo_nombre":"hijo 3",
            "nietos":[
              
            ]
          }
        ]
    },
    {
      "fuente":"Instructivos",
      "fuente_hijos": 
        [
        ]
    },
    {
      "fuente":"Formatos",
      "fuente_hijos": 
        [
        ]
    },
    {
      "fuente":"Indicadores",
      "fuente_hijos": 
        [

        ]
    }


  ]



  constructor(
    private ServicesProvider: ServicesProvider,
    private router : Router
) {
      //this.fn_sesion();
      console.log(window.location.href.split("/")[3]!="")
      if(window.location.href.split("/")[3]!=""){
          this.bMostraMenu=false;
          this.bMostraMapa=false;
        } 
        else{
          this.bMostraMenu=true;
          this.bMostraMapa=true;
        }
  }


  ngOnInit() {
    //this.myDatePickerOptions=this.ServicesProvider.getDatepickerOpt("posterior");

  }

  fn_mostrarMapa(){
    this.bMostraMapa=false;
  }

  fn_goProcess(categoria:any,bienes:any){
    this.categoria=categoria;
    this.titulo=bienes;
    this.bMostraMenu=false;
    this.bMostraMapa=false;
    this.router.navigate(["financiera"]);
    //this.outupSeleccionProceso.emit({"categoria":this.categoria,"titulo":this.titulo});
  }

  fn_getProceso(){
    console.log("aqui")
    //this.outupSeleccionProceso.emit({"categoria":1});
    this.bMostraMenu=false;
    this.router.navigate(["financiera"]);
  }


 

}
