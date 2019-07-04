export const VARIABLES:any = {
    datepicker: {
    // Strings and translations
    dayLabels: {su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab'},
    dayLabelsFull: {su: "Domingo", mo: "Lunes", tu: "Martes", we: "Miércoles", th: "Jueves", fr: "Viernes", sa:
    "Sabado"},
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10:
    'Oct', 11: 'Nov', 12: 'Dic' },
    monthLabelsFull: { 1: "Enero", 2: "Febrero", 3: "Marzo", 4: "Abril", 5: "May", 6: "Junio", 7: "Julio", 8:
    "Agosto", 9: "Septiembre", 10: "Octubre", 11: "Noviembre", 12: "Diciembre" },

    // Buttons
    todayBtnTxt: "Hoy",
    clearBtnTxt: "Borrar",
    closeBtnTxt: "Cerrar",

    // Format
    dateFormat: 'yyyy-mm-dd',

    // First day of the week
    firstDayOfWeek: 'Lun',

    // // Disable dates
    /*disableUntil: {year: 2018, month: 10, day: 1},
    disableSince: {year: 2018, month: 10, day: 31},/*
    disableDays: [{year: 2018, month: 10, day: 3}],*/
    //disableDateRanges: [{begin: {year: 2018, month: 10, day: 5}, end: {year: 2018, month: 10, day: 7}}],
    disableWeekends: false,

    // Enable dates (when disabled)

    // Year limits
    minYear: 2017,
    maxYear: 9999,

    // Show Today button
    showTodayBtn: true,

    // Show Clear date button
    showClearDateBtn: true,

    markCurrentDay: true,
    //markDates: [{dates: [{year: 2018, month: 10, day: 20}], color: '#303030'}],
    markWeekends: undefined,
    disableHeaderButtons: false,
    showWeekNumbers: false,
    height: '100px',
    width: '90%',
    selectionTxtFontSize: '15px'
    },
    oEstado_solicitud:
    {
        "Sin Iniciar":{
          "color": "bola_roja"
        },
        "En Ejecución":{
          "color": "bola_amarilla"
        },
        "Terminado":{
          "color": "bola_verde"
        }               
    },
    oEstadoPrioridad:{
        "alta": "bola_roja",
        "media": "bola_amarilla",
        "baja": "bola_gris"
    },
    oFuentes:{
      "Proyección Social":{
        "nombre":"Proyección Social",
        "ruta": "./assets/data/Proyeccion Social.json", 
        "icon_white":"./assets/img/proyeccion_social_b.svg",
        "icon_black":"./assets/img/proyeccion_social.svg"
      },
    
      "Planeación Institucional":{
        "nombre":"Planeación Institucional",
        "ruta": "./assets/data/Planeacion Institucional.json", 
        "icon_white":"./assets/img/gestion_estrategica_b.svg",
        "icon_black":"./assets/img/gestion_estrategica.svg"
      },
    
      "Gestion de Calidad":{
        "nombre":"Gestion de Calidad",
        "ruta": "./assets/data/Gestion de Calidad.json", 
        "icon_white":"./assets/img/quality_b.svg",
        "icon_black":"./assets/img/quality.svg"
      },
    
      "Docencia":{
        "nombre":"Docencia",
        "ruta": "./assets/data/Docencia.json", 
        "icon_white":"./assets/img/docencia_b.svg",
        "icon_black":"./assets/img/docencia.svg"
      },
    
      "Investigacion y Posgrados":{
        "nombre":"Investigación y Posgrados",
        "ruta": "./assets/data/Investigacion y Posgrados.json", 
        "icon_white":"./assets/img/investigacion_b.svg",
        "icon_black":"./assets/img/investigacion.svg"
      },
    
      "Recursos de Apoyo Academico":{
        "nombre":"Recursos de Apoyo Académico",
        "ruta": "./assets/data/Recursos de Apoyo Academico.json", 
        "icon_white":"./assets/img/academico_b.svg",
        "icon_black":"./assets/img/academico.svg"
      },
      
      "Desarrollo Humano":{
        "nombre":"Desarrollo Humano",
        "ruta": "./assets/data/Desarrollo Humano.json", 
        "icon_white":"./assets/img/desarrollo_humano_b.svg",
        "icon_black":"./assets/img/desarrollo_humano.svg"
      },
    
      "Infraestructura":{
        "nombre":"Infraestructura",
        "ruta": "./assets/data/Infraestructura.json", 
        "icon_white":"./assets/img/infraestructura_b.svg",
        "icon_black":"./assets/img/infraestructura.svg"
      },
    
      "Gestion Financiera":{
        "nombre":"Gestión Financiera",
        "ruta": "./assets/data/Gestion Financiera.json", 
        "icon_white":"./assets/img/financiera_b.svg",
        "icon_black":"./assets/img/financiera.svg"
      }
    },
    oUrlFuentes:{
      "gestion_academico":
      { 
        "categoria":"Planeación Institucional",
        "titulo":"gerenciales"
      },
      "calidad":
      { 
        "categoria":"Gestion de Calidad",
        "titulo":"gerenciales"
      },
      "docencia":
      { 
        "categoria":"Docencia",
        "titulo":"misionales"
      },
      "investigacion":
      { 
        "categoria":"Investigacion y Posgrados",
        "titulo":"misionales"
      },
      "proyeccion":
      { 
        "categoria":"Proyección Social",
        "titulo":"misionales"
      },
      "humano":
      { 
        "categoria":"Desarrollo Humano",
        "titulo":"apoyo"
      },
      "infraestructura":
      { 
        "categoria":"infraestructura",
        "titulo":"apoyo"
      },
      "academico":
      { 
        "categoria":"Recursos de Apoyo Academico",
        "titulo":"apoyo"
      },
      "financiera":{ 
        "categoria":"Gestion Financiera",
        "titulo":"apoyo"
      }      

    }

  };
