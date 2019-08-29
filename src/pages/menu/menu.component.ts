import { OnInit ,Component,ViewChild, Input, Output, EventEmitter  } from '@angular/core';
import { ServicesProvider } from '../../providers/services';
import { Router,ActivatedRoute } from '@angular/router';
import { VARIABLES } from 'src/config/variables';

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
titulo="";
categoria_url:any="";
oMenuSeleccionado={"fuente":"Indicadores"};
@ViewChild('sidenav') sidenav: any;

/*@Output()
fn_dashboard = new EventEmitter()*/
/*@Output()
outupSeleccionProceso = new EventEmitter()*/

aFuentes:any=[];
aJsonFuentes=VARIABLES.oFuentes;
oUrlFuentes=VARIABLES.oUrlFuentes;

  @Output() setOptionMenu: EventEmitter<any>;
  @Output() setTitulo: EventEmitter<any>;

  constructor(
    private ServicesProvider: ServicesProvider,
    private router : Router,
    private route:ActivatedRoute
) {
      this.setOptionMenu = new EventEmitter();
      this.setTitulo = new EventEmitter();
      //this.fn_sesion();

      var categoria=window.location.href.split("/")[4];
      if(categoria){
          this.bMostraMenu=false;
          this.bMostraMapa=false;
          this.categoria=categoria;
          if(this.oUrlFuentes[this.categoria]){
            this.titulo=this.oUrlFuentes[this.categoria].titulo;
            console.log(this.oUrlFuentes,this.categoria);
            this.fn_goProcess(this.categoria,this.titulo,this.oUrlFuentes[this.categoria].categoria)
          }
          else{
            this.router.navigate(["/"]);
            this.bMostraMenu=true;
            this.bMostraMapa=true;
          }
        } 
        else{
          this.bMostraMenu=true;
          this.bMostraMapa=true;
        }
  }

  fn_setOptionMenu(item:any,hijo:any){
    this.sidenav.hide();
    item["formatos"]=null;
    item["instructivos"]=null;
    item["hijo_seleccionado"]=null;
    item["bFlecha_animacion"]=true;
    item["seleccion_instructivo"]=true;
    item["seleccion_formato"]=false;
    if(hijo){
      item["anexo_carga_mostrar"]=hijo.hijo_nombre;
      item["anexo"]=hijo.anexo;


      item["hijo_seleccionado"]=
      {
        "hijo_nombre":hijo.hijo_nombre,
        "hijo_anexo":hijo.anexo
      };
      item["formatos"]=hijo.formatos;
      item["instructivos"]=hijo.instructivos;

    }
    else{
      item["anexo_carga_mostrar"]=item.anexo_mostrar;
      item["anexo"]=item.anexo;

    }
    this.oMenuSeleccionado=item;

    this.setOptionMenu.emit(item);

  }


  ngOnInit() {
    //this.myDatePickerOptions=this.ServicesProvider.getDatepickerOpt("posterior");

  }

  fn_mostrarMapa(){
    this.bMostraMapa=false;
  }

  fn_goProcess(categoria:any,titulo:any,json){
    this.ServicesProvider.preloaderOn();
    console.log(this.aJsonFuentes, json)
    this.ServicesProvider.getjson(this.aJsonFuentes[json].ruta,{}).then(data=>{
      

      this.aFuentes=data;
      this.categoria=categoria;
      this.titulo=titulo;
      this.bMostraMenu=false;
      this.bMostraMapa=false;
      this.router.navigate(["proceso",this.categoria]);
      //this.outupSeleccionProceso.emit({"categoria":this.categoria,"titulo":this.titulo});
      setTimeout(()=>{
        this.ServicesProvider.preloaderOff();

        document.getElementById("Indicadores").click();
        delete  this.aJsonFuentes[json]["indicadores"];
        delete  this.aJsonFuentes[json]["anios"];
        delete  this.aJsonFuentes[json]["indicador_proyeccion_social_nombre"];
        delete  this.aJsonFuentes[json]["indicador_proyeccion_social_ruta"];

        this.aJsonFuentes[json]["indicadores"]=this.aFuentes[4].indicadores;
        this.aJsonFuentes[json]["anios"]=this.aFuentes[4]["anios"];
        this.aJsonFuentes[json]["indicador_proyeccion_social_nombre"]=this.aFuentes[4]["indicador_proyeccion_social_nombre"];
        this.aJsonFuentes[json]["indicador_proyeccion_social_ruta"]=this.aFuentes[4]["indicador_proyeccion_social_ruta"];




        this.setTitulo.emit(this.aJsonFuentes[json]);
      });

      
    })
  }


 

}
