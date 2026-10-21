#!/usr/bin/env python3
"""Regenerate the 100% offline placeholder teaching narration (requires espeak, ffmpeg, pydub).

Important: these are synthetic practice voices, not human-recorded phonics audio.
Review each isolated consonant/vowel recording with a phonics instructor before classroom use.
Replace audio/ clips with a human voice if preferred; filenames are the public contract.
"""
import re, subprocess, tempfile, pathlib, shutil
from pydub import AudioSegment
ROOT=pathlib.Path(__file__).resolve().parents[1]
OUT=ROOT/'app/src/main/assets/audio'; OUT.mkdir(parents=True,exist_ok=True)
SOUNDS={
 's':'s:','a':'a','t':'t','m':'m:','p':'p','i':'I','n':'n:',
 'd':'d','o':'0','g':'g','c':'k','k':'k','e':'E','r':'r','h':'h',
 'b':'b','f':'f:','l':'l:','u':'V','v':'v:','w':'w','j':'dZ','z':'z:',
 'y':'j','x':'ks','qu':'kw','sh':'S:','ch':'tS','th':'T','ck':'k','wh':'w'
}
WORDS='sat sit pin tap nap cat dog cap hen red map pan bat fan jam fin dig tip kid lip pot mop log top dot pet ten bed pen net sun bug cup mud run box fox yes six wax ship shop chin chat duck I a the is to my'.split()
LINES=[
 ['Sam can pet a cat.','The cat sat.','Sam sat on a mat.','The cat can nap.'],
 ['A big bug is on a log.','The bug can hop.','The bug is in the mud.','The bug can run!'],
 ['The hen is red.','The hen is in a pen.','The hen can get a bug.','The hen can nap.']
]
PHRASES={
 'welcome':'Welcome, reader! Pip the dragon is ready for your reading adventure.',
 'locked':'That lesson is locked. Keep learning to unlock it!',
 'lesson_intro':"Let's learn and read together!",
 'story_intro':"Let's read a story together. Try each line, and press to hear it.",
 'story_question':'Great reading! Listen carefully and choose an answer.',
 'find_sound':"Listen carefully. Find this sound.",
 'read_word':"Read the word. Sound out each letter, then blend them together.",
 'spell_word':"Listen, then put the letter sounds together to spell the word.",
 'correct':"You got it! Super reading!",
 'try_again':"Good try! Listen, then try again.",
 'completed':"Hooray! You finished the lesson! What a great reader!"
}

def wave(text,path,speed=130,pitch=62,phoneme=False):
    q='[['+text+']]' if phoneme else text
    subprocess.run(['espeak','-v','en-us+f3','-s',str(speed),'-p',str(pitch),'-a','160','-w',str(path),q],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)

def mp3(audio,key):
    if not re.fullmatch(r'[a-z0-9_]+',key):raise ValueError(key)
    audio=audio.set_channels(1).set_frame_rate(22050)
    audio.export(OUT/(key+'.mp3'),format='mp3',bitrate='64k',parameters=['-ar','22050'])

with tempfile.TemporaryDirectory() as temp:
    tmp=pathlib.Path(temp)
    for key,t in PHRASES.items():
        wav=tmp/(key+'.wav');wave(t,wav);mp3(AudioSegment.from_wav(wav),key)
    wav=tmp/'prompt.wav';wave(PHRASES['find_sound'],wav)
    prompt=AudioSegment.from_wav(wav)
    for l,ph in SOUNDS.items():
        wav=tmp/('s_'+l+'.wav');wave(ph,wav,speed=110,pitch=65,phoneme=True)
        a=AudioSegment.from_wav(wav)
        # Replay short consonants with a little air between them so they are identifiable.
        if len(a)<470:a=a+AudioSegment.silent(duration=150)+a
        mp3(a,'sound_'+l)
        mp3(prompt+AudioSegment.silent(duration=230)+a,'find_'+l)
        if len(l)==1: shutil.copyfile(OUT/('sound_'+l+'.mp3'),OUT/('tile_'+l+'.mp3'))
    for w in sorted(set(WORDS)):
        wav=tmp/('w_'+w.lower()+'.wav');wave(w,wav,speed=126,pitch=61)
        mp3(AudioSegment.from_wav(wav),'word_'+w.lower())
    for i,lines in enumerate(LINES):
        for j,line in enumerate(lines):
            wav=tmp/(f'story_{i}_{j}.wav');wave(line,wav,speed=118,pitch=57)
            mp3(AudioSegment.from_wav(wav),f'story_{i}_{j}')
print('Generated', len(list(OUT.glob('*.mp3'))),'offline sound clips.')
