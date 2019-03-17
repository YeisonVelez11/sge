#import spacy
#pip install validators
import validators
import nltk
import csv
import json
import requests
import threading
from threading import Timer
#tokeniza el texto pero el problema es que incluye puntuacion
from nltk.tokenize import word_tokenize
numeroPeticiones=0
cabecera1 = {'Content-type': 'application/x-www-form-urlencoded'}
url="http://www.molinolabs.com/JaxcentServlet"
elementFound=8 #indica en que registro se ha guardado sumar de a 1
idregistro=3 #indica en que registro va sumar de a 1
timeout=10
#nlp = spacy.load('es');

aPalabras=["correría","llegando","jugando","explorando","mejorarlo","pensé"]
iPeticionWebFirstTime=0
vocales="aeiou"
punctuation = [",", ";", ".", "..","...", ",.", "...."] # The tokens that you want to skip



def fn_limpiarPalabra(palabra,palabra_original):
    json_palabra={"lemma":"", "categoria":""}
    aSeparar=palabra.split("&3&3&3&")
    if len(aSeparar)>1:
        aSeparar=aSeparar[1].replace("%3B","%23")
        aSeparar=aSeparar.replace("&3&","%23")
        aSeparar=aSeparar.split("%23")
        
        if len(aSeparar)>2:
          for i, item in enumerate(aSeparar):
            if aSeparar[i].lower().find("adjetiv")!=-1:
                json_palabra={ "lemma":aSeparar[0], "categoria":"Adjetivos"}
                break
            if aSeparar[i].lower().find("adjetiv")!=-1:
                json_palabra={ "lemma":aSeparar[0], "categoria":"Adjetivos"}
                break
            else:
                json_palabra["lemma"]=aSeparar[0]
                json_palabra["categoria"]=aSeparar[1]
            json_palabra["categoria"]=json_palabra["categoria"].replace("+"," ") 
            if json_palabra["categoria"].lower().find("infini")!=-1 or json_palabra["categoria"].lower().find("parti")!=-1:
                json_palabra["categoria"]="Verbos"
            elif json_palabra["categoria"].lower().find("nombre")!=-1:
                json_palabra["categoria"]="Sustantivos"
            if json_palabra["lemma"].find("%")!=-1:
                json_palabra["lemma"]=palabra_original
            json_palabra["palabra_original"]=palabra_original
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

aCorpusCiad= []


#with open('CorpusCIAD.csv', newline='') as File:  
with open('nuevo_corpus.csv', newline='') as File:  
 
    reader = csv.reader(File,delimiter='|')
    for row in reader:
        aCorpusCiad.append({"word":row[0],"score":row[1],"sub":row[2],"emotion":row[3]})

csv_reader=""
operador="system"
with open('chatprueba.csv') as csv_leido:
    #ojo cambiar delimitador
    csv_reader = csv.reader(csv_leido, delimiter='|')
    line_count = 0
    column_1=0
    idOperador=1 #define el id para quien esta hablando
    with open('sentimiento.csv', mode='w',newline='') as csv_creado:
        fieldnames = ['column_1', 'ID', 'aux1', "anio","mes","word1","word2","score","sentimiento"]
        writer = csv.DictWriter(csv_creado, fieldnames=fieldnames)
        writer.writeheader()
        for row in csv_reader:
            if line_count!=0:
                if row[6].lower()!=operador:
                    if(row[6].lower()==""):
                        operador=row[6].lower()
                    else: 
                        idOperador=idOperador+1
                    operador=row[6].lower() #define si actualmente es system,agent o consumer

                #texto= "Señor, acabamos de finalizar con la solicitud para enviarle la copia de la factura, en el menor tiempo posible le estará llegando a su correo, adicionalmente recuerde "
                texto=row[7]
                texto=texto.lower();
#                # la biblioteca de nltooklit no limpia la puntuacion

#                texto=texto.replace(".","")
#                texto=texto.replace(",","")
#                texto=texto.replace(").","")
#                texto=texto.replace("(","")
                
                #TOKENIZAR PALABRAS
                palabras_tokenizadas=(word_tokenize(texto,"spanish"))
                #mejorar esta parte
                palabras_tokenizadas = [ palabra for palabra in palabras_tokenizadas if palabra not in punctuation ]

                palabras_tokenizadas=[s.rstrip('.;, ') for s in palabras_tokenizadas]
 



               
               
                #manera de eliminar caracteres a partir de un array
                #palabras_tokenizadas = [ palabra for palabra in palabras_tokenizadas if palabra not in punctuation ]
                
                #freq = nltk.FreqDist(palabras_tokenizadas)
