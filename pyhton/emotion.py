import spacy

import nltk
#recorta texto por puntuación
#from nltk.tokenize import sent_tokenize
#tokeniza el texto
from nltk.tokenize import word_tokenize
#corpus español stopwords
from nltk.corpus import stopwords
#raiz de palabras
#from nltk.stem import SnowballStemmer
# ver lenguajes disponibles print(SnowballStemmer.languages)

#usar dicccionario de  WordNet
from nltk.stem import WordNetLemmatizer

#print(set(stopwords.words('Spanish')))
aStopWords={'porque', 'estuviésemos', 'estuviesen', 'tenidos', 'teníais', 'hay', 'fui', 'tenéis', 'seáis', 'habrá', 'en', 'estuviste', 'sí', 'las', 'tenida', 'vuestras', 'del', 'tendrías', 'tendríais', 'estoy', 'todos', 'que', 'tuvimos', 'donde', 'estuvieron', 'sea', 'tuvierais', 'sentidas', 'me', 'tú', 'sean', 'hubieras', 'unos', 'seríais', 'ni', 'no', 'estará', 'tendrán', 'estuvimos', 'hube', 'tuvieron', 'con', 'mí', 'estaríamos', 'he', 'serían', 'ya', 'habría', 'habidos', 'ellos', 'estas', 'habremos', 'estuvieses', 'tenido', 'algo', 'tendremos', 'hubo', 'fuéramos', 'tuyo', 'te', 'míos', 'estar', 'estarías', 'teníamos', 'tuvo', 'tendréis', 'se', 'habré', 'la', 'tanto', 'serías', 'seremos', 'habréis', 'otro', 'un', 'más', 'tuviste', 'nuestros', 'tendrá', 'tuviese', 'ha', 'tenemos', 'estaba', 'tendré', 'pero', 'estábamos', 'los', 'has', 'suyos', 'esta', 'está', 'sentida', 'tuvieses', 'fueran', 'tienes', 'tienen', 'os', 'hayan', 'sin', 'fuesen', 'estuviera', 'sobre', 'sintiendo', 'habías', 'estuvo', 'sentidos', 'él', 'nuestro', 'fuiste', 'teniendo', 'serán', 'tuyos', 'tenías', 'estos', 'fuésemos', 'eres', 'estabas', 'al', 'soy', 'tuve', 'y', 'mi', 'tenga', 'tendríamos', 'yo', 'esa', 'quienes', 'tuvieseis', 'otra', 'ella', 'tu', 'habido', 'tened', 'seré', 'estuviéramos', 'su', 'les', 'estéis', 'somos', 'estaré', 'habida', 'vuestros', 'tuya', 'siente', 'esto', 'hubiésemos', 'estén', 'sería', 'hubiera', 'tuviesen', 'le', 'estuvieras', 'éramos', 'tengamos', 'hubiese', 'habíamos', 'fueras', 'haya', 'estamos', 'hubiste', 'eras', 'ti', 'tuviéramos', 'fue', 'había', 'estuviese', 'tuvisteis', 'estarás', 'fuimos', 'hemos', 'mucho', 'ellas', 'estado', 'esos', 'hubiéramos', 'durante', 'estaréis', 'algunas', 'fuese', 'tendrían', 'qué', 'tengáis', 'estuvieran', 'mía', 'hubimos', 'hasta', 'habíais', 'erais', 'seríamos', 'algunos', 'estuvisteis', 'otras', 'estando', 'hayas', 'habrás', 'seamos', 'o', 'fuera', 'mío', 'esas', 'quien', 'e', 'fueseis', 'estaremos', 'estadas', 'estada', 'han', 'fueron', 'una', 'sus', 'entre', 'seréis', 'hubieseis', 'son', 'de', 'el', 'sentid', 'suya', 'tuyas', 'vosostros', 'era', 'estemos', 'hayáis', 'vuestro', 'habiendo', 'es', 'seas', 'a', 'eso', 'habidas', 'nuestra', 'tengas', 'habrán', 'ante', 'también', 'nosotros', 'estuve', 'tengo', 'hubiesen', 'estados', 'hubieron', 'poco', 'fueses', 'estaría', 'otros', 'tendría', 'estabais', 'tenía', 'estuvieseis', 'están', 'mías', 'nos', 'estarían', 'nada', 'cuando', 'estáis', 'hubieran', 'nosotras', 'nuestras', 'estaban', 'vosostras', 'uno', 'fuerais', 'serás', 'estaríais', 'habríais', 'antes', 'muchos', 'tengan', 'mis', 'por', 'tendrás', 'sois', 'lo', 'tuviera', 'muy', 'como', 'hubierais', 'contra', 'será', 'estarán', 'hubisteis', 'hubieses', 'ese', 'todo', 'eran', 'desde', 'habían', 'tiene', 'tus', 'este', 'sentido', 'estés', 'esté', 'suyas', 'tenían', 'suyo', 'hayamos', 'vuestra', 'habrías', 'cual', 'estás', 'estuvierais', 'para', 'fuisteis', 'estad', 'tenidas', 'tuviésemos', 'habríamos', 'habéis', 'habrían', 'tuvieras', 'tuvieran'}
#print(aStopWords)
texto='esto es un texto de prueba. MR.Smith por favor entienda la prueba, por favor.'

#separar el texto, en tokens

#tokens = [t for t in texto.split()]
#print (tokens)

print(word_tokenize(texto,"spanish"))

raiz_palabra = SnowballStemmer('spanish')
 
print(raiz_palabra.stem("fdsfsdfdsfs"))


nlp = spacy.load('es_core_news_md')  # same behaviour with spacy.blank('es')

text1 = "Con estos fines, la Dirección de Gestión y Control Financiero monitorea la posición de capital del Banco y utiliza los mecanismos para hacer un eficiente manejo del capital."
for token in nlp(text1):
    print(token.text, token.lemma_, token.pos_)

# =============================================================================
# french_stemmer = SnowballStemmer('french')
# print(french_stemmer.stem("French word"))
# =============================================================================

lemmatizer = WordNetLemmatizer('spanish')
 
print(lemmatizer.lemmatize('increases'))




#freq = nltk.FreqDist(tokens)
#contar iteraciones
#for key,val in freq.items():
#    print (str(key) + ':' + str(val))