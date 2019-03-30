#import spacy
#pip install validators
import nltk
import csv
import requests
import re
import json
#limpia codigo html que resulta de hacer la petición web
from bs4 import BeautifulSoup
#se usa para limpiar acentos a palabras
import unicodedata

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

def strip_accents(s):
   return ''.join(c for c in unicodedata.normalize('NFD', s)
                  if unicodedata.category(c) != 'Mn')
   

def fn_checkUrl(url):
    expr=re.compile(r'((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-]*)?\??(?:[-\+=&;%@.\w]*)#?(?:[\w]*))?)')
    if expr.match(url):
        return True
    else:
        return False

#
#def fn_limpiarPalabra(palabra,palabra_original):
#    json_palabra={"lemma":"", "categoria":""}
#    aSeparar=palabra.split("&3&3&3&")
#    if len(aSeparar)>1:
#        aSeparar=aSeparar[1].replace("%3B","%23")
#        aSeparar=aSeparar.replace("&3&","%23")
#        aSeparar=aSeparar.split("%23")
#        
#        if len(aSeparar)>2:
#          for i, item in enumerate(aSeparar):
#            if aSeparar[i].lower().find("adjetiv")!=-1:
#                json_palabra={ "lemma":aSeparar[0], "categoria":"Adjetivos"}
#                break
#            if aSeparar[i].lower().find("adjetiv")!=-1:
#                json_palabra={ "lemma":aSeparar[0], "categoria":"Adjetivos"}
#                break
#            else:
#                json_palabra["lemma"]=aSeparar[0]
#                json_palabra["categoria"]=aSeparar[1]
#            json_palabra["categoria"]=json_palabra["categoria"].replace("+"," ")
#            if json_palabra["categoria"].lower().find("infini")!=-1 or json_palabra["categoria"].lower().find("parti")!=-1 or json_palabra["categoria"].lower().find("impe")!=-1:
#                json_palabra["categoria"]="Verbos"
#            elif json_palabra["categoria"].lower().find("nombre")!=-1:
#                json_palabra["categoria"]="Sustantivos"
#            if json_palabra["lemma"].find("%")!=-1:
#                json_palabra["lemma"]=palabra_original
#            json_palabra["palabra_original"]=palabra_original
#        #print(json_palabra)
#        return json_palabra
#    else:
#        return False
#recibe un json {"hola"3, "hola1":4} y lo devuelve en linea de csv para el nuevo corpus 1 | 3
def fn_jsonToLineCsv(lineaCorpus,esVacio):
    
    print(lineaCorpus)
    aLineaNuevoCorpus=[]
    for idxNC,key in enumerate(lineaCorpus.keys()): 
        linea=lineaCorpus[key].strip()
        #"no reemplazar primer valor que es la palabra"
        if(idxNC==0):
          aLineaNuevoCorpus.append(linea)
        else:
          if(esVacio):
              if idxNC!=4 and idxNC!=5:
                  aLineaNuevoCorpus.append("")
              else:
                  aLineaNuevoCorpus.append(linea)

          else:
              aLineaNuevoCorpus.append(linea)
    aLineaNuevoCorpus=str(aLineaNuevoCorpus)    

    #aLineaNuevoCorpus = aLineaNuevoCorpus[:-1]
    aLineaNuevoCorpus=aLineaNuevoCorpus.replace("'","")
    aLineaNuevoCorpus=aLineaNuevoCorpus.replace("[","")
    aLineaNuevoCorpus=aLineaNuevoCorpus.replace("]","")
    aLineaNuevoCorpus=aLineaNuevoCorpus.replace(", ",delimitadorCorpus)
    return aLineaNuevoCorpus

