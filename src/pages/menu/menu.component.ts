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
      "nombre":"Agenda",
      "icon": "/assets/img/agenda.png",
      "descripcion":"Fechas de Corte Ciclos"
    },
    {
      "nombre":"Cartera",
      "icon": "/assets/img/cartera.png",
      "descripcion":"Valor Cartera / Días Cartera"
    },
    {
      "nombre":"Datos Básicos",
      "icon": "/assets/img/datos_basicos.png",
      "descripcion":"Información de Usuarios"
    },
    {
      "nombre":"Clase Servicio",
      "icon": "/assets/img/clase_servicio.png",
      "descripcion":"Tipos de Clase de Servicio"
    },
    {
      "nombre":"Pagos",
      "icon": "/assets/img/pagos.png",
      "descripcion":"Facturas / Pagos por producto / Valor Pago"
    },
    {
      "nombre":"Consumo Subsistencia",
      "icon": "/assets/img/consumo_subsistencia.png",
      "descripcion":"Valor Consumo / Instalaciones Residencial"
    },
    {
      "nombre":"Suspensión Reconexión",
      "icon": "/assets/img/suspension_reconexion.png",
      "descripcion":"Fechas de ejecución / Estados"
    },

    {
      "nombre":"PQRs",
      "icon": "/assets/img/pqr.png",
      "descripcion":"Tipo de solicitudes / Acciones",
      "fichero":"./assets/data/pqrs.json",
      "campos":""

    },

    {
      "nombre":"Control Pérdidas",
      "icon": "/assets/img/control_perdidas.png",
      "descripcion":"Irregularidades"
    },
    {
      "nombre":"Segmentación",
      "icon": "/assets/img/segmentacion.png",
      "descripcion":"Irregularidades"
    },
    {
      "nombre":"Usuarios Circuito",
      "icon": "/assets/img/usuarios_circuito.png",
      "descripcion":"Ubicación, Subestación, Circuito, Nodo"
    },
    {
      "nombre":"CIIU",
      "icon": "/assets/img/ciiu.png",
      "descripcion":"Actividades Económicas"
    },
    {
      "nombre":"Barrios / Veredas",
      "icon": "/assets/img/barrios.png",
      "descripcion":"Caldas - Manizales"
    },
    {
      "nombre":"Cuentas Agrupadas",
      "icon": "/assets/img/cuentas_agrupadas.png",
      "descripcion":"Alumbrado Público"
    },
    {
      "nombre":"Gestión Admininfo",
      "icon": "/assets/img/gestion_admininfo.png",
      "descripcion":"Contacto Clientes"
    },
    {
      "nombre":"GIIP",
      "icon": "/assets/img/giip.png",
      "descripcion":"Balance de Reportes"
    },
    {
      "nombre":"Vanguardistas",
      "icon": "/assets/img/vanguardistas.png",
      "descripcion":"Uso de Canalas Vanguardistas"
    },
    {
      "nombre":"Visión Cliente",
      "icon": "/assets/img/vision_cliente.png",
      "descripcion":"Arrendatario / Arrendador"
    },
    {
      "nombre":"Turnos",
      "icon": "/assets/img/turnos.png",
      "descripcion":"Atención al Cliente"
    },
    {
      "nombre":"Copias Factura",
      "icon": "/assets/img/copias_factura.png",
      "descripcion":"Petición copias facturas"
    },
    {
      "nombre":"Facturación",
      "icon": "/assets/img/facturacion.png",
      "descripcion":"Usuarios"
    },
    {
      "nombre":"PFS",
      "icon": "/assets/img/pfs.png",
      "descripcion":"Planes de Financiación"
    },
    {
      "nombre":"Geografía",
      "icon": "/assets/img/geografia.png",
      "descripcion":"Datos de localización Geográfica"
    },
    {
      "nombre":"Indisponibilidades",
      "icon": "/assets/img/giip.png",
      "descripcion":"Eventos Fechas"
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
