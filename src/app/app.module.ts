import { BrowserModule } from '@angular/platform-browser';

//import { MDBBootstrapModulesPro,MDBSpinningPreloader } from 'ng-uikit-pro-standard';

import { MDBBootstrapModulesPro } from '../../projects/ng-uikit-pro-standard/src/lib/mdb.module';


/*
import { MDBBootstrapModulesPro } from '../../projects/ng-uikit-pro-standard/src/lib/mdb.module';

import { MDBSpinningPreloader } from '../../projects/ng-uikit-pro-standard/src/lib/pro/mdb-pro.module';
*/

import { NgModule,Pipe, PipeTransform } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import {ToastModule, ToastService} from '../../projects/ng-uikit-pro-standard/src/lib/pro/alerts';
import { NotFoundComponent,MenuComponent,DashboardComponent,FinancieraComponent} from '../pages/index.paginas';
import { ServicesProvider } from '../providers/services';
import { routing, appRoutingProviders } from './app.routing'
import { HttpModule } from '@angular/http';
import { DatePipe } from '@angular/common';
//import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    NotFoundComponent,
    DashboardComponent,
    FinancieraComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModulesPro.forRoot(),
    //ToastModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    routing
    //PdfViewerModule
  ],
  entryComponents: [  ],
  providers: [
  //MDBSpinningPreloader, 
    //ToastService,
    DatePipe,
    ServicesProvider,
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