def fn_limpiarPalabra(palabra,  palabra_original):
    lemma=palabra[1].replace(" ","").lower()
    if lemma=="-":
        lemma=palabra_original
    categoria=palabra[0].replace(" ","")
    categoria=categoria.replace("\n","")
   
    if categoria.lower()=="n":
        categoria="Sustantivo"
    elif categoria.lower()=="v":
        categoria="Verbo"
    elif categoria.lower()=="unkn":
        categoria="Sin Catalogar"
    elif categoria.lower()=="adj":
        categoria="Adjetivo"
    elif categoria.lower()=="p":
        categoria="Pronombre"
    elif categoria.lower()=="prep":
        categoria="Preposición"  
    elif categoria.lower()=="intj":
        categoria="Interjección"    
    elif categoria.lower()=="md":
        categoria="Marcador Discursivo"  
    elif categoria.lower()=="c":
            categoria="Conjunción"              
    #q es cantidad
    elif categoria.lower()=="q":
        categoria="Adverbio"    
    elif len(categoria.lower().split("|"))>=1:
        categoria=categoria.lower().split("|")[1]
        if categoria.lower()=="n":
            categoria="Sustantivo"
        elif categoria.lower()=="v":
            categoria="Verbo"
        elif categoria.lower()=="unkn":
            categoria="Sin Catalogar"
        elif categoria.lower()=="adj":
            categoria="Adjetivo"      
        elif categoria.lower()=="q":
            categoria="Adverbio"  
        elif categoria.lower()=="p":
            categoria="Pronombre"    
        elif categoria.lower()=="prep":
            categoria="Preposición"          
        elif categoria.lower()=="intj":
            categoria="Interjección"         
        elif categoria.lower()=="md":
            categoria="Marcador Discursivo"
        elif categoria.lower()=="c":
            categoria="Conjunción"                
    json_palabra={"lemma":lemma, "categoria":categoria,"palabra_original":palabra_original}
    return json_palabra
#print (json.dumps(['foo', {'bar': ('baz', None, 1.0, 2)}]))

#corpus de stopwords
#from nltk.corpus import stopwords
#stop_words =set(stopwords.words('spanish'))
aStop_words= []
with open('stopWords.csv', newline='') as FileStopWord:  
    reader = csv.reader(FileStopWord)
    for row in reader:
        aStop_words.append(row[0])
FileStopWord.close()

corpusCiad='nuevo_corpus.csv'
delimitadorCorpus="|"
aCorpusCiad=[]
#se almacena en un array jsones con el valor de la columna y el valor
with open(corpusCiad,errors='ignore',encoding='utf-8') as File:
    reader = csv.reader(File, delimiter=delimitadorCorpus)
    header = next(reader)
    for row in reader:
        dict_row = {}
        for i,field in enumerate(header):
             #do stuff but if you want to read
             dict_row[field] = row[i]
        aCorpusCiad += [dict_row]
File.close()


