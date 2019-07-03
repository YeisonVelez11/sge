var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');
// file system module to perform file operations
const fs = require('fs');
// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet('1FmLzv7XIxbqdqDPZky5P__5ipuhGGi8OHK2IpqijLrM');
var sheet;
var aHojas = ["Hoja 2", "Proyección Social"];
//var aHojas=[];
var iContadorSheet=0;

//convierte a formato entero quitando ,00 y .
function convertToNumber(numero) {
  numero = numero.replace(",00", "");
  numero = numero.replace(",", "");
  numero = numero.replace(/\./g, "");

  return parseInt(numero);
}

// Authenticate with the Google Spreadsheets API.
doc.useServiceAccountAuth(creds, function (err) {


  doc.getInfo(function (err, info) {
    console.log('Loaded doc: ' + info.title + ' by ' + info.author.email);
    /*for(var i in  info.worksheets){
      aHojas.push(info.worksheets[i].title)
    }*/
    var recurringFunc = function() {  
    
      if(aHojas.length) {
        var fileName = aHojas.shift();
        sheet = info.worksheets[iContadorSheet];


        console.log('sheet 1: ' + sheet.title + ' ' + sheet.rowCount + 'x' + sheet.colCount);
        var aData = {};
        var aHeaders = [];
        var index = 0;
        var totalColumnas = 0;
        var totalFilas = 0;
        var romperCiclo = 0;
        var aAnios = []; //muestra los años que se cargaran
        var bAgregarAnios = false; //bandera que indica si debe añadir los años de las cabeceras
        var indexCorteAnios = 0;
        var multipleMediciones = false; //describe si existen varias medicione
        var indexHeaders;

        totalColumnas = sheet.colCount;

        sheet.getCells(
          { "return-empty": true, 'max-row': 100 }
          , function (err, cells) {
            //console.log(cell)

            // console.log('Cell R'+cell.row+'C'+cell.col+' = '+cell.value);
            for (const cell of cells) {
              //se obtiene las cabeceras
              if (parseInt(cell.row) == 1) {   //empieza desde 1

                if (!bAgregarAnios) {  //no se agregan los años en las cabeceras
                  //TODO mejorar esto, se hizo algo para garantizar que esten precentes todas las cabeceras
                  if ((cell.value).trim().toLowerCase() == "nombre procedimiento") {
                    aData._procedimientos = [];
                  }
                  else if ((cell.value).trim().toLowerCase() == "formato asociado  proc nombre") {
                    aData._formato_asociado = [];
                  }
                  else if ((cell.value).trim().toLowerCase() == "instructivo nombre") {
                    aData._instructivo = [];
                  }
                  else if ((cell.value).trim().toLowerCase() == "formato asociado instructivo") {
                    aData._formato_asociado_instructivo = [];
                  }

                  else {
                    aData['_' + (cell.value).trim()] = [];
                  }

                }

                if (bAgregarAnios && (cell.value).trim() != "") {
                  aAnios.push((cell.value).trim());
                }

                else if ((cell.value).trim().toLowerCase() == "registro de indicadores") {
                  bAgregarAnios = true;
                  indexCorteAnios = parseInt(cell.col) - 1
                }


              }
              if (parseInt(cell.row) == 2 && parseInt(cell.col) == 1) {
                //extrayendo keys

                for (var i in aData) {
                  aHeaders.push(i);
                }
                //console.log(aHeaders);
              }




              //empieza a leer despúes de las columnas
              if (parseInt(cell.row) != 1) {
                //console.log("row",parseInt(cell.row)-1," col",parseInt(cell.col)-1, " ",aHeaders[parseInt(cell.col)-1]," ",cell.value);
                //aqui se resetea a 0 romperciclo para contar cuantos hay vacios, si es igual a las columnas totales se rompe el ciclo
                //indexcortesanios va a indicarme la posicion en que se agregaran los anios
                if (parseInt(cell.col) == 1) {
                  romperCiclo = 0;

                }

                //if(cell.value.trim()!=""){ no se agregan nulos
                indexHeaders = 0;
                var valoractual = (cell.value).trim();

                //se ingresa la sección de anios
                //console.log(indexCorteAnios,parseInt(cell.col)-1);
                if (indexCorteAnios <= parseInt(cell.col) - 1) {
                  if (indexCorteAnios == parseInt(cell.col) - 1 && valoractual != "") { //si es la primera ocurrencia, se definirá la clave una sola vez
                    indexHeaders = indexCorteAnios;
                    //console.log("es la primera vez")
                    //console.log(aHeaders[indexHeaders]);
                    aData[aHeaders[indexHeaders]]
                      .push(
                        {

                          "nombre_indicador": valoractual,
                          "aMedicionUnica": [valoractual],
                          "aMediciones": []

                        }
                      );
                    oIndicadorActual = aData[aHeaders[indexHeaders]];


                  }
                  //detetando si tiene multiples indicadores
                  else if (parseInt(cell.col) - 1 == indexCorteAnios + 1 && valoractual != "") {
                    multipleMediciones = true;
                    //borrando el valor por defecrto que se quema en medicion unica
                    oIndicadorActual[oIndicadorActual.length - 1].aMedicionUnica.splice(0, 1);
                  }

                  else if (parseInt(cell.col) - 1 == indexCorteAnios + 1 && valoractual == "") {
                    multipleMediciones = false;

                  }
                  else if (!multipleMediciones) {


                    oIndicadorActual[oIndicadorActual.length - 1].aMedicionUnica.push(valoractual == "" ? 0 : convertToNumber(valoractual));
                  }

                  //columna de cabecera que puede estar vacia o no 
                  if ((parseInt(cell.col) - 1 >= indexCorteAnios + 1) && multipleMediciones == true) {
                    if (parseInt(cell.col) - 1 == indexCorteAnios + 1) {
                      oIndicadorActual[oIndicadorActual.length - 1].aMediciones.push({ "nombre_indicador": valoractual, "valores": [valoractual] })
                    }
                    else {
                      let indexIndicadorActual = oIndicadorActual[oIndicadorActual.length - 1].aMediciones.length - 1;
                      oIndicadorActual[oIndicadorActual.length - 1].aMediciones[indexIndicadorActual].valores.push(valoractual == "" ? 0 : convertToNumber(valoractual));

                    }


                  }


                  //} se quitan nulos
                  //se ingresan los otros valores

                }
                else {
                  //se agregan todo lo que no son indicadores
                  indexHeaders = parseInt(cell.col) - 1;
                  if ((cell.value).trim() != "") {

                    if (parseInt(cell.col) == 3) { //procedimiento
                      aData._procedimientos.push(
                        {
                          "nombre_procedimiento": (cell.value).trim(),
                          "formato_asociado": [],
       
                        }
                      )
                    }
                    else if (parseInt(cell.col) == 4) { //ruta procedimiento

                      aData._procedimientos[aData._procedimientos.length - 1].ruta_procedimiento = (cell.value).trim()
                    }

                    else if (parseInt(cell.col) == 5) { //nombre procedimiento asociado


                      let aNombresProcAso = (cell.value).trim().split("\n");
                      for (var i in aNombresProcAso) {
                        aData._procedimientos[aData._procedimientos.length - 1].formato_asociado.push
                          (
                            { "nombre_formato_asociado": aNombresProcAso[i] }
                          )
                      }

                    }
                    else if (parseInt(cell.col) == 6) { //ruta procedimiento asociado

                      let aRutaProcAso = (cell.value).trim().split("\n");
                      for (var i in aRutaProcAso) {
                        aData._procedimientos[aData._procedimientos.length - 1].formato_asociado[i].ruta_procedimiento_asociado = aRutaProcAso[i];
                      }
                      //let indexUltimaPos=aData._procedimientos[aData._procedimientos.length-1].formato_asociado.length-1;
                    }
                    else if (parseInt(cell.col) == 7) { //nombre instructivo 

                      aData._instructivo.push(
                        {
                          "nombre_instructivo": (cell.value).trim(),
                          "formato_asociado": [],

                        }
                      )

     

                    }
                    else if (parseInt(cell.col) == 8) { //ruta instructivo 

                      aData._instructivo[aData._instructivo.length - 1].ruta_instructivo = (cell.value).trim()
                    }

                    else if (parseInt(cell.col) == 9) { //nombre formato asociado instructivo

                      let aNombresInsForAso = (cell.value).trim().split("\n");
                      for (var i in aNombresInsForAso) {
                        aData._instructivo[aData._instructivo.length - 1].formato_asociado.push
                          (
                            { "nombre_formato_asociado": aNombresInsForAso[i] }
                          )
                      }

                    }
                    else if (parseInt(cell.col) == 10) { //ruta formato asociado instructivo

                      let aRutaInsFormAso = (cell.value).trim().split("\n");
                      for (var i in aRutaInsFormAso) {
                        aData._instructivo[aData._instructivo.length - 1].formato_asociado[i].ruta_formato_asociado = aRutaInsFormAso[i];
                      }

                    }
                    else {
                      aData[aHeaders[indexHeaders]].push((cell.value).trim());
                    }

                  }




                }
                //console.log(aData);



                if (cell.value.trim() == "") {
                  romperCiclo++;
                }
              }

              //console.log(`${cell.row},${cell.col}: ${cell.value}`);
              if (romperCiclo == totalColumnas) { //si toda una  fila es vacia se rompe el ciclo porque no hay manera de saber las columnas totales
                let cabecera = aHeaders[indexCorteAnios];
                let totalElementos = aData[cabecera].length - 1;
                let ultimoElemento = aData[cabecera][totalElementos].aMediciones.length - 1;

                //al final se agregan espacios vacios porque se detiene el ciclo, con esto se eliminan esos valores
                if (multipleMediciones) {
                  aData[cabecera][totalElementos].aMediciones.splice(aAnios.length, aAnios.length + 1);
                  //aData[cabecera][totalElementos].aMedicionUnica=[];
                  //se borra también la amedicionunica porque por defecto se llena de valores nulos
                  //aData[cabecera][totalElementos].aMedicionUnica.splice(0,aAnios.length+1)

                }
                else {
                  if (aData[cabecera][totalElementos].aMedicionUnica.length == aAnios.length) {
                    aData[cabecera][totalElementos].aMedicionUnica.length = [];
                  }
                  else {
                    aData[cabecera][totalElementos].aMedicionUnica.splice(aAnios.length, aAnios.length + 1);

                  }
                  //aData[cabecera][totalElementos].aMediciones=[];
                }

                aData
                break;
              }
              //aDataMatriz[index].push();
            }

            aData.aAnios = aAnios;
            //TODO se crean y no hacen nada, no confundirllos con os que estan dentro de procedimientos
            delete aData["_formato_asociado"];
            delete aData["_instructivo_asociado"];
            delete aData["_formato_asociado_instructivo"];

            delete aData["_ruta procedimiento"];
            delete aData["_formato asociado proc ruta"];
            delete aData["_instructivo ruta"];

            fs.writeFileSync("data/"+fileName + ".json", JSON.stringify(aData, null, 4), 'utf8');

            //console.log(aData);
            console.log(aAnios);
            //console.log(cells[24].value);
            iContadorSheet++;
            recurringFunc();
          }) //get cell
      }//if length
    }//fin funcion recursiva
    recurringFunc();
  });//doc.getInfo


});//doc.useServiceAccountAuth
