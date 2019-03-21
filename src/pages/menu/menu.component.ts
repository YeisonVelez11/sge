import { OnInit ,Component,ViewChild, Input, Output, EventEmitter  } from '@angular/core';
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
@ViewChild('sidenav') sidenav: any;
/*@Output()
fn_dashboard = new EventEmitter()*/
/*@Output()
outupSeleccionProceso = new EventEmitter()*/

aFuentes:any=
  [
    {
      "fuente":"Caracterización",
      "anexo":"./assets/data/Caracterizacion/1.5.  CARACTERIZACION FINANCIERA GFI.pdf",
      "fuente_hijos": 
        [
        ]
    },
    {
      "fuente":"Procedimientos",
      "fuente_hijos": 
        [

          {
            "hijo_nombre":"GFI-PRO-001.   Procedimiento Cartera y Financiacion de Matricula",
            "anexo":"./assets/data/4.2.   PROCEDIMIENTOS/GFI-PRO-001.   Procedimiento Cartera y Financiacion de Matricula.pdf",
            "nietos":[
            ],
            "formatos":
            [

                {
                  "hijo_nombre":"GFI-FOR-003.   Devoluciones",
                  "anexo":"./assets/data/4.5.   FORMATOS/GFI-FOR-003.   Devoluciones.pdf",
                  "nietos":[
                  ]
                },
                {
                  "hijo_nombre":"GFI-FOR-004.   Saldos a Favor.pdf",
                  "anexo":"./assets/data/4.5.   FORMATOS/GFI-FOR-004.   Saldos a Favor.pdf",
                  "nietos":[
                  ]
                },
                {
                  "hijo_nombre":"GFI-FOR-005.   Formulrios de Financiación.pdf",
                  "anexo":"./assets/data/GFI-FOR-005.   Formulrios de Financiación.pdf",
                  "nietos":[
                  ]
                } 
            ]


          },
          {
            "hijo_nombre":"GFI-PRO-002.   Procedimiento Adquisición Bienes y Servicios",
            "anexo":"./assets/data/4.2.   PROCEDIMIENTOS/GFI-PRO-002.   Procedimiento Adquisición Bienes y Servicios.pdf",
            "nietos":[
            ]
          }
        ]
    },
    {
      "fuente":"Instructivos",
      "fuente_hijos": 
        [

          {
            "hijo_nombre":"GFI-INS-001   Instructivo Anticipos",
            "anexo":"./assets/data/4.5   INSTRUCTIVOS/GFI-INS-001   Instructivo Anticipos.pdf",
            "nietos":[
            ],
            "formatos":
            [

              {
                "hijo_nombre":"GFI-FOR-001.   Legalizacion Anticipo",
                "anexo":"./assets/data/4.5.   FORMATOS/GFI-FOR-001.   Legalizacion Anticipo.pdf",
                "nietos":[
                ]
              },
              {
                "hijo_nombre":"GFI-FOR-002.  Pagos menores.pdf",
                "anexo":"./assets/data/4.5.   FORMATOS/GFI-FOR-002.  Pagos menores.pdf",
                "nietos":[
                ]
              } 
              
            ],
            "instructivos":
            [

            ]


          },
          {
            "hijo_nombre":"GFI-INS-002.   Instructivo Conciliaciones Bancarias",
            "anexo":"./assets/data/4.5   INSTRUCTIVOS/GFI-INS-002.   Instructivo Conciliaciones Bancarias.pdf",
            "nietos":[
            ]
          }

        ]

    },
    {
      "fuente":"Indicadores",
      "fuente_hijos": 
        [

        ]
    },

    {
      "fuente":"Formatos",
      "fuente_hijos": 
        [

          {
            "hijo_nombre":"GFI-FOR-001.   Legalizacion Anticipo",
            "anexo":"./assets/data/4.5.   FORMATOS/GFI-FOR-001.   Legalizacion Anticipo.pdf",
            "nietos":[
            ]
          },
          {
            "hijo_nombre":"GFI-FOR-002.  Pagos menores.pdf",
            "anexo":"./assets/data/4.5.   FORMATOS/GFI-FOR-002.  Pagos menores.pdf",
            "nietos":[
            ]
          }        
        ]
    },
    {
      "fuente":"Matriz de Comunicaciones",
      "anexo":"./assets/data/matriz/1.9.   MATRIZ DE RIESGOS FINANCIERA  V 2.pdf",
      "fuente_hijos": 
        [
      
        ]
    },
    {
      "fuente":"Matriz de Riesgos",
      "anexo":"./assets/data/matriz/1.9.   MATRIZ DE RIESGOS FINANCIERA  V 2.pdf",
      "fuente_hijos": 
        [


        ]
    }




  ]


  @Output() setOptionMenu: EventEmitter<any>;
  constructor(
    private ServicesProvider: ServicesProvider,
    private router : Router
) {
      this.setOptionMenu = new EventEmitter();
      //this.fn_sesion();
      var categoria=window.location.href.split("/")[3];
      if(categoria!=""){
          this.bMostraMenu=false;
          this.bMostraMapa=false;
          this.categoria=categoria;

          if(this.categoria=="financiera"){
            this.titulo="apoyo";
          }

        } 
        else{
          this.bMostraMenu=true;
          this.bMostraMapa=true;
        }

  }
  fn_setOptionMenu(item:any,hijo:any){
    this.sidenav.hide();
    item["hijos"]=hijo;
    if(hijo){
      item["anexo_carga_mostrar"]=hijo.anexo;
    }
    else{
      item["anexo_carga_mostrar"]=item.anexo;
    }
    console.log(item);
    this.setOptionMenu.emit(item);

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