#                for idx,palabra in enumerate(palabras_tokenizadas):
#                    #palabras terminadas en rle
#                    if palabra[-3:]=="rle":
#                        palabras_tokenizadas[idx]=palabra[:-2]
#                    #poner tilde a palabras terminas en ría que deben tener tilde ej permitiría
#                    elif palabra[-3:]=="ria":
#                        if palabra[len(palabra)-4] in vocales:
#                            palabras_tokenizadas[idx]=palabra[:-3]+"ría"
#                    # quitar rte | rme ej: comerte comerme
#                    elif palabra[-3:]=="rte" or palabra[-3:]=="rme":
#                        if palabra[len(palabra)-4] in vocales:
#                            palabras_tokenizadas[idx]=palabra[:-2]+"" 
                          
                ##if first in 'aeiou'
                texto=' '.join(palabras_tokenizadas)

                
                
                #quitando stopwords
                aFrase_sin_stopwords = []
                for word in palabras_tokenizadas:
                    if word not in aStop_words:
                     aFrase_sin_stopwords.append(word)
                texto=' '.join(aFrase_sin_stopwords)
                #print(aFrase_sin_stopwords)
                
                print(aFrase_sin_stopwords)

                
                #convierte un array en un string ' '.join(new_sentence) esto lo pide nlp(text)
                aFraseLematizada=[];
                aLemmasOracion=[]
                
                for token in aFrase_sin_stopwords:
                    aLemmasOracion.append(token)    
                aBigrama=(list(nltk.bigrams(aLemmasOracion)))

                for idx,bigrama in enumerate(aBigrama):
                    column_1=column_1+1
                    #escribinedo palabra
                    #print(idx, " ", bigrama, " ", idOperador)
                    for corp in aCorpusCiad:
                        sub="Deconocida"
                        emotion="Deconocida"
                        score="0"
                        negacion=0
                        if corp["word"]==aBigrama[idx][1]:
                            sub=corp["sub"]
                            emotion=corp["emotion"]
                            score=int(corp["score"])
                            if score>0:
                                sentimiento="positivo"
                            elif score==0:
                                sentimiento="neutro"
                            else:
                                sentimiento="negativo"
                            break
                        else:
                            score=-0
                            sentimiento="sin catalogar"
                            
#                            #negaciones
#                            if score=="6":
#                                negacion=1 #se usa para corroborar  si hubo una negación
#                                #para afectar la siguiente fila, entonces se sumará de a 1 para evitar afectarseen la siguiente iteracion para cuando sea 2 se reinicie
#                                # hola, nadie aqui se sabe que se niega negacion=1
#                                #nadie, ayudar en esta iteraicon será 2 entonces se debe reiniciar 
#                            break
#                            #print(corp["word"], " == ",aBigrama[idx][1])
#                            #print(sub, emotion)
#                    if negacion==2 and emotion.lower()=="sorpresa":
#                        sub="Descontento"
#                        emotion="Enfado"
#                        negacion=0
#
#                    elif negacion==2 and emotion.lower()=="enfado":
#                        sub="Feliz"
#                        emotion="Alegría"
#                        negacion=0
#
#                    elif negacion==2 and emotion.lower()=="alegría":
#                        sub="Molesto"
#                        emotion="Enfado"                            
#                        negacion=0
#
#                    elif negacion==2 and emotion.lower()=="tristeza":
#                        sub="Alegre"
#                        emotion="Alegría" 
#                        negacion=0
#                        
#                    elif negacion==2 and emotion.lower()=="confianza":
#                        sub="Aterrado"
#                        emotion="Miedo"
#                        negacion=0
#                    elif negacion==2 and emotion.lower()=="miedo":
#                        sub="Confianza"
#                        emotion="Seguridad"   
#                    negacion=negacion+1
                            
                            
                            
                    writer.writerow({'column_1': column_1, 'ID': row[3]+row[4]+str(idOperador), 'aux1': idOperador,'anio':row[3],'mes': row[4], "word1":aBigrama[idx][0],"word2":aBigrama[idx][1],"score":score,"sentimiento":sentimiento})    
            line_count=line_count+1

        
