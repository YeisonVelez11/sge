import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	private activatedComponent;
	constructor(
    		private router : Router
		){
		    console.log(this.router.url);
	}

  onActivate(component:any){
    this.activatedComponent = component;
  }

  fn_setTituloProceso(item){
    this.activatedComponent.titulo_proceso = item;
    this.activatedComponent.indicador=null;
    console.log(item);
  }

  setOptionMenu(item:any){
    this.activatedComponent.seleccionMenu = item;

    console.log(this.activatedComponent.seleccionMenu );
  }

}
