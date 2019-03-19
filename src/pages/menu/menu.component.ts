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

@Output()
fn_dashboard = new EventEmitter()

aFuentes:any=
  [
    {
      "fuente":"Indicadores",
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
      "fuente":"Indicadores",
      "fuente_hijos": 
        [

        ]
    },
    {
      "fuente":"Indicadores",
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
    }
  ]



  constructor(
    private ServicesProvider: ServicesProvider,
    private router : Router
) {
      //this.fn_sesion();
    
  }


  ngOnInit() {
    //this.myDatePickerOptions=this.ServicesProvider.getDatepickerOpt("posterior");

  }

  fn_setFuente(item:any){
    this.fn_dashboard.emit(item)
  }

 

}
