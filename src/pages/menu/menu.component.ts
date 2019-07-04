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

aFuentes:any=
[
    {
        "fuente": "Caracterización",
        "anexo_mostrar": "PS-CRT-001 Caracterización de procesos de Proyección Social",
        "anexo": "5_Proyeccion Social/Caracterizacion/PS-CRT-001 Caracterizacion de procesos de Proyeccion Social.pdf",
        "fuente_hijos": []
    },
    {
        "fuente": "Procedimientos",
        "fuente_hijos": [
            {
                "hijo_nombre": "PS-PRO-001 Procedimiento para la adquisición y legalización de convenios y_o contratos de asesoría y consultoría - desarrollo social",
                "anexo": "5_Proyeccion Social/Procedimientos/PS-PRO-001 Procedimiento para la adquisicion y legalizacion de convenios y_o contratos de asesoria y consultoria - desarrollo social.pdf",
                "formatos": [
                    {
                        "hijo_nombre": "PS-FOR-008 Presentación de convenios y proyectos de asesoría y consultoría - desarrollo social",
                        "anexo": "5_Proyeccion Social/Formatos/PS-FOR-008 Presentacion de convenios y_o proyectos de asesoria - desarrollo social.pdf"
                    }
                ]
            },
            {
                "hijo_nombre": "PS-PRO-002 Procedimiento para la planeación y ejecución de convenios y_o contratos de asesoría y consultoría - desarrollo social",
                "anexo": "5_Proyeccion Social/Procedimientos/PS-PRO-002 Procedimiento para la planeacion y ejecucion de convenios y_o contratos de asesoria y consultoria - desarrollo social.pdf",
                "formatos": []
            },
            {
                "hijo_nombre": "PS-PRO-003 Procedimiento para la Gestión de Graduados",
                "anexo": "5_Proyeccion Social/Procedimientos/PS-PRO-003 Procedimiento para la Gestion de Graduados.pdf",
                "formatos": [
                    {
                        "hijo_nombre": "PS-FOR-002 Instrumento de empleabilidad para graduado",
                        "anexo": "5_Proyeccion Social/Formatos/PS-FOR-002 Instrumento de empleabilidad para graduado.pdf"
                    },
                    {
                        "hijo_nombre": "PS-FOR-003 Instrumento de empleabilidad para empleador",
                        "anexo": "5_Proyeccion Social/Formatos/PS-FOR-003 Instrumento de empleabilidad para empleador.pdf"
                    },
                    {
                        "hijo_nombre": "PS-FOR-004 Registro de asistencia OG",
                        "anexo": "5_Proyeccion Social/Formatos/PS-FOR-004 Registro de asistencia OG.pdf"
                    },
                    {
                        "hijo_nombre": "PS-FOR-005 Instrumento de salida",
                        "anexo": "5_Proyeccion Social/Formatos/PS-FOR-005 Instrumento de salida.pdf"
                    }
                ]
            },
            {
                "hijo_nombre": "PS-PRO-004 Procedimiento para la pre e incubación de empresas",
                "anexo": "5_Proyeccion Social/Procedimientos/PS-PRO-004 Procedimiento para la pre e incubacion de empresas.pdf",
                "formatos": [
                    {
                        "hijo_nombre": "PS-FOR-017 Formato de evaluación de satisfacción preincubación",
                        "anexo": "5_Proyeccion Social/Formatos/PS-FOR-017 Formato de evaluacion de satisfaccion preincubacion.pdf"
                    },
                    {
                        "hijo_nombre": "PS-FOR-018 Formato de evaluación de satisfacción Incubación",
                        "anexo": "5_Proyeccion Social/Formatos/PS-FOR-018 Formato de evaluacion de satisfaccion Incubacion.pdf"
                    }
                ]
            },
            {
                "hijo_nombre": "PS-PRO-005 Procedimiento para la oferta y ejecución de programas de educación continuada",
                "anexo": "5_Proyeccion Social/Procedimientos/PS-PRO-005 Procedimiento para la oferta y ejecucion de programas de educacion continuada.pdf",
                "formatos": [
                    {
                        "hijo_nombre": "PS-FOR-009 Propuesta de formación",
                        "anexo": "5_Proyeccion Social/Formatos/PS-FOR-009 Propuesta de formacion.pdf"
                    },
                    {
                        "hijo_nombre": "PS-FOR-010 Evaluación del proceso de formación",
                        "anexo": "5_Proyeccion Social/Formatos/PS-FOR-010 Evaluacion del proceso de formacion.pdf"
                    }
                ]
            },
            {
                "hijo_nombre": "PS-PRO-006 Procedimiento para la gestión de prácticas sociales estudiantiles",
                "anexo": "5_Proyeccion Social/Procedimientos/PS-PRO-006 Procedimiento para la gestion de practicas sociales estudiantiles.pdf",
                "formatos": [
                    {
                        "hijo_nombre": "PS-FOR-011 Acta de compromiso ético",
                        "anexo": "5_Proyeccion Social/Formatos/PS-FOR-011 Acta de compromiso etico.pdf"
                    },
                    {
                        "hijo_nombre": "PS-FOR-012 Acta de acompañamiento",
                        "anexo": "5_Proyeccion Social/Formatos/PS-FOR-012 Acta de acompañamiento.pdf"
                    },
                    {
                        "hijo_nombre": "PS-FOR-013 Plan de trabajo prácticas estudiantiles",
                        "anexo": "5_Proyeccion Social/Formatos/PS-FOR-013 Plan de trabajo practicas estudiantiles.pdf"
                    },
                    {
                        "hijo_nombre": "PS-FOR-014 Evaluación de la práctica por parte de la empresa",
                        "anexo": "5_Proyeccion Social/Formatos/PS-FOR-014 Evaluacion de la practica por parte de la empresa.pdf"
                    },
                    {
                        "hijo_nombre": "PS-FOR-015 Informe final de prácticas estudiantiles",
                        "anexo": "5_Proyeccion Social/Formatos/PS-FOR-015 Informe final de practicas estudiantiles.pdf"
                    },
                    {
                        "hijo_nombre": "PS-FOR-016 Evaluación de tutores de práctica",
                        "anexo": "5_Proyeccion Social/Formatos/PS-FOR-016 Evaluacion de tutores de practica.pdf"
                    }
                ]
            },
            {
                "hijo_nombre": "PS-PRO-007 Procedimiento de Intermediación Laboral",
                "anexo": "5_Proyeccion Social/Procedimientos/PS-PRO-007 Procedimiento de Intermediacion Laboral.pdf",
                "formatos": []
            }
        ]
    },
    {
        "fuente": "Instructivos",
        "fuente_hijos": [
            {
                "hijo_nombre": "PS-IT-001 Instructivo para Carnetización",
                "anexo": "5_Proyeccion Social/Instructivos/PS-IT-001 Instructivo para Carnetizacion.pdf",
                "formatos": []
            },
            {
                "hijo_nombre": "PS-IT-002 Instructivo para la Administración del Portal de Empleo",
                "anexo": "5_Proyeccion Social/Instructivos/PS-IT-002 Instructivo para la Administracion del Portal de Empleo.pdf",
                "formatos": []
            },
            {
                "hijo_nombre": "PS-IT-003 Instructivo para la pre e inscripción en programas de educación continuada",
                "anexo": "5_Proyeccion Social/Instructivos/PS-IT-003 Instructivo para la pre e inscripcion en programas de educacion continuada.pdf",
                "formatos": []
            }
        ]
    },
    {
        "fuente": "Formatos",
        "fuente_hijos": [
            {
                "hijo_nombre": "PS-FOR-002 Instrumento de empleabilidad para graduado",
                "anexo": "5_Proyeccion Social/Formatos/PS-FOR-002 Instrumento de empleabilidad para graduado.pdf"
            },
            {
                "hijo_nombre": "PS-FOR-003 Instrumento de empleabilidad para empleador",
                "anexo": "5_Proyeccion Social/Formatos/PS-FOR-003 Instrumento de empleabilidad para empleador.pdf"
            },
            {
                "hijo_nombre": "PS-FOR-004 Registro de asistencia OG",
                "anexo": "5_Proyeccion Social/Formatos/PS-FOR-004 Registro de asistencia OG.pdf"
            },
            {
                "hijo_nombre": "PS-FOR-005 Instrumento de salida",
                "anexo": "5_Proyeccion Social/Formatos/PS-FOR-005 Instrumento de salida.pdf"
            },
            {
                "hijo_nombre": "PS-FOR-008 Presentación de convenios y proyectos de asesoría y consultoría - desarrollo social",
                "anexo": "5_Proyeccion Social/Formatos/PS-FOR-008 Presentacion de convenios y_o proyectos de asesoria - desarrollo social.pdf"
            },
            {
                "hijo_nombre": "PS-FOR-009 Propuesta de formación",
                "anexo": "5_Proyeccion Social/Formatos/PS-FOR-009 Propuesta de formacion.pdf"
            },
            {
                "hijo_nombre": "PS-FOR-010 Evaluación del proceso de formación",
                "anexo": "5_Proyeccion Social/Formatos/PS-FOR-010 Evaluacion del proceso de formacion.pdf"
            },
            {
                "hijo_nombre": "PS-FOR-011 Acta de compromiso ético",
                "anexo": "5_Proyeccion Social/Formatos/PS-FOR-011 Acta de compromiso etico.pdf"
            },
            {
                "hijo_nombre": "PS-FOR-012 Acta de acompañamiento",
                "anexo": "5_Proyeccion Social/Formatos/PS-FOR-012 Acta de acompañamiento.pdf"
            },
            {
                "hijo_nombre": "PS-FOR-013 Plan de trabajo prácticas estudiantiles",
                "anexo": "5_Proyeccion Social/Formatos/PS-FOR-013 Plan de trabajo practicas estudiantiles.pdf"
            },
            {
                "hijo_nombre": "PS-FOR-014 Evaluación de la práctica por parte de la empresa",
                "anexo": "5_Proyeccion Social/Formatos/PS-FOR-014 Evaluacion de la practica por parte de la empresa.pdf"
            },
            {
                "hijo_nombre": "PS-FOR-015 Informe final de prácticas estudiantiles",
                "anexo": "5_Proyeccion Social/Formatos/PS-FOR-015 Informe final de practicas estudiantiles.pdf"
            },
            {
                "hijo_nombre": "PS-FOR-016 Evaluación de tutores de práctica",
                "anexo": "5_Proyeccion Social/Formatos/PS-FOR-016 Evaluacion de tutores de practica.pdf"
            }
        ]
    },
    {
        "fuente": "Indicadores",
        "fuente_hijos": [],
        "indicadores": []
    },
    {
        "fuente": "Matriz de Riesgos",
        "fuente_hijos": [],
        "anexo_mostrar": [
            "PS-FOR-019 Matriz de Riesgos Proyección Social"
        ],
        "anexo": [
            "5_Proyeccion Social/Caracterizacion/PS-FOR-019 Matriz de Riesgos Proyeccion Social.pdf"
        ]
    },
    {
        "fuente": "Matriz de Comunicaciones",
        "fuente_hijos": [],
        "anexo_mostrar": [
            "PS-FOR-007 Matriz de comunicaciones Proyección Social"
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

  fn_goProcess(categoria:any,bienes:any){
    this.categoria=categoria;
    this.titulo=bienes;
    this.bMostraMenu=false;
    this.bMostraMapa=false;
    this.router.navigate(["financiera"]);
    //this.outupSeleccionProceso.emit({"categoria":this.categoria,"titulo":this.titulo});
  }


 

}
