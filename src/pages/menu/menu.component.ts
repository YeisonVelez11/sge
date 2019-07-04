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
oMenuSeleccionado={"fuente":"Indicadores"};
@ViewChild('sidenav') sidenav: any;

/*@Output()
fn_dashboard = new EventEmitter()*/
/*@Output()
outupSeleccionProceso = new EventEmitter()*/

aFuentes:any=[];
aJsonFuentes={
  "Proyección Social":{
    "nombre":"Proyección Social",
    "ruta": "./assets/data/Proyeccion Social.json", 
    "icon_white":"./assets/img/proyeccion_social_b.svg",
    "icon_black":"./assets/img/proyeccion_social.svg"
  },

  "Planeación Institucional":{
    "nombre":"Planeacion Institucional",
    "ruta": "./assets/data/Planeacion Institucional.json", 
    "icon_white":"./assets/img/gestion_estrategica_b.svg",
    "icon_black":"./assets/img/gestion_estrategica.svg"
  }
}

  @Output() setOptionMenu: EventEmitter<any>;
  @Output() setTitulo: EventEmitter<any>;

  constructor(
    private ServicesProvider: ServicesProvider,
    private router : Router
) {
      this.setOptionMenu = new EventEmitter();
      this.setTitulo = new EventEmitter();
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
    item["nieto_seleccionado"]=null;
    item["formatos"]=null;
    item["instructivos"]=null;
    item["hijo_seleccionado"]=null;
    item["bFlecha_animacion"]=true;
    item["seleccion_instructivo"]=true;
    item["seleccion_formato"]=false;


    if(hijo){
      item["anexo_carga_mostrar"]=hijo.anexo;
      item["hijo_seleccionado"]=
      {
        "hijo_nombre":hijo.hijo_nombre,
        "hijo_anexo":hijo.anexo
      };
      item["formatos"]=hijo.formatos;
      item["instructivos"]=hijo.instructivos;

    }
    else{
      item["anexo_carga_mostrar"]=item.anexo;
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

    console.log(this.aJsonFuentes[json]);
    this.ServicesProvider.getjson(this.aJsonFuentes[json].ruta,{}).then(data=>{
      

      this.aFuentes=data;
      this.categoria=categoria;
      this.titulo=titulo;
      this.bMostraMenu=false;
      this.bMostraMapa=false;
      this.router.navigate(["financiera"]);
      //this.outupSeleccionProceso.emit({"categoria":this.categoria,"titulo":this.titulo});
      setTimeout(()=>{
        this.setTitulo.emit(this.aJsonFuentes[json]);
      })

      
    })
  }


 

}
