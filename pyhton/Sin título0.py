

#import spacy
#pip install validators
import nltk
import csv

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


aStop_words= []
with open('stopWords.csv', newline='') as File:  
    reader = csv.reader(File)
    for row in reader:
        aStop_words.append(row[0])



csv_reader=""
operador="system"
with open('chatprueba.csv') as csv_leido:
    #ojo cambiar delimitador
    csv_reader = csv.reader(csv_leido, delimiter='|')
    line_count = 0
    column_1=0
    idOperador=1 #define el id para quien esta hablando
    with open('frec.csv', mode='w',newline='',encoding='utf-8') as frec_creado:
        fieldnames = ['column_1','ID', 'anio', 'mes', "word","n"]
        writer = csv.DictWriter(frec_creado, fieldnames=fieldnames)
        writer.writeheader()
        for row in csv_reader:
            column_1=column_1+1
            if line_count!=0:
                if row[6].lower()!=operador:
                    if(row[6].lower()==""):
                        operador=row[6].lower()
                    else: 
                        idOperador=idOperador+1
                    operador=row[6].lower() #define si actualmente es system,agent o consumer
                texto=row[7]
                texto=texto.lower();
                

                
                palabras_tokenizadas=(word_tokenize(texto,"spanish"))
                #mejorar esta parte
                palabras_tokenizadas = [ palabra for palabra in palabras_tokenizadas if palabra not in punctuation ]

                palabras_tokenizadas=[s.rstrip('.;, ') for s in palabras_tokenizadas]
                
                aFrase_sin_stopwords = []
                for word in palabras_tokenizadas:
                    if word not in aStop_words:
                     aFrase_sin_stopwords.append(word)
                palabras_tokenizadas=aFrase_sin_stopwords
                aFrase_sin_stopwords=[];
                
                freq = nltk.FreqDist(palabras_tokenizadas)
                for key,val in freq.items():
                    print (str(key) + ':' + str(val))
                    writer.writerow({'column_1': column_1, 'ID': row[3]+row[4]+str(idOperador), 'anio':row[3],'mes': row[4], "word":str(key), "n":str(val)})    
            line_count=line_count+1

        











    

