var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');
// file system module to perform file operations
const fs = require('fs'); 
// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet('1FmLzv7XIxbqdqDPZky5P__5ipuhGGi8OHK2IpqijLrM');
var sheet;
var aData={};
var aHeaders=[];
var index=0;
var totalColumnas=0;
var totalFilas=0;
var romperCiclo=0;
var aAnios=[]; //muestra los años que se cargaran
var bAgregarAnios=false; //bandera que indica si debe añadir los años de las cabeceras
var indexCorteAnios=0;
// Authenticate with the Google Spreadsheets API.
doc.useServiceAccountAuth(creds, function (err) {


    doc.getInfo(function(err, info) {
      console.log('Loaded doc: '+info.title+' by '+info.author.email);
      sheet = info.worksheets[0];
      console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
      totalColumnas=sheet.colCount;

				sheet.getCells(
					{ "return-empty":true, 'max-row': 100}
			    , function(err, cells) {
	    	//console.log(cell)

			   // console.log('Cell R'+cell.row+'C'+cell.col+' = '+cell.value);
					for (const cell of cells) {
						//se obtiene las cabeceras
						if(parseInt(cell.row)==1 ){   //empieza desde 1

							if(!bAgregarAnios){  //no se agregan los años en las cabeceras
								aData['_'+(cell.value).trim()]=[];
							}

							if(bAgregarAnios && (cell.value).trim()!=""){
								aAnios.push((cell.value).trim());
							}
							if((cell.value).trim().toLowerCase()=="registro de indicadores"){
								bAgregarAnios=true;
								indexCorteAnios=parseInt(cell.col)-1
							}


						}
						if(parseInt(cell.row)==2 && parseInt(cell.col)==1){
							//extrayendo keys

							for (var i in aData){
								aHeaders.push(i);
							}

							//console.log(aHeaders);
						}




						//empieza a leer despúes de las columnas
						if(parseInt(cell.row)!=1){
							console.log("row",parseInt(cell.row)-1," col",parseInt(cell.col)-1, " ",aHeaders[parseInt(cell.col)-1]," ",cell.value);
                            //aqui se resetea a 0 romperciclo para contar cuantos hay vacios, si es igual a las columnas totales se rompe el ciclo
                            //indexcortesanios va a indicarme la posicion en que se agregaran los anios
							if(parseInt(cell.col)==1){
								romperCiclo=0;
								
							}

							if(cell.value.trim()!=""){
								let indexHeaders=0;
								//se ingresa la sección de anios
								if(indexCorteAnios<=parseInt(cell.col)-1){
									if(indexCorteAnios==parseInt(cell.col)-1 && cell.value.trim()!="" ){ //si es la primera ocurrencia, se definirá la clave una sola vez
										indexHeaders=indexCorteAnios;
										var valoractual=(cell.value).trim();
										console.log("es la primera vez")
										aData[aHeaders[indexHeaders]]
										.push(
											{
												
																		"nombre_indicador":(cell.value).trim(),
																		"aMedicionUnica":[(cell.value).trim()],
																		"aMediciones":[]
												
											}
										);
										oIndicadorActual=aData[aHeaders[indexHeaders]];


									}



									else if(cell.value.trim()!=""){
										console.log(oIndicadorActual);
										oIndicadorActual[oIndicadorActual.length-1].aMedicionUnica.push(cell.value.trim());
									}

									if(cell.value.trim()!="" && parseInt(cell.col)-1==indexCorteAnios+1){
										oIndicadorActual[oIndicadorActual.length-1].aMediciones.push(cell.value.trim())
									}
									if(cell.value.trim()!="" && parseInt(cell.col)-1>indexCorteAnios+1){
										oIndicadorActual[oIndicadorActual.length-1].aMediciones.push(cell.value.trim())
									}
									
								}
								//se ingresan los otros valores
								else{
									indexHeaders=parseInt(cell.col)-1;
									aData[aHeaders[indexHeaders]].push((cell.value).trim());

								}
							}

							if(cell.value.trim()==""){
								romperCiclo++;  
							}
						}

						console.log(romperCiclo);
					    //console.log(`${cell.row},${cell.col}: ${cell.value}`);
					    if(romperCiclo==totalColumnas){ //si toda una  fila es vacia se rompe el ciclo
					    	console.log("se rompe")
					    	break;
					    }
					    //aDataMatriz[index].push();
					}


					fs.writeFile("output.json", JSON.stringify(aData, null, 4), 'utf8', function (err) {
					    if (err) {
					        console.log("An error occured while writing JSON Object to File.");
					        return console.log(err);
					    }
					 
					    console.log("JSON file has been saved.");
					}); 

					console.log(aData);
					console.log(aAnios);
					//console.log(cells[24].value);

			  })

		/*sheet.getRows({
			      offset: 1,
      limit: 30
	    }, function( err, rows ){
	    	console.log("aqui")
	    	console.log(rows[14].nombrecaracterizacion)
	      console.log('Read '+rows.length+' rows');
	    });*/



    });


});