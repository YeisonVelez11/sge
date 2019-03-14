import requests

numeroPeticiones=0
cabecera1 = {'Content-type': 'application/x-www-form-urlencoded'}
url="http://www.molinolabs.com/JaxcentServlet"
conid=77658
elementFound=9 #indica en que registro se ha guardado sumar de a 1
idregistro=5 #indica en que registro va sumar de a 1
idregistroTerminar=idregistro+1  #sumar de a 2 es para terminar la peticion
aPalabras=["correría","llegando","jugando","explorando","mejorarlo","pensé"]


def getLemma():
    global numeroPeticiones,elementFound,idregistro,idregistroTerminar
    numeroPeticiones =numeroPeticiones + 1
    elementFound=elementFound+1
    idregistro=idregistro+2
    idregistroc=str(idregistro)+"_"+aPalabras[numeroPeticiones] # este es el id de la peticion
    idregistroTerminar=idregistroTerminar+2
    idregistroTerminarc=str(idregistroTerminar)+"_undefined" 
    #palabra="_fue"
    
    #print(numeroPeticiones,elementFound,idregistro,idregistroTerminar)

    
    
    print("iniciar peticion")
    solicitud = requests.post(url, headers = cabecera1, data = {"conid":conid,"event":5})
    #print(solicitud.text)
    print("*** fin iniciar peticion***")

    print("obtener palabra")
    print("conid",conid,"elementFound",elementFound,"response",idregistroc)
    obtener_palabra=requests.post(url, headers = cabecera1, data = {"conid":conid,"elementFound":elementFound,"response":idregistroc})
    if fn_limpiarPalabra(obtener_palabra.text):
        print("extio")
    print("*** fin obtener palabra ***")

    print("finalizar_peticion")
    print("conid",conid,"response",idregistroTerminarc)
    finalizar_peticion=requests.post(url, headers = cabecera1, data = {"conid":conid,"response":idregistroTerminarc})
    #print(finalizar_peticion.text)
    if fn_limpiarPalabra(finalizar_peticion.text):
        print("extio")

    print("*** finalizar_peticion****")

    if (numeroPeticiones < 5):
        print("acaba")
        Timer(3, hello).start()


Timer(3, getLemma).start() 

def fn_limpiarPalabra(palabra):
    json_palabra={"lemma":"", "categoria":""}
    aSeparar=palabra.split("&3&3&3&")
    if len(aSeparar)>1:
        aSeparar=aSeparar[1].replace("%3B","%23")
        aSeparar=aSeparar.replace("&3&","%23")
        aSeparar=aSeparar.split("%23")
        json_palabra["lemma"]=aSeparar[0]
        json_palabra["categoria"]=aSeparar[1]
        json_palabra["categoria"]=json_palabra["categoria"].replace("+"," ")
        print(json_palabra)
        return json_palabra
    else:
        return False
    
    
    
#       print("******************************************************")
#    
#    global numeroPeticiones,elementFound,idregistro,idregistroTerminar
#    numeroPeticiones =numeroPeticiones + 1
#    elementFound=elementFound+1
#    idregistro=idregistro+2
#    idregistroc=str(idregistro)+"_"+aPalabras[numeroPeticiones] # este es el id de la peticion
#    idregistroTerminar=idregistroTerminar+2
#    idregistroTerminarc=str(idregistroTerminar)+"_undefined" 
#    #palabra="_fue"
#    
#    #print(numeroPeticiones,elementFound,idregistro,idregistroTerminar)
#    print("obtener id")
#    getIdPeticion= requests.post(url, headers = cabecera1, data = {"url":"/lematizador.html","version":"2.1.1","jaxurl":"JaxcentServlet" })
#    idPeticion=getIdPeticion.text.split("&")
#    idPeticion=idPeticion[1]
#    print("*** obtener id ***")
#
#    #print(numeroPeticiones,elementFound,idregistro,idregistroTerminar)
#    print("inicializar id")
#    print(idPeticion)
#
#    inicializarpeticon= requests.post(url, headers = cabecera1, data = {"conid":idPeticion,"load":1 })
#    print(inicializarpeticon.text)
#    print("*** inicializar id***")
#    
#    
#    print("reiniciar")
#    solicitud = requests.post(url, headers = cabecera1, data = {"conid":idPeticion,"event":5})
#    print("aqui",solicitud.text)
#    print("*** reiniciar ***")
#    
#    
#    
#    json_masivo={
#    "conid": idPeticion,
#    "elementFound": 7,
#    "response": "2_llevadero"
#    }
#    print(json_masivo)
#
#    print(" solicitud masiva ")
#    solicitudmasiva = requests.post(url, headers = cabecera1, data = json_masivo)
#    print("aqui",solicitudmasiva.text)
#    print("*** solicitud masiva***")
#
#    print("reiniciar")
#    solicitud = requests.post(url, headers = cabecera1, data = {"conid":idPeticion,"event":5})
#    print("aqui",solicitud.text)
#    print("*** reiniciar ***")
#    
#    
#
#    print("obtener palabra")
#    obtener_palabra=requests.post(url, headers = cabecera1, data = {"conid":idPeticion,"elementFound":9,"response":"3_dormir"})
#    print(obtener_palabra.text)
#    print("]*** obtener palabra ***")
#
#    print("obtener palabra")
#    obtener_palabra=requests.post(url, headers = cabecera1, data = {"conid":idPeticion,"elementFound":9,"response":"4_dormir"})
#    print(obtener_palabra.text)
#    print("]*** obtener palabra ***")
# 
#    
#    print("reiniciar")
#    solicitud = requests.post(url, headers = cabecera1, data = {"conid":idPeticion,"event":5})
#    print("aqui",solicitud.text)
#    print("*** reiniciar ***")
#    
#    print("obtener palabra")
#    obtener_palabra=requests.post(url, headers = cabecera1, data = {"conid":idPeticion,"elementFound":10,"response":"5_girar"})
#    print(obtener_palabra.text)
#    print("]*** obtener palabra ***")
#
#    print("obtener palabra")
#    obtener_palabra=requests.post(url, headers = cabecera1, data = {"conid":idPeticion,"elementFound":10,"response":"6_girar"})
#    print(obtener_palabra.text)
#    print("]*** obtener palabra ***")
#
#    print("reiniciar")
#    solicitud = requests.post(url, headers = cabecera1, data = {"conid":idPeticion,"event":5})
#    print("aqui",solicitud.text)
#    print("*** reiniciar ***")  
#    
#    print("obtener palabra")
#    obtener_palabra=requests.post(url, headers = cabecera1, data = {"conid":idPeticion,"elementFound":11,"response":"7_comer"})
#    print(obtener_palabra.text)
#    print("]*** obtener palabra ***")
#
#    print("obtener palabra")
#    obtener_palabra=requests.post(url, headers = cabecera1, data = {"conid":idPeticion,"elementFound":11,"response":"8_girar"})
#    print(obtener_palabra.text)
#    print("]*** obtener palabra ***") 
    
    
