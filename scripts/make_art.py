#!/usr/bin/env python3
"""Creates original app icon / TV banner from the vector mascot inside app.js."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path
import re, io, random
import cairosvg
ROOT=Path(__file__).resolve().parents[1]
ASSETS=ROOT/'app/src/main/res/drawable-nodpi';ASSETS.mkdir(parents=True,exist_ok=True)
JS=(ROOT/'app/src/main/assets/app.js').read_text()
svg=re.search(r'return `(<svg class="dragon".*?</svg>)`;',JS,re.S).group(1)
svg=svg.replace('<svg class="dragon"','<svg xmlns="http://www.w3.org/2000/svg" class="dragon"')
font='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'

def dragon(size):
    result=cairosvg.svg2png(bytestring=svg.encode(),output_width=size,output_height=size)
    return Image.open(io.BytesIO(result)).convert('RGBA')

def background(w,h):
    im=Image.new('RGB',(w,h));pix=im.load()
    for y in range(h):
      for x in range(w):
        blend=(x/w*.35+y/h*.4)
        pix[x,y]=(int(11+46*blend),int(25+48*blend),int(62+102*blend))
    d=ImageDraw.Draw(im,'RGBA');random.seed(20)
    for i in range(35):
      x=random.randrange(0,w);y=random.randrange(0,h);r=random.randint(2,max(3,w//190));d.ellipse((x-r,y-r,x+r,y+r),fill=(254,242,181,random.randrange(75,185)))
    return im

icon=background(512,512).convert('RGBA');d=ImageDraw.Draw(icon,'RGBA')
d.ellipse((38,41,476,479), fill=(62,92,169,155),outline=(161,219,255,180),width=8)
mascot=dragon(460);icon.alpha_composite(mascot,(28,34))
d.rounded_rectangle((170,409,345,486),radius=22,fill=(255,214,120,247),outline=(255,246,213,255),width=5)
f=ImageFont.truetype(font,35);d.text((257,443),'ABC',anchor='mm',fill=(45,50,91,255),font=f)
icon.save(ASSETS/'app_icon.png',optimize=True)

banner=background(1280,720).convert('RGBA');d=ImageDraw.Draw(banner,'RGBA')
d.rounded_rectangle((45,56,1235,662),radius=60,fill=(48,73,138,220),outline=(158,198,255,170),width=5)
d.ellipse((810,70,1210,470),fill=(251,225,139,43))
mascot=dragon(495);banner.alpha_composite(mascot,(767,143))
for text,y,sz,color in [('DRAGON',163,104,(252,227,147)),('READING',285,103,(255,255,255)),('QUEST',411,105,(128,232,217))]:
    d.text((108,y),text,font=ImageFont.truetype(font,sz),fill=color,stroke_width=2,stroke_fill=(19,37,86))
d.text((116,564),'A PHONICS ADVENTURE FOR LITTLE READERS',font=ImageFont.truetype(font,23),fill=(214,232,255))
banner.save(ASSETS/'tv_banner.png',optimize=True)
# Marketing banner for later release pages
banner.save(ROOT/'FireTV-Banner-1280x720.png',optimize=True)
print('Wrote icon and TV banner')
