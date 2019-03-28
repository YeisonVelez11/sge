# -*- coding: utf-8 -*-
"""
Created on Tue Mar 26 15:57:36 2019

@author: usuario
"""

#import spacy
#pip install validators
import nltk
import csv
import requests
import re
import json
import sys
import fileinput
from bs4 import BeautifulSoup


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
    aLineaNuevoCorpus=[]
    for idx,key in enumerate(lineaCorpus.keys()): 
        linea=lineaCorpus[key].strip()
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
    elif categoria.lower()=="intj":
        categoria="Interjección" 
    elif categoria.lower()=="md":
        categoria="Marcador Discursivo"  
    elif categoria.lower()=="c":
            categoria="Conjunción"           
    #q es cantidad
    elif categoria.lower()=="q" or categoria.lower()=="adv":
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
        elif categoria.lower()=="q" or categoria.lower()=="adv":
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
aCorpusCiad= []
corpusCiad='nuevo_corpus.csv'
delimitadorCorpus="|"
#with open('CorpusCIAD.csv', newline='') as File:  
with open(corpusCiad, newline='') as File:  
    reader = csv.reader(File,delimiter=delimitadorCorpus)
    for row in reader:
        aCorpusCiad.append({"word":row[0],"score":row[1],"sub":row[2],"emotion":row[3] })
File.close()


csv_reader=""
operador="system"



with fileinput.input(corpusCiad, inplace=True) as f:
    for line in f:
        if f.lineno()!=(0) and f.lineno()!=(1):
            split=line.split(delimitadorCorpus)
            corp={"word":split[0].lower()}
            iPeticionWebFirstTime=iPeticionWebFirstTime+1
            token_tmp={}
            if iPeticionWebFirstTime==1:
                #petición web para alimentar el corpus
                session = requests.Session()
                getId=session.get('http://cartago.lllf.uam.es/grampal/grampal.cgi')
                cookie=session.cookies.get_dict()
                getId=session.cookies.get_dict()
                getId=getId["CGISESSID"]

            getLemma=requests.get("http://cartago.lllf.uam.es/grampal/grampal.cgi?m=analiza&csrf="+getId+"&e="+corp["word"], cookies=cookie)
            respuestaLemma=getLemma.text
            getId=re.search('name="csrf" value="(.+)?"',respuestaLemma)[1]
            soup = BeautifulSoup(respuestaLemma,features="lxml")
            spans = soup.find_all("span",attrs={'style':"font-weight:bold"})
            aLemma=[]
            for idx,span in enumerate(spans):
                aLemma.append(spans[idx].text)  
            #verificar que sea una url valida
            #para no tener que mover mucho el codigo, esta bandera indica si no es una palabra valida, no se agregue el elemento
            omitirPalabra=False
            lemmaService=fn_limpiarPalabra(aLemma,corp["word"])
    
            corp["word"]=lemmaService["palabra_original"]
            corp["score"]=split[1]
            corp["sub"]=split[2]
            corp["emotion"]=split[3]        
            corp["tipo_palabra"]=lemmaService["categoria"]
            corp["lemma"]=lemmaService["lemma"]
            lineaCorpus=fn_jsonToLineCsv(corp,True)
            print(lineaCorpus, end='\n') 

#
#with open(corpusCiad, "r") as FilecorpusCiad:
#    lines = FilecorpusCiad.readlines()
#    print("corpus ciad")
#    with open(corpusCiad, "w") as FilecorpusCiad:
#        for idxcorp,corp in enumerate(aCorpusCiad):
#            encontadoCorpus=False
#            iPeticionWebFirstTime=iPeticionWebFirstTime+1
#            token_tmp={}
#            if iPeticionWebFirstTime==1:
#                #petición web para alimentar el corpus
#                session = requests.Session()
#                getId=session.get('http://cartago.lllf.uam.es/grampal/grampal.cgi')
#                cookie=session.cookies.get_dict()
#                getId=session.cookies.get_dict()
#                getId=getId["CGISESSID"]
#   
#            if idxcorp!=0:
#                print(idxcorp,corp["word"])
#
#                getLemma=requests.get("http://cartago.lllf.uam.es/grampal/grampal.cgi?m=analiza&csrf="+getId+"&e="+corp["word"], cookies=cookie)
#                respuestaLemma=getLemma.text
#                getId=re.search('name="csrf" value="(.+)?"',respuestaLemma)[1]
#                aLemma = re.findall(r'<span style="font-weight:bold">(.*?)<', respuestaLemma)
#                #verificar que sea una url valida
#                #para no tener que mover mucho el codigo, esta bandera indica si no es una palabra valida, no se agregue el elemento
#                omitirPalabra=False                               
#                lemmaService=fn_limpiarPalabra(aLemma,corp["word"])
#
#                corp["word"]=lemmaService["palabra_original"]
#                corp["tipo_palabra"]=lemmaService["categoria"]
#                corp["lemma"]=lemmaService["lemma"]
#         data = line_to_override.get(line, row)
#         writer.writerow(data)
#                lineaCorpus=fn_jsonToLineCsv(corp,True)
#            lines.insert(int(idxcorp+1),lineaCorpus+"\n")
#        FilecorpusCiad.write(''.join(lines))                                           
#FilecorpusCiad.close()
#
#       
#
#
#
#




