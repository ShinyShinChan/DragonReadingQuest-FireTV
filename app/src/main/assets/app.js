/* Dragon Reading Quest — first-party, offline, no dependencies. */
(() => {
'use strict';

const LESSONS = [
  {id:'s1',world:0,name:'First Magic Sounds',sub:'s · a · t · m',kind:'sounds',items:['s','a','t','m'],icon:'🌱'},
  {id:'s2',world:0,name:'More Letter Friends',sub:'p · i · n',kind:'sounds',items:['p','i','n'],icon:'🌻'},
  {id:'w1',world:0,name:'First Tiny Words',sub:'sat · sit · pin · tap · nap',kind:'words',items:['sat','sit','pin','tap','nap'],icon:'🧩'},
  {id:'s3',world:1,name:'Mountain Sounds',sub:'d · o · g · c',kind:'sounds',items:['d','o','g','c'],icon:'⛰️'},
  {id:'s4',world:1,name:'Meet More Letters',sub:'k · e · r · h',kind:'sounds',items:['k','e','r','h'],icon:'🍄'},
  {id:'w2',world:1,name:'Cat & Dog Words',sub:'cat · dog · cap · hen · red',kind:'words',items:['cat','dog','cap','hen','red'],icon:'🐈'},
  {id:'s5',world:2,name:'Letters Take Flight',sub:'b · f · l · u',kind:'sounds',items:['b','f','l','u'],icon:'🪁'},
  {id:'s6',world:2,name:'The Letter Parade',sub:'v · w · j · z',kind:'sounds',items:['v','w','j','z'],icon:'🎠'},
  {id:'w3',world:2,name:'Short A Adventures',sub:'map · pan · bat · fan · jam',kind:'words',items:['map','pan','bat','fan','jam'],icon:'🍎'},
  {id:'w4',world:3,name:'Short I Adventures',sub:'fin · dig · tip · kid · lip',kind:'words',items:['fin','dig','tip','kid','lip'],icon:'🐟'},
  {id:'w5',world:3,name:'Short O Adventures',sub:'pot · mop · log · top · dot',kind:'words',items:['pot','mop','log','top','dot'],icon:'🪵'},
  {id:'w6',world:3,name:'Short E Adventures',sub:'pet · ten · bed · pen · net',kind:'words',items:['pet','ten','bed','pen','net'],icon:'🖊️'},
  {id:'w7',world:4,name:'Short U Adventures',sub:'sun · bug · cup · mud · run',kind:'words',items:['sun','bug','cup','mud','run'],icon:'☀️'},
  {id:'s7',world:4,name:'Last Letter Friends',sub:'y · x · qu',kind:'sounds',items:['y','x','qu'],icon:'💫'},
  {id:'w8',world:4,name:'Mix & Match Magic',sub:'box · fox · yes · six · wax',kind:'words',items:['box','fox','yes','six','wax'],icon:'🎯'},
  {id:'d1',world:5,name:'Two Letters, One Sound',sub:'sh · ch · th · ck · wh',kind:'sounds',items:['sh','ch','th','ck','wh'],icon:'🔮'},
  {id:'w9',world:5,name:'Dragon Digraphs',sub:'ship · shop · chin · chat · duck',kind:'words',items:['ship','shop','chin','chat','duck'],icon:'🐉'},
  {id:'heart',world:5,name:'Heart Words',sub:'I · a · the · is · to · my',kind:'heart',items:['I','a','the','is','to','my'],icon:'❤️'},
  {id:'t1',world:6,name:'Sam & the Cat',sub:'My first tiny story',kind:'story',story:0,icon:'📖'},
  {id:'t2',world:6,name:'The Big Bug',sub:'A silly little story',kind:'story',story:1,icon:'📙'},
  {id:'t3',world:6,name:'The Red Hen',sub:'A reading adventure',kind:'story',story:2,icon:'📚'}
];
const WORLDS = [
 ['The Sound Garden','Where letters come alive','🌿'],
 ['Letter Mountain','Explore more sounds','🏔️'],
 ['Rainbow Road','Meet new word friends','🌈'],
 ['The Word Woods','Read your first words','🌲'],
 ['Sunny Valley','Build your reading power','🌞'],
 ['Dragon’s Cave','Tricky pairs & special words','🐲'],
 ['Story Castle','You are becoming a reader!','🏰']
];
const LETTERS = {
 s:['ssss','sun'],a:['ă','apple'],t:['t','top'],m:['mmmm','moon'],p:['p','pig'],i:['ĭ','igloo'],n:['nnnn','nest'],
 d:['d','dog'],o:['ŏ','octopus'],g:['g','goat'],c:['k','cat'],k:['k','kite'],e:['ĕ','egg'],r:['rrrr','rabbit'],h:['h','hat'],
 b:['b','bat'],f:['ffff','fish'],l:['llll','lion'],u:['ŭ','up'],v:['vvvv','van'],w:['w','web'],j:['j','jam'],z:['zzzz','zip'],
 y:['y','yarn'],x:['ks','box'],qu:['kw','queen'],sh:['shhh','ship'],ch:['ch','chin'],th:['th','thin'],ck:['k','duck'],wh:['w','when']
};
const PICTURES = {
 sat:['🪑','sat'],sit:['🪑','sit'],pin:['📌','pin'],tap:['🚰','tap'],nap:['😴','nap'],
 cat:['🐈','cat'],dog:['🐕','dog'],cap:['🧢','cap'],hen:['🐔','hen'],red:['🟥','red'],
 map:['🗺️','map'],pan:['🍳','pan'],bat:['🦇','bat'],fan:['🪭','fan'],jam:['🍓','jam'],
 fin:['🐬','fin'],dig:['⛏️','dig'],tip:['✏️','tip'],kid:['🧒','kid'],lip:['👄','lip'],
 pot:['🍲','pot'],mop:['🧹','mop'],log:['🪵','log'],top:['🌀','top'],dot:['🔴','dot'],
 pet:['🐾','pet'],ten:['🔟','ten'],bed:['🛏️','bed'],pen:['🖊️','pen'],net:['🥅','net'],
 sun:['☀️','sun'],bug:['🐞','bug'],cup:['🥤','cup'],mud:['🟤','mud'],run:['🏃','run'],
 box:['📦','box'],fox:['🦊','fox'],yes:['✅','yes'],six:['6️⃣','six'],wax:['🕯️','wax'],
 ship:['🚢','ship'],shop:['🏬','shop'],chin:['🧑','chin'],chat:['💬','chat'],duck:['🦆','duck']
};
const STORIES = [
 {title:'Sam & the Cat',picture:'🐈',lines:['Sam can pet a cat.','The cat sat.','Sam sat on a mat.','The cat can nap.'],q:'Who can pet the cat?',choices:['Sam','The sun','A hen'],answer:0},
 {title:'The Big Bug',picture:'🐞',lines:['A big bug is on a log.','The bug can hop.','The bug is in the mud.','The bug can run!'],q:'Where is the bug?',choices:['In the mud','On the moon','In a shop'],answer:0},
 {title:'The Red Hen',picture:'🐔',lines:['The hen is red.','The hen is in a pen.','The hen can get a bug.','The hen can nap.'],q:'What color is the hen?',choices:['Red','Blue','Pink'],answer:0}
];
const CHAPTER_COLORS = ['#83e2b0','#f7ce75','#e4a2ff','#9fd3fa','#ffd08a','#ff97ae','#b0bbff'];
const STORE = 'dragonReadingQuest.v1';
const app = document.getElementById('app');
const voice = document.getElementById('voice');
const native = typeof window.DragonBridge !== 'undefined';
let progress = {child:'Amara',completed:{},correct:0,tries:0,playCount:0};
try {
  const raw = native ? window.DragonBridge.loadProgress() : localStorage.getItem(STORE);
  if (raw) progress = Object.assign(progress,JSON.parse(raw));
} catch(e) { console.warn('Could not restore progress',e); }
if (!progress.completed || typeof progress.completed !== 'object') progress.completed = {};
let screen='home', chapter=0, lessonIndex=0, phase='intro', itemIndex=0, quizQueue=[], successCount=0,
  firstTryCount=0, triedWrong=false, choiceOrder=[], picks=[], lessonMistakes=0,
  focusEl=null, focusTick=0, lastClip='welcome', gateAnswer=0, returnTo='home', celebration='';
const soundKey = a => 'sound_'+a.toLowerCase();
const wordKey = w => 'word_'+w.toLowerCase();
const clipExists = t => /^[a-z0-9_]+$/.test(t);
function save() {
  try {
    const json=JSON.stringify(progress);
    if(native) window.DragonBridge.saveProgress(json); else localStorage.setItem(STORE,json);
  } catch(e){ console.warn('Save failed',e); }
}
function play(clip) {
  if (!clipExists(clip)) return;
  lastClip=clip;
  if(native) { window.DragonBridge.playSound(clip); }
  else {voice.pause();voice.src='audio/'+clip+'.mp3';voice.currentTime=0;voice.play().catch(()=>{});}
}
function escapeHTML(x) {return String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function shuffle(array) {
  const a=array.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;
}
function completedCount(){return Object.keys(progress.completed).filter(id=>progress.completed[id]>0).length;}
function totalStars(){return Object.values(progress.completed).reduce((s,n)=>s+(Number(n)||0),0);}
function highestUnlocked(){let x=0;while(x<LESSONS.length-1 && progress.completed[LESSONS[x].id]>0)x++;return x;}
function isUnlocked(i){return i<=highestUnlocked();}
function stars(n){return n ? '★'.repeat(n)+'☆'.repeat(3-n) : '☆☆☆';}
function emblem(){return `<svg class="dragon" viewBox="0 0 260 240" role="img" aria-label="Pip the friendly blue reading dragon">
<defs><linearGradient id="dragonBlue" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#80f2f3"/><stop offset="1" stop-color="#548dff"/></linearGradient></defs>
<path d="M83 150 C19 135 8 206 73 211 C24 181 79 172 94 181" fill="#63a9fa" stroke="#2f56a0" stroke-width="7"/>
<path d="M187 99 L212 58 L214 116 L244 97 L224 150 Z" fill="#7f89e7" stroke="#3760af" stroke-width="7" stroke-linejoin="round"/>
<path d="M79 91 L70 31 L110 64 L133 23 L153 61 L179 29 L188 90" fill="#9bcfff" stroke="#3760af" stroke-width="7" stroke-linejoin="round"/>
<ellipse cx="135" cy="140" rx="79" ry="84" fill="url(#dragonBlue)" stroke="#315da5" stroke-width="7"/>
<ellipse cx="127" cy="156" rx="54" ry="60" fill="#bdf9e9"/>
<ellipse cx="94" cy="109" rx="12" ry="17" fill="#22346c"/><ellipse cx="158" cy="109" rx="12" ry="17" fill="#22346c"/>
<circle cx="99" cy="103" r="5" fill="#fff"/><circle cx="163" cy="103" r="5" fill="#fff"/>
<ellipse cx="106" cy="135" rx="7" ry="4" fill="#3465a6"/><ellipse cx="152" cy="135" rx="7" ry="4" fill="#3465a6"/>
<path d="M112 149 Q131 168 150 148" fill="none" stroke="#2d4b88" stroke-width="5" stroke-linecap="round"/>
<circle cx="79" cy="134" r="13" fill="#ffb8cc" opacity=".65"/><circle cx="181" cy="134" r="13" fill="#ffb8cc" opacity=".65"/>
<path d="M80 184 Q126 172 131 211 L126 238 Q96 211 56 220 L56 192Z" fill="#ffdb86" stroke="#875c72" stroke-width="5"/>
<path d="M131 211 Q166 178 202 190 L205 219 Q156 211 126 238Z" fill="#fff3d6" stroke="#875c72" stroke-width="5"/>
<path d="M126 201 L126 236" stroke="#875c72" stroke-width="4"/>
<path d="M66 192 Q88 184 97 207 M167 202 Q189 189 198 193" fill="none" stroke="#3765a5" stroke-width="8" stroke-linecap="round"/>
</svg>`;}
let seq=0;
function button(label,action,arg='',cl=''){return `<button class="focusable ${cl}" data-focus="${++seq}" data-action="${escapeHTML(action)}" data-arg="${escapeHTML(arg)}">${label}</button>`;}
function header(back='home',label='Back'){return `<header class="topbar"><div class="brand-mini"><span class="book-mark">✦</span> DRAGON READING QUEST</div><div class="top-actions">${button('◀ '+label,'go',back,'pill ghost small')}<span class="star-bank">⭐ ${totalStars()}</span></div></header>`;}
function draw(){
 seq=0;
 let html='';
 switch(screen){
   case 'home':html=homePage();break;
   case 'map':html=mapPage();break;
   case 'lesson':html=lessonPage();break;
   case 'rewards':html=rewardsPage();break;
   case 'parentgate':html=parentGate();break;
   case 'parent':html=parentPage();break;
   case 'stories':html=storiesPage();break;
   case 'resetgate':html=resetPage();break;
   default:html=homePage();
 }
 app.innerHTML=`<div class="shell"><div class="sparkles"></div>${html}</div>`;
 focusEl=null;
 const start=document.querySelector('.focusable.primary-focus') || document.querySelector('.focusable');
 if(start)focus(start);
}
function homePage(){
 const next=LESSONS[highestUnlocked()];
 const count=completedCount();
 return `${header('home','Home')}<div class="home-view page-scroll">
 <section class="hero panel"><div class="hero-text"><div class="eyebrow">✦ AN ADVENTURE FOR LITTLE READERS ✦</div>
 <h1>Let's read, <em>${escapeHTML(progress.child||'Reader')}!</em></h1>
 <p>Meet Pip the Dragon. Learn letter sounds, build words, and unlock stories together.</p>
 <div class="hero-buttons">${button('▶ '+(count?'Continue':'Begin')+' Adventure','start','', 'cta primary-focus')}${button('🗺️ Choose a Lesson','go','map','pill')}</div>
 <div class="mini-stats"><span>✦ ${count} of ${LESSONS.length} lessons</span><span>⭐ ${totalStars()} stars earned</span><span>♡ At your own pace</span></div></div>
 <div class="hero-art"><div class="sun-halo"></div>${emblem()}<div class="speech-bubble">You can do it! ✨</div></div></section>
 <div class="section-heading"><h2>Your magic adventures</h2><span>Use ← → ↑ ↓ and Select on your remote</span></div>
 <div class="action-grid">${button('<span class="tile-icon">🔤</span><strong>Letter Lessons</strong><small>Listen, learn, and play</small>','go','map','action-tile')}${button('<span class="tile-icon">🧩</span><strong>Word Workshop</strong><small>Sound out and spell words</small>','workshop','','action-tile')}${button('<span class="tile-icon">📚</span><strong>Story Castle</strong><small>Read tiny stories</small>','go','stories','action-tile')}${button('<span class="tile-icon">🏆</span><strong>My Star Collection</strong><small>See all your achievements</small>','go','rewards','action-tile')}${button('<span class="tile-icon">👨‍👩‍👧</span><strong>Grown-Up Corner</strong><small>Track reading practice</small>','go','parentgate','action-tile')}</div>
 <div class="next-strip"><span>UP NEXT</span><strong>${escapeHTML(next.name)}</strong><span>${escapeHTML(next.sub)}</span>${button('Let’s Go →','start','','pill gold')}</div>
 </div>`;
}
function mapPage(){
 const chunks=WORLDS.map((w,j)=>{
 const its=LESSONS.map((l,i)=>({l,i})).filter(({l})=>l.world===j);
 return `<section class="chapter"><div class="chapter-title"><span class="chapter-emoji">${w[2]}</span><div><h2>${j+1}. ${w[0]}</h2><p>${w[1]}</p></div></div><div class="lesson-grid">${its.map(({l,i})=>{
 const lock=!isUnlocked(i);const done=progress.completed[l.id]||0;
 return button(`<span class="lesson-icon">${lock?'🔒':l.icon}</span><span class="lesson-name">${escapeHTML(l.name)}</span><span class="lesson-sub">${escapeHTML(l.sub)}</span><span class="lesson-stars">${lock?'Not yet unlocked':done?stars(done):'▶ Play lesson'}</span>`,'openLesson',String(i),'lesson-card '+(lock?'locked ':'')+(done?'done':'')+(i===highestUnlocked()?' suggested':''));
 }).join('')}</div></section>`;
 }).join('');
 return `${header('home','Home')}<div class="page-scroll map-view"><div class="page-title"><div><div class="eyebrow">PICK YOUR NEXT STOP</div><h1>The Reading Map</h1><p>Complete lessons to explore more of Pip’s world.</p></div><div class="progress-tag">${completedCount()} / ${LESSONS.length} lessons</div></div>${chunks}</div>`;
}
function startLesson(index){
 if(index<0||index>=LESSONS.length || !isUnlocked(index)){play('locked');return;}
 lessonIndex=index;phase='intro';itemIndex=0;successCount=0;firstTryCount=0;lessonMistakes=0;triedWrong=false;quizQueue=[];picks=[];celebration='';screen='lesson';draw();play('lesson_intro');
}
function lessonPage(){
 const l=LESSONS[lessonIndex];const w=WORLDS[l.world];
 const fill=(successCount/5)*100;
 let content='';
 if(phase==='intro')content=`<div class="lesson-intro"><div class="intro-symbol">${l.icon}</div><div class="eyebrow">WORLD ${l.world+1} · ${escapeHTML(w[0].toUpperCase())}</div><h1>${escapeHTML(l.name)}</h1><p>${escapeHTML(l.sub)}</p><p class="helper">A little lesson, then a fun game!</p>${button('✨ Let’s Learn!','nextIntro','','cta primary-focus')}</div>`;
 else if(phase==='teach'){
   const v=l.items[itemIndex],name=LETTERS[v]||['',v];
   content=`<div class="teaching"><div class="eyebrow">MEET THIS SOUND · ${itemIndex+1} / ${l.items.length}</div>
      <div class="big-letter">${escapeHTML(v)}<span>${v.length===1?escapeHTML(v.toUpperCase()):''}</span></div>
      <div class="sound-label">${escapeHTML(name[0])}</div><p>Like in <strong>${escapeHTML(name[1])}</strong></p>
      <div class="teach-actions">${button('🔊 Hear sound','hear',soundKey(v),'pill primary-focus')}${button('Next →','teachNext','','cta')}</div>
      <div class="helper">Say the sound together — not just the letter name.</div></div>`;
 } else if(phase==='heartTeach'){
   const v=l.items[itemIndex];
   content=`<div class="teaching"><div class="eyebrow">A WORD TO KNOW · ${itemIndex+1} / ${l.items.length}</div>
    <div class="heart-word">${escapeHTML(v)}</div><div class="sound-label">❤️ Heart Word</div><p>Some words have sounds we have to learn by heart.</p>
    <div class="teach-actions">${button('🔊 Hear the word','hear',wordKey(v),'pill primary-focus')}${button('Next →','teachNext','','cta')}</div></div>`;
 } else if(phase==='quiz'){
   const target=quizQueue[itemIndex];
   if(l.kind==='sounds') content=soundQuiz(l,target);
   else if(l.kind==='heart') content=heartQuiz(l,target);
   else content=wordQuiz(l,target);
 } else if(phase==='story') content=storyRead(l);
 else if(phase==='storyQuiz') content=storyQuestion(l);
 else if(phase==='done') content=`<div class="done-view"><div class="burst">🎉</div><div class="eyebrow">LESSON COMPLETE!</div><h1>Super reading, ${escapeHTML(progress.child)}!</h1><div class="earned-stars">${stars(progress.completed[l.id]||1)}</div><p>You practiced hard! Pip is proud of you.</p><div class="teach-actions">${button('➡ Next Adventure','nextLesson','','cta primary-focus')}${button('🗺️ Reading Map','go','map','pill')}${button('🏠 Home','go','home','pill ghost')}</div></div>`;
 return `${header('map','Lessons')}<main class="lesson-frame"><div class="lesson-top"><span>${l.icon} ${escapeHTML(l.name)}</span><div class="lesson-meter"><div style="width:${phase==='done'?100:fill}%"></div></div><span>${phase==='quiz'?`${successCount} / 5`:phase==='done'?'All done!':'Learn + Play'}</span></div><div class="lesson-body">${content}</div><div class="lesson-bottom"><span>🐉 Pip says: every try makes your brain stronger!</span>${button('🔊 Repeat Sound','replay','','pill ghost')}${phase==='quiz'?button('💡 Grown-up Hint','hint','','pill ghost'):''}</div></main>`;
}
function getChoices(target,arr,n=4){
 const choices=shuffle(arr.filter(x=>x!==target));return shuffle([target,...choices.slice(0,n-1)]);
}
function soundQuiz(l,target){
 if(choiceOrder.length===0)choiceOrder=getChoices(target,l.items,4);
 return `<div class="quiz"><div class="question-label">LISTEN CLOSELY</div><h1>Which letter makes this sound?</h1>
 <div class="target-sound">${button('<span class="speaker">🔊</span><span>Hear the sound again</span>','hear','find_'+target,'sound-repeat primary-focus')}</div>
 <div class="choices letter-choices">${choiceOrder.map(c=>button(`<span>${escapeHTML(c)}</span>`,'answer',c,'answer-card')).join('')}</div>
 <div class="feedback ${celebration?'show':''}">${celebration}</div></div>`;
}
function heartQuiz(l,target){
 if(choiceOrder.length===0)choiceOrder=getChoices(target,l.items,4);
 return `<div class="quiz"><div class="question-label">HEART WORD CHALLENGE</div><h1>Find the word that you hear!</h1>
 <div class="target-sound">${button('🔊 Hear the word','hear',wordKey(target),'sound-repeat primary-focus')}</div>
 <div class="choices word-choices">${choiceOrder.map(c=>button(`<span>${escapeHTML(c)}</span>`,'answer',c,'answer-card')).join('')}</div><div class="feedback ${celebration?'show':''}">${celebration}</div></div>`;
}
function wordQuiz(l,target){
 const isSpell=itemIndex%2===1;
 if(isSpell){
   if(choiceOrder.length===0){
     const extras=shuffle('abcdefghijklmnopqrstuvwxyz'.split('').filter(ch=>!target.includes(ch))).slice(0,2);
     choiceOrder=shuffle(target.split('').concat(extras));
   }
   const pic=(PICTURES[target]||[])[0]||'✨';
   return `<div class="quiz"><div class="question-label">BUILD THE WORD</div><h1>Listen and spell the word!</h1><div class="spell-picture">${pic}</div>
      <div class="target-sound">${button('🔊 Hear the word','hear',wordKey(target),'pill primary-focus')}</div>
      <div class="spell-slots">${Array.from({length:target.length},(_,i)=>`<span class="spell-slot ${picks[i]?'filled':''}">${escapeHTML((picks[i]||{}).letter||'')}</span>`).join('')}</div>
      <div class="choices spell-choices">${choiceOrder.map((c,i)=>button(escapeHTML(c),'pick',String(i),'answer-card '+(picks.some(z=>z.index===i)?'used':''))).join('')}</div>
      <div class="feedback ${celebration?'show':''}">${celebration}</div>
      <div class="secondary-actions">${button('↶ Undo letter','undo','','pill ghost')}${button('↺ Try again','clear','','pill ghost')}</div></div>`;
 }
 if(choiceOrder.length===0){
   const others=Object.keys(PICTURES).filter(c=>c!==target);
   const different=shuffle(others.filter(c=>c[0]!==target[0] && ((PICTURES[c]||[])[0]!==(PICTURES[target]||[])[0])));
   choiceOrder=shuffle([target,...different.slice(0,2)]);
 }
 return `<div class="quiz"><div class="question-label">READ THE WORD</div><h1>Sound it out. What does it say?</h1>
 <div class="read-word">${escapeHTML(target)}</div><div class="read-tip">Point to each letter, then blend the sounds.</div>
 <div class="choices picture-choices">${choiceOrder.map(c=>button(`<span class="picture-emoji">${(PICTURES[c]||[])[0]||'⭐'}</span>`,'answer',c,'answer-card')).join('')}</div>
 <div class="feedback ${celebration?'show':''}">${celebration}</div></div>`;
}
function storyRead(l){
 const st=STORIES[l.story];
 return `<div class="story-page"><div class="eyebrow">STORY CASTLE · READ ALONG</div><h1>${st.title}</h1><div class="story-picture">${st.picture}</div>
 <div class="story-lines">${st.lines.map((line,i)=>button(`<span class="story-line">${escapeHTML(line)}</span><span class="listen-icon">🔊</span>`,'hear','story_'+l.story+'_'+i,'story-sentence')).join('')}</div>
 <div class="story-bottom">${button('🗣️ Check my reading →','storyQuestion','','cta primary-focus')}<span>Choose a sentence to hear it aloud.</span></div></div>`;
}
function storyQuestion(l){
 const st=STORIES[l.story];
 return `<div class="quiz"><div class="question-label">STORY THINKING TIME</div><h1>${escapeHTML(st.q)}</h1><div class="story-picture small">${st.picture}</div>
 <div class="choices story-choices">${st.choices.map((c,i)=>button(escapeHTML(c),'storyAnswer',String(i),'answer-card '+(i===0?'primary-focus':''))).join('')}</div>
 <div class="feedback ${celebration?'show':''}">${celebration}</div></div>`;
}
function storiesPage(){
 return `${header('home','Home')}<div class="page-scroll"><div class="page-title"><div><div class="eyebrow">ONCE UPON A TIME</div><h1>Story Castle</h1><p>Little stories for growing readers. Press 🔊 to hear a line.</p></div></div><div class="story-library">${LESSONS.map((l,i)=>({l,i})).filter(x=>x.l.kind==='story').map(({l,i})=>button(`<div class="story-icon">${l.icon}</div><h2>${escapeHTML(l.name)}</h2><p>${escapeHTML(l.sub)}</p><span>${isUnlocked(i)?'▶ Read a story':'🔒 Complete earlier lessons first'}</span>`,'openLesson',String(i),'library-card '+(!isUnlocked(i)?'locked':''))).join('')}</div></div>`;
}
function rewardsPage(){
 const count=totalStars();const badges=[['🌱','Seed Starter',1],['🔤','Sound Scout',6],['🧩','Word Wizard',15],['📚','Story Explorer',30],['🐉','Dragon Reader',45],['👑','Reading Royalty',60]];
 return `${header('home','Home')}<div class="page-scroll"><div class="page-title"><div><div class="eyebrow">YOUR TREASURE CHEST</div><h1>${escapeHTML(progress.child)}’s Star Collection</h1><p>Every completed lesson earns new stars.</p></div><div class="big-star">⭐ ${count}</div></div>
 <div class="badge-grid">${badges.map(([icon,name,need])=>`<div class="badge-card ${count>=need?'won':'not-yet'}"><div>${count>=need?icon:'🔒'}</div><strong>${name}</strong><span>${count>=need?'Unlocked!':need+' stars to unlock'}</span></div>`).join('')}</div>
 <div class="parent-note">Pip’s rule: keep trying, say the sounds out loud, and celebrate small steps. 🌟</div></div>`;
}
function parentGate(){
 const a=2+Math.floor(Math.random()*5),b=3+Math.floor(Math.random()*5);gateAnswer=a+b;
 const choices=shuffle([gateAnswer,gateAnswer+1,gateAnswer-2]);
 return `${header('home','Home')}<div class="center-page"><div class="parent-lock"><div class="lock-illustration">🛡️</div><div class="eyebrow">GROWN-UPS ONLY</div><h1>Parent Corner</h1><p>Quick grown-up check: What is <strong>${a} + ${b}</strong>?</p><div class="parent-answers">${choices.map(x=>button(String(x),'gate',String(x),'answer-card')).join('')}</div><p class="muted">This keeps settings away from little hands.</p></div></div>`;
}
function parentPage(){
 const count=completedCount(),accuracy=progress.tries?Math.round(100*progress.correct/progress.tries):0;
 return `${header('home','Home')}<div class="page-scroll"><div class="page-title"><div><div class="eyebrow">READING TOGETHER</div><h1>Grown-Up Corner</h1><p>Progress is stored right here on your Fire Stick. No account or Internet required.</p></div></div>
 <div class="parent-metrics"><div><strong>${count}</strong><span>Lessons completed</span></div><div><strong>${totalStars()}</strong><span>Stars earned</span></div><div><strong>${progress.tries?accuracy+'%':'—'}</strong><span>First-try accuracy</span></div><div><strong>${Math.max(0,progress.playCount||0)}</strong><span>Practice sessions</span></div></div>
 <div class="parent-two"><section class="panel settings-box"><h2>Reader Settings</h2><p>Child’s name (shown on the welcome screen)</p>
 <div class="name-field">${button('✎ Edit name','editName','','pill')}<input id="kidName" type="text" maxlength="18" value="${escapeHTML(progress.child||'Reader')}" placeholder="Reader" aria-label="Child name"/>${button('Save name','saveName','','pill primary-focus')}</div>
 <div class="settings-help">Reading routine: try 5–10 minutes together. Help by saying each sound clearly and stretching words as you blend.</div>
 ${button('Reset reading progress','askReset','','pill danger')}</section>
 <section class="panel milestones"><h2>Completed lessons</h2><div class="milestone-list">${LESSONS.map((l,i)=>progress.completed[l.id]?`<div><span>${l.icon} ${escapeHTML(l.name)}</span><span class="gold-text">${stars(progress.completed[l.id])}</span></div>`:'').join('')||'<p>No lessons finished yet. Start with the Sound Garden!</p>'}</div></section></div>
 ${button('Return Home','go','home','pill')}</div>`;
}
function resetPage(){return `${header('parent','Cancel')}<div class="center-page"><div class="parent-lock"><div class="lock-illustration">⚠️</div><h1>Start Over?</h1><p>This erases all saved stars, completed lessons, and practice scores from this Fire Stick. It cannot be undone.</p><div class="parent-answers">${button('No, go back','go','parent','pill primary-focus')}${button('Yes, erase progress','confirmReset','','pill danger')}</div></div></div>`;}
function setPhase(p){phase=p;choiceOrder=[];picks=[];celebration='';draw();}
function startQuiz(){
 const l=LESSONS[lessonIndex];
 quizQueue=shuffle(l.items).slice(0,5);
 while(quizQueue.length<5)quizQueue.push(l.items[quizQueue.length%l.items.length]);
 if(l.items.length>5)quizQueue=shuffle(l.items).slice(0,5);
 itemIndex=0;successCount=0;firstTryCount=0;triedWrong=false;
 setPhase('quiz');play(l.kind==='sounds'?'find_'+quizQueue[0]:l.kind==='heart'?wordKey(quizQueue[0]):itemIndex%2?'spell_word':'read_word');
}
function advanceQuestion(){
 successCount++;itemIndex++;triedWrong=false;choiceOrder=[];picks=[];celebration='';
 if(successCount>=5){completeLesson();return;}
 draw();const l=LESSONS[lessonIndex];const target=quizQueue[itemIndex];
 play(l.kind==='sounds'?'find_'+target:l.kind==='heart'?wordKey(target):itemIndex%2?wordKey(target):'read_word');
}
function correct(){
 if(!triedWrong)firstTryCount++;
 progress.correct++;progress.tries++;save();celebration='⭐ You got it!';play('correct');draw();
 window.setTimeout(()=>{if(screen==='lesson'&&phase==='quiz')advanceQuestion();},680);
}
function mistake(){
 if(!triedWrong){progress.tries++;triedWrong=true;}lessonMistakes++;save();celebration='💙 Good try! Listen, then try again.';play('try_again');draw();
}
function completeLesson(){
 const l=LESSONS[lessonIndex],newStars=firstTryCount>=5?3:firstTryCount>=3?2:1;
 progress.completed[l.id]=Math.max(progress.completed[l.id]||0,newStars);save();setPhase('done');play('completed');
}
function go(screenName){
 if(!['home','map','rewards','parentgate','parent','stories'].includes(screenName))return;
 screen=screenName;draw();if(screen==='home')play('welcome');
}
function action(type,arg){
 switch(type){
 case 'go':go(arg);break;
 case 'start': startLesson(highestUnlocked());break;
 case 'openLesson':startLesson(Number(arg));break;
 case 'workshop': { const i=LESSONS.findIndex(l=>l.kind==='words'&&isUnlocked(LESSONS.indexOf(l)));if(i>=0)startLesson(i);else startLesson(highestUnlocked());break; }
 case 'hear':play(arg);break;
 case 'replay':play(lastClip);break;
 case 'hint': {const l=LESSONS[lessonIndex];const t=quizQueue[itemIndex];celebration='💡 '+(l.kind==='sounds'?`Listen for the sound in “${(LETTERS[t]||[])[1]||t}”.`:l.kind==='heart'?`Look for “${t}”.`:`Try sounding out “${t}” one letter at a time.`);draw();break;}
 case 'nextIntro':{
   const l=LESSONS[lessonIndex];
   if(l.kind==='sounds') {setPhase('teach');play(soundKey(l.items[0]));}
   else if(l.kind==='heart'){setPhase('heartTeach');play(wordKey(l.items[0]));}
   else if(l.kind==='story'){setPhase('story');play('story_intro');}
   else {startQuiz();}
   break;
 }
 case 'teachNext':{
   const l=LESSONS[lessonIndex];itemIndex++;
   if(itemIndex>=l.items.length){startQuiz();}else{draw();play(l.kind==='heart'?wordKey(l.items[itemIndex]):soundKey(l.items[itemIndex]));}
   break;
 }
 case 'answer':{
   if(phase!=='quiz')break;
   const target=quizQueue[itemIndex];if(arg===target)correct();else mistake();break;
 }
 case 'pick':{
   if(phase!=='quiz')break;
   const l=LESSONS[lessonIndex], target=quizQueue[itemIndex], idx=Number(arg);
   if(l.kind!=='words'||itemIndex%2===0||picks.some(p=>p.index===idx))break;
   picks.push({letter:choiceOrder[idx],index:idx});
   if(picks.length===target.length){
     const built=picks.map(p=>p.letter).join('');
     if(built===target)correct();else {picks=[];mistake();}
   } else {draw();play('tile_'+choiceOrder[idx]);}
   break;
 }
 case 'undo':{picks.pop();draw();break;}
 case 'clear':{picks=[];celebration='';draw();break;}
 case 'storyQuestion':setPhase('storyQuiz');play('story_question');break;
 case 'storyAnswer':{
   if(Number(arg)===STORIES[LESSONS[lessonIndex].story].answer){firstTryCount=5;completeLesson();}
   else{celebration='💙 Read the story again and try!';play('try_again');draw();}
   break;
 }
 case 'nextLesson':startLesson(Math.min(lessonIndex+1,LESSONS.length-1));break;
 case 'gate':if(Number(arg)===gateAnswer)go('parent');else{play('try_again');go('home');}break;
 case 'editName':{const field=document.getElementById('kidName');if(field){field.focus();field.select();}break;}
 case 'saveName':{
   const field=document.getElementById('kidName');
   if(field){progress.child=field.value.replace(/[<>]/g,'').trim().slice(0,18)||'Reader';save();draw();play('correct');}break;
 }
 case 'askReset':go('resetgate');break;
 case 'confirmReset':{progress.completed={};progress.correct=0;progress.tries=0;progress.playCount=0;save();go('parent');break;}
 }
}
app.addEventListener('click',e=>{const el=e.target.closest('[data-action]');if(el)action(el.dataset.action,el.dataset.arg||'');});
function focus(el){
 if(!el)return;if(focusEl)focusEl.classList.remove('tv-focus');focusEl=el;focusEl.classList.add('tv-focus');
 if(el.scrollIntoView)el.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});
}
function move(dir){
 if(!focusEl){focus(document.querySelector('.focusable'));return;}
 const r=focusEl.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
 const candidates=[...document.querySelectorAll('.focusable:not([disabled])')].filter(x=>x!==focusEl&&getComputedStyle(x).visibility!=='hidden');
 let best=null,bestScore=Infinity;
 for(const el of candidates){const q=el.getBoundingClientRect(),dx=q.left+q.width/2-cx,dy=q.top+q.height/2-cy;
   const primary=(dir==='LEFT'?-dx:dir==='RIGHT'?dx:dir==='UP'?-dy:dy);
   if(primary<=5)continue;
   const cross=(dir==='LEFT'||dir==='RIGHT')?Math.abs(dy):Math.abs(dx);
   const score=primary+cross*3.2 + (cross>primary?200:0);
   if(score<bestScore){best=el;bestScore=score;}
 }
 if(best)focus(best);
}
window.tvKey=function(k){
 if(['LEFT','RIGHT','UP','DOWN'].includes(k)){move(k);return;}
 if(k==='SELECT'){
   if(document.activeElement && document.activeElement.tagName==='INPUT')return;
   if(focusEl)focusEl.click();return;
 }
 if(k==='REPLAY'){play(lastClip);return;}
 if(k==='MENU'){go('parentgate');return;}
 if(k==='BACK'){
   if(document.activeElement && document.activeElement.tagName==='INPUT'){document.activeElement.blur();return;}
   if(screen==='lesson')go('map');else if(screen==='resetgate')go('parent');else if(screen==='parent')go('home');else if(screen!=='home')go('home');return;
 }
};
document.addEventListener('keydown',e=>{
 if(e.target.tagName==='INPUT'){if(e.key==='Escape'){e.target.blur();e.preventDefault();}return;}
 const m={ArrowLeft:'LEFT',ArrowRight:'RIGHT',ArrowUp:'UP',ArrowDown:'DOWN',Enter:'SELECT',' ':'SELECT',Escape:'BACK',Backspace:'BACK',r:'REPLAY',m:'MENU'};
 if(m[e.key]){e.preventDefault();window.tvKey(m[e.key]);}
});
progress.playCount=(progress.playCount||0)+1;save();draw();
})();