csv_reader=""
operador="system"
with open('chatprueba.csv') as csv_leido:
    #ojo cambiar delimitador
    csv_reader = csv.reader(csv_leido, delimiter='|')
    line_count = 0
    column_1=0
    idOperador=1 #define el id para quien esta hablando
    with open('emocion.csv', mode='w',newline='') as csv_creado:
        fieldnames = ['column_1', 'ID', 'aux1', "anio","mes","word1","word2","score","sub","emotion"]
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
                aFrase_sin_stopwords = [" "] #primera posicion una cadena vacia para que se analicen todos los elementos del bigrama
                for word in palabras_tokenizadas:
                    if word not in aStop_words:
                     aFrase_sin_stopwords.append(word)
                texto=' '.join(aFrase_sin_stopwords)
                #print(aFrase_sin_stopwords)
               
                print(aFrase_sin_stopwords)

               
                #convierte un array en un string ' '.join(new_sentence) esto lo pide nlp(text)
                aFraseLematizada=[];
                aLemmasOracion=[]
                aElementosDucplicados=[]
                incrementoInsertados=0;

                aBigrama=(list(nltk.bigrams(aFrase_sin_stopwords)))

                for idx,bigrama in enumerate(aBigrama):

                    column_1=column_1+1
                    #escribinedo palabra
                    #print(idx, " ", bigrama, " ", idOperador)
                    for corp in aCorpusCiad:
                        sub="Deconocida"
                        emotion="Deconocida"
                        score="999"
                        negacion=0
                        token=aBigrama[idx][1]
                        palabraEncontrada=False #indica si se encontró la palabra en el corpus
                        #se quita los acentos de las palabras
                        if strip_accents(corp["word"].lower())==strip_accents(aBigrama[idx][1]):
                            sub=corp["sub"]
                            emotion=corp["emotion"]
                            score=corp["score"]
                            #negaciones
                            if score=="6":
                                negacion=1 #se usa para corroborar  si hubo una negación
                                #para afectar la siguiente fila, entonces se sumará de a 1 para evitar afectarseen la siguiente iteracion para cuando sea 2 se reinicie
                                # hola, nadie aqui se sabe que se niega negacion=1
                                #nadie, ayudar en esta iteraicon será 2 entonces se debe reiniciar
                            palabraEncontrada=True
                            break
                    if palabraEncontrada==False:
                        iPeticionWebFirstTime=iPeticionWebFirstTime+1
                        token_tmp={}
                        if iPeticionWebFirstTime==1:
                            #petición web para alimentar el corpus
                            session = requests.Session()
                            getId=session.get('http://cartago.lllf.uam.es/grampal/grampal.cgi')
                            cookie=session.cookies.get_dict()
                            getId=session.cookies.get_dict()
                            getId=getId["CGISESSID"]
       
                        getLemma=requests.get("http://cartago.lllf.uam.es/grampal/grampal.cgi?m=analiza&csrf="+getId+"&e="+token, cookies=cookie)
                        respuestaLemma=getLemma.text
                        getId=re.search('name="csrf" value="(.+)?"',respuestaLemma)[1]

                        soup = BeautifulSoup(respuestaLemma,features="lxml")
                        spans = soup.find_all("span",attrs={'style':"font-weight:bold"})
                        #se almacena el resultaod del servicio web, se obtiene el lemma y el tipo de palabra
                        aLemma=[]
                        for idxlem,span in enumerate(spans):
                            aLemma.append(spans[idxlem].text)  
                        #verificar que sea una url valida
                        #para no tener que mover mucho el codigo, esta bandera indica si no es una palabra valida, no se agregue el elemento
                        omitirPalabra=False
                        if fn_checkUrl(token):
                           token_tmp["lemma"]=token
                           token_tmp["palabra_original"]=token
                           token_tmp["tipo"]="Enlace Web"
                           omitirPalabra=False
                        #verificar que sea una palabra valida
                        elif token.isalpha()==False:
                           token_tmp["lemma"]=token
                           token_tmp["palabra_original"]=token
                           token_tmp["tipo"]="Palabra sin Catalogar"
                           token="error"
                           omitirPalabra=True
   

                        #se obtiene lo necseairo del servicio y se elimina codigo basura

   
                        if(omitirPalabra==False):
                               
                            lemmaService=fn_limpiarPalabra(aLemma,token)
                            print(lemmaService)
                            #aqui se compara si existe la palabra lematizada en el corpus para añadirla por ejemplo si estar comer y se esta buscando comeremos, se agregará despues de comer




                            with open(corpusCiad, "r",errors='ignore',encoding='utf-8') as FilecorpusCiad:
                                lines = FilecorpusCiad.readlines()
                                for idxcorp,corp in enumerate(aCorpusCiad):
                                    encontadoCorpus=False
                                    #se encuentra una palabra que no exista antes por medio de su lemma
                                    if strip_accents(corp["word"].lower())==strip_accents(lemmaService["lemma"]):
                                        encontadoCorpus=True
                                        print("encontrado-->",corp,idxcorp, "\n")
                                        oLineaCorpusEncontrado=corp
                                        #json.dumps(oLineaCorpusEncontrado)
                                        break
     
                                
                                #este es el camino para leer y escribir al mismo tiempo
                                #en esta parte como no se encontró la palabra se verifica si existe en el corpus alguna variacion agregandola al lado de su variación o al final
                               
                                #si no se encuentra en el corpus
                                if(encontadoCorpus==False):

                                    print("palabra no encontrada ",lemmaService["palabra_original"]+ "\n")
                                    if lemmaService["palabra_original"] not in aElementosDucplicados:
                                            #se agrega la última fila
                                            corp["word"]=lemmaService["palabra_original"]
                                            corp["lemma"]=lemmaService["lemma"]
                                            corp["tipo_palabra"]=lemmaService["categoria"]

                                            aElementosDucplicados.append(corp["word"])
    
                                            lineaCorpus=fn_jsonToLineCsv(corp,True)
                                            #se agrega dos veces, el lema y la frase que ese esta buscando siempre y cuando tengan una categoria valida adj,sustantivo, etc
                                            if(lemmaService["categoria"].lower()!="sin catalogar"):
                                                with open(corpusCiad, "w",encoding='utf-8') as FilecorpusCiad:
                                                    print("AQUI1",idxcorp,lemmaService["palabra_original"],"\n")
                                                    incrementoInsertados=incrementoInsertados+1;
                                                    lines.insert(int(idxcorp+2+incrementoInsertados),lineaCorpus+"\n")
                                                    corp["word"]=lemmaService["lemma"]
                                                    corp["lemma"]=lemmaService["lemma"]
                                                    corp["tipo_palabra"]=lemmaService["categoria"]
                                                    
                                                    aElementosDucplicados.append(corp["word"])
        
                                                    if(lemmaService["palabra_original"]!=lemmaService["lemma"]):
                                                        incrementoInsertados=incrementoInsertados+1;
                                                        lineaCorpus=fn_jsonToLineCsv(corp,True)
                                                        lines.insert(int(idxcorp+2+incrementoInsertados),lineaCorpus+"\n")
                                            
                                                    FilecorpusCiad.write(''.join(lines))  
                                                FilecorpusCiad.close()
                                            else:
                                                print("AQUI4",idxcorp,lemmaService["palabra_original"],"\n")
                                                with open(corpusCiad, "w",encoding='utf-8') as FilecorpusCiad:
                                                    incrementoInsertados=incrementoInsertados+1;
                                                    lines.insert(int(idxcorp+2+incrementoInsertados),lineaCorpus+"\n")
                                                    corp["word"]=lemmaService["lemma"]
                                                    aElementosDucplicados.append(corp["word"])
                                                    FilecorpusCiad.write(''.join(lines))  
                                                FilecorpusCiad.close()                             
                                    #si es una palabra desconocida se agrega una sola vez 

