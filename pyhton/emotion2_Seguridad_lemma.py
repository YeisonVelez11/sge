import spacy
import nltk
import csv
import json
import requests
import threading
from threading import Timer
numeroPeticiones=0
cabecera1 = {'Content-type': 'application/x-www-form-urlencoded'}
url="http://www.molinolabs.com/JaxcentServlet"
elementFound=8 #indica en que registro se ha guardado sumar de a 1
idregistro=3 #indica en que registro va sumar de a 1

aPalabras=["correría","llegando","jugando","explorando","mejorarlo","pensé"]
iPeticionWebFirstTime=0




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
        #print(json_palabra)
        return json_palabra
    else:
        return False

    


#print (json.dumps(['foo', {'bar': ('baz', None, 1.0, 2)}]))

#corpus de stopwords
#from nltk.corpus import stopwords
#stop_words =set(stopwords.words('spanish'))
aStop_words= []
with open('stopWords.csv', newline='') as File:  
    reader = csv.reader(File)
    for row in reader:
        aStop_words.append(row[0])








#tokeniza el texto
from nltk.tokenize import word_tokenize






    

texto= "yo no soy feliz ni sé donde estoy"
texto=texto.lower();
# la biblioteca de nltooklit no limpia la puntuacion
texto=texto.replace(".","")
texto=texto.replace(",","")
texto=texto.replace(").","")
texto=texto.replace("(","")

#TOKENIZAR PALABRAS
palabras_tokenizadas=(word_tokenize(texto,"spanish"))
#freq = nltk.FreqDist(palabras_tokenizadas)


vocales="aeiou"
   
for idx,palabra in enumerate(palabras_tokenizadas):
    #palabras terminadas en rle
    if palabra[-3:]=="rle":
        palabras_tokenizadas[idx]=palabra[:-2]
    #poner tilde a palabras terminas en ría que deben tener tilde ej permitiría
    elif palabra[-3:]=="ria":
        if palabra[len(palabra)-4] in vocales:
            palabras_tokenizadas[idx]=palabra[:-3]+"ría"
    # quitar rte | rme ej: comerte comerme
    elif palabra[-3:]=="rte" or palabra[-3:]=="rme":
        if palabra[len(palabra)-4] in vocales:
            palabras_tokenizadas[idx]=palabra[:-2]+"" 
          
##if first in 'aeiou'
texto=' '.join(palabras_tokenizadas)




#aFrase_sin_stopwords = []
#for word in palabras_tokenizadas:
#    if word not in aStop_words:
#     aFrase_sin_stopwords.append(word)
##print(aFrase_sin_stopwords)


nlp = spacy.load('es');
#convierte un array en un string ' '.join(new_sentence) esto lo pide nlp(text)
aFraseLematizada=[];
aLemmasOracion=[]

for idx, token in enumerate(nlp(texto)):
#for token in nlp(' '.join(aFrase_sin_stopwords)):
    #queremos que sólo me retorne las palabras, puede darse el csao que no se tokenicen algunas palabras como "de" ?de acuerdo
    if token.pos_!="PUNCT" :
            token_tmp={"texto":token.text, "lemma":token.lemma_, "tipo":token.pos_ }
            if token.pos_ == "VERB" and token.lemma_==token.text and token.lemma_[-1:]!="r":
                print("mala")
                iPeticionWebFirstTime=iPeticionWebFirstTime+1
                if iPeticionWebFirstTime==1:
                    getIdPeticion= requests.post(url, headers = cabecera1, data = {"url":"/lematizador.html","version":"2.1.1","jaxurl":"JaxcentServlet" })
                    idPeticion=getIdPeticion.text.split("&")
                    idPeticion=idPeticion[1]
                    inicializarpeticon= requests.post(url, headers = cabecera1, data = {"conid":idPeticion,"load":1 })
                    reiniciar = requests.post(url, headers = cabecera1, data = {"conid":idPeticion,"event":5})
                    json_masivo={
                    "conid": idPeticion,
                    "elementFound": 7,
                    "response": "2_llevadero"
                    }                
                    solicitudmasiva = requests.post(url, headers = cabecera1, data = json_masivo)
                    
                reiniciar = requests.post(url, headers = cabecera1, data = {"conid":idPeticion,"event":5})

                
                
                idregistroc=str(idregistro)+"_"+token.lemma_
                obtener_palabra=requests.post(url, headers = cabecera1, data = {"conid":idPeticion,"elementFound":elementFound,"response":idregistroc})
            
                idregistro=idregistro+1
                idregistroc=str(idregistro)+"_"+token.lemma_
                
                obtener_palabra=requests.post(url, headers = cabecera1, data = {"conid":idPeticion,"elementFound":elementFound,"response":idregistroc})
                #se obtiene lo necseairo del servicio y se elimina codigo basura
                lemmaService=fn_limpiarPalabra(obtener_palabra.text)
                
                if lemmaService:
                   token_tmp["lemma"]=lemmaService["lemma"]
                   token_tmp["tipo"]=lemmaService["categoria"]
#                   if token_tmp["tipo"]=="Sin catalogar":
#                       corregirPalabra=requests.post("https://languagetool.org/api/v2/check", headers = cabecera1, data = {"disabledRules": "WHITESPACE_RULE","allowIncompleteResults":True,"text":token_tmp["texto"],"language": "es"})
#                       corregirPalabra=corregirPalabra.text
#                       print(corregirPalabra.text.matches[0].replacements[0].value)
                       
                elementFound=elementFound+1
            aFraseLematizada.append(token_tmp)
            aLemmasOracion.append(token_tmp["lemma"])    
            print(token_tmp["texto"], token_tmp["lemma"], token_tmp["tipo"])

    else:
        if token.text=="!":
            aFraseLematizada.append({"texto":token.text, "lemma":token.lemma_, "tipo":token.pos_ })

aBigrama=(list(nltk.bigrams(aLemmasOracion)))
freq = nltk.FreqDist(aLemmasOracion)
#for key,val in freq.items():
#print (str(key) + ':' + str(val))
#print(palabras_tokenizadas)

#print(aFraseLematizada)STOP_WORDS
#spacy_stopwords = spacy.lang.es.stop_words.
#print(spacy_stopwords)

