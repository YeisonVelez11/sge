import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	constructor(
    		private router : Router
		){
		    console.log(this.router.url);

		if(!localStorage.getItem("idusuario")){
      		this.router.navigate(["/"]);
		}

		//else if(localStorage.getItem("idusuario") && this.router.url=="/"){
		else if(localStorage.getItem("idusuario") && this.router.url=="/"){

      		this.router.navigate(["dashboard"]);
		}
	}
}
