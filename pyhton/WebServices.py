import requests
from html.parser import HTMLParser
import re
session = requests.Session()
aLemma=[]
import csv



class BExtractor(HTMLParser):
    def __init__(self, *args, **kwargs):
        super(BExtractor, self).__init__(*args, **kwargs)
        self.is_b = True

    def handle_starttag(self, tag, attrs):
        if tag == "b":
            self.is_b = True

    def handle_endtag(self, tag):
            self.is_b = False

    def handle_data(self, data):
        if self.is_b:
            aLemma.append(data)
            print(data)
            

with open("mycsv.csv", "r") as rfh:
    r = csv.DictReader(rfh)
    for row in r:
        print(r)    
    with open("mycsv.csv", "a") as wfh:


#
#peticionId=requests.get("http://cartago.lllf.uam.es/grampal/grampal.cgi")
#respuestaId=peticionId.text
#getId=re.search('name="csrf" value="(.+)?"',respuestaId)[1]
#print(getId)

getId=session.get('http://cartago.lllf.uam.es/grampal/grampal.cgi')
cookie=session.cookies.get_dict()
getId=session.cookies.get_dict()
getId=getId["CGISESSID"]
texto="factura"
getLemma=requests.get("http://cartago.lllf.uam.es/grampal/grampal.cgi?m=analiza&csrf="+getId+"&e="+texto, cookies=cookie)
respuestaLemma=getLemma.text
print(respuestaLemma)
#parser.feed(respuestaLemma)
getId=re.search('name="csrf" value="(.+)?"',respuestaLemma)[1]

aLemma = re.findall(r'<span style="font-weight:bold">(.*?)<', respuestaLemma)

print(fn_limpiarPalabra(aLemma,texto))


def fn_limpiarPalabra(palabra,  palabra_original):
    json_palabra={"lemma":palabra[0], "categoria":palabra[1],palabra_original:palabra_original}
    return json_palabra
#texto2="mi mamá me mima mucho en el rio"
#aLemma=[]
#getLemma=requests.get("http://cartago.lllf.uam.es/grampal/grampal.cgi?m=etiqueta&csrf="+getId+"&e="+texto2, cookies=cookie)
#respuestaLemma=getLemma.text
#parser.feed(respuestaLemma)
#getId=re.search('name="csrf" value="(.+)?"',respuestaLemma)[1]
#
#print(aLemma)

#
#string= '<input type="hidden" name="csrf" value="7629b234d1cc2f2a5383f5e6d7dc6bd2">'
#m = re.search('name="csrf" value="(.+)?"',string)[1]
#print(m)