#                                        with open(corpusCiad, "w",encoding='utf-8') as FilecorpusCiad:
#
#                                            incrementoInsertados=incrementoInsertados+1;
#                                            lines.insert(int(idxcorp+2+incrementoInsertados),lineaCorpus+"\n")
#                                            FilecorpusCiad.write(''.join(lines))  
#                                            aElementosDucplicados.append(corp["word"])
#                                            print("AQUI2",idxcorp,lemmaService["palabra_original"],"\n")
#
#
#                                        FilecorpusCiad.close()
                                else:

                                    
                                    with open(corpusCiad, "w",encoding='utf-8') as FilecorpusCiad:
                                        print("AQUI3",idxcorp,lemmaService["palabra_original"],"\n")
  
                                        incrementoInsertados=incrementoInsertados+1;
                                        aElementosDucplicados.append(lemmaService["palabra_original"])
                                        oLineaCorpusEncontrado["word"]=lemmaService["palabra_original"]
                                        lineaCorpus=fn_jsonToLineCsv(oLineaCorpusEncontrado,False)
                                        lines.insert(int(idxcorp+2), lineaCorpus+"\n")
                                        FilecorpusCiad.write(''.join(lines))
                                    FilecorpusCiad.close()



                            if lemmaService:
                               token_tmp["lemma"]=lemmaService["lemma"]
                               token_tmp["tipo"]=lemmaService["categoria"]
                               token_tmp["palabra_original"]=token
   
            #                   if token_tmp["tipo"]=="Sin catalogar":
            #                       corregirPalabra=requests.post("https://languagetool.org/api/v2/check", headers = cabecera1, data = {"disabledRules": "WHITESPACE_RULE","allowIncompleteResults":True,"text":token_tmp["texto"],"language": "es"})
            #                       corregirPalabra=corregirPalabra.text
            #                       print(corregirPalabra.text.matches[0].replacements[0].value)
                            else:
                               token_tmp["lemma"]=token
                               token_tmp["tipo"]="sin catalogar"
                        #********print(token_tmp)      
                        #aFraseLematizada.append(token_tmp)
                        #aLemmasOracion.append(token_tmp["palabra_original"])
   
                                #print(token_tmp["texto"], token_tmp["lemma"], token_tmp["tipo"])    
                       
                        #print(corp["word"], " == ",aBigrama[idx][1])
                        #print(sub, emotion)
                    if negacion==2 and emotion.lower()=="sorpresa":
                        sub="Descontento"
                        emotion="Enfado"
                        negacion=0

                    elif negacion==2 and emotion.lower()=="enfado":
                        sub="Feliz"
                        emotion="Alegría"
                        negacion=0

                    elif negacion==2 and emotion.lower()=="alegría":
                        sub="Molesto"
                        emotion="Enfado"                            
                        negacion=0

                    elif negacion==2 and emotion.lower()=="tristeza":
                        sub="Alegre"
                        emotion="Alegría"
                        negacion=0
                       
                    elif negacion==2 and emotion.lower()=="confianza":
                        sub="Aterrado"
                        emotion="Miedo"
                        negacion=0
                    elif negacion==2 and emotion.lower()=="miedo":
                        sub="Confianza"
                        emotion="Seguridad"  
                    negacion=negacion+1
                    writer.writerow({'column_1': column_1, 'ID': row[3]+row[4]+str(idOperador), 'aux1': idOperador,'anio':row[3],'mes': row[4], "word1":aBigrama[idx][0],"word2":aBigrama[idx][1],"score":score, "sub":sub, "emotion":emotion})    
            line_count=line_count+1
    csv_creado.close()
       








