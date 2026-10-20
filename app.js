const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}},
 json(k,d){try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}},put(k,v){this.set(k,JSON.stringify(v))}};
const fmt=(n,d=1)=>n.toLocaleString('es',{maximumFractionDigits:d});
const SUBS='₀₁₂₃₄₅₆₇₈₉',SUPS='⁰¹²³⁴⁵⁶⁷⁸⁹';
const sub=s=>String(s).replace(/\d/g,d=>SUBS[d]),sup=s=>String(s).replace(/\d/g,d=>SUPS[d]).replace(/-/g,'⁻');
const norm=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const rand=a=>a[Math.floor(Math.random()*a.length)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Mascota ---------- */
const MOUTH={smile:'M88 146 Q110 166 132 146',open:'M90 144 Q110 180 130 144 Z',flat:'M92 154 L128 154'};
const mascots=[];let uidN=0;
function mascotSVG(u,compact){
 return `<svg class="mascot" viewBox="${compact?'40 0 280 270':'0 0 320 270'}" data-mood="idle" data-face="smile" data-hat="off" role="img" aria-label="Itri, la mascota del itrio">
<defs><linearGradient id="g${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--m-top)"/><stop offset="1" style="stop-color:var(--m-bot)"/></linearGradient></defs>
<ellipse class="m-shadow" cx="160" cy="256" rx="62" ry="8"/>
<g transform="translate(50 0)"><g class="m-float">
<rect class="m-limb" x="70" y="212" width="26" height="34" rx="12"/><rect class="m-limb" x="124" y="212" width="26" height="34" rx="12"/>
<g transform="translate(34 130)"><path class="m-arm" d="M0 0 Q-20 16 -16 42"/><circle class="m-hand" cx="-16" cy="44" r="9"/></g>
<g transform="translate(186 130)"><g class="arm-r"><path class="m-arm" d="M0 0 Q20 16 16 42"/><circle class="m-hand" cx="16" cy="44" r="9"/></g></g>
<line class="m-stalk" x1="110" y1="40" x2="110" y2="24"/><circle class="m-bulb" cx="110" cy="16" r="9"/>
<rect class="m-tile" x="34" y="40" width="152" height="176" rx="34" fill="url(#g${u})"/>
<g class="m-hat"><polygon points="20,46 74,24 124,44 70,66" fill="#111830" stroke="#3a2a00" stroke-width="2"/><path d="M44 52 L44 70 Q70 82 98 68 L98 50" fill="#111830"/><path d="M72 45 L30 58 L30 80" stroke="#f4b800" stroke-width="3" fill="none"/><circle cx="30" cy="82" r="4" fill="#f4b800"/></g>
<text class="m-num" x="54" y="66">39</text><text class="m-num" x="168" y="66" text-anchor="end">88,906</text>
<g class="m-eyes"><circle class="m-eyew" cx="80" cy="108" r="17"/><circle class="m-eyew" cx="140" cy="108" r="17"/>
<g class="m-pupil-g"><circle class="m-pupil" cx="80" cy="108" r="8"/><circle class="m-glint" cx="83" cy="105" r="2.5"/></g>
<g class="m-pupil-g"><circle class="m-pupil" cx="140" cy="108" r="8"/><circle class="m-glint" cx="143" cy="105" r="2.5"/></g></g>
<ellipse class="m-cheek" cx="56" cy="138" rx="12" ry="7"/><ellipse class="m-cheek" cx="164" cy="138" rx="12" ry="7"/>
<path class="m-mouth" d="${MOUTH.smile}"/>
<text class="m-y" x="110" y="205" text-anchor="middle">Y</text>
<g class="m-laser"><line x1="140" y1="108" x2="268" y2="108"/><line class="core" x1="140" y1="108" x2="268" y2="108"/><text x="268" y="92" text-anchor="end">1064 nm · IR</text></g>
</g></g></svg>`;}
function createMascot(host,compact){
 host.innerHTML=mascotSVG(++uidN,compact);
 const svg=host.firstElementChild,mouth=$('.m-mouth',svg),eyes=$$('.m-eyew',svg),pupils=$$('.m-pupil-g',svg);let t,tj;
 const laserLine=$$('.m-laser line',svg),laserTxt=$('.m-laser text',svg);
 const api={svg,
  mood(m){const g=m==='verde';svg.dataset.mood=g?'laser':m;laserLine[0].style.stroke=g?'#2fd14a':'';laserTxt.textContent=g?'532 nm · verde':'1064 nm · IR';if(g)svg.style.setProperty('--m-glow','rgba(60,220,90,.55)');else svg.style.removeProperty('--m-glow')},
  face(f){svg.dataset.face=f;mouth.setAttribute('d',MOUTH[f])},
  hat(on){svg.dataset.hat=on?'on':'off'},
  wave(){svg.classList.remove('waving');void svg.getBoundingClientRect();svg.classList.add('waving');clearTimeout(t);t=setTimeout(()=>svg.classList.remove('waving'),1900)},
  jump(){svg.classList.remove('jump');void svg.getBoundingClientRect();svg.classList.add('jump');clearTimeout(tj);tj=setTimeout(()=>svg.classList.remove('jump'),1100)},
  look(x,y){pupils.forEach((g,i)=>{const r=eyes[i].getBoundingClientRect();if(!r.width)return;const dx=x-(r.left+r.width/2),dy=y-(r.top+r.height/2);const d=Math.hypot(dx,dy)||1,m=Math.min(6,d/18);g.setAttribute('transform',`translate(${dx/d*m} ${dy/d*m})`)})}};
 mascots.push(api);return api;}
let rafP=0,px=0,py=0;
addEventListener('pointermove',e=>{px=e.clientX;py=e.clientY;if(!rafP)rafP=requestAnimationFrame(()=>{rafP=0;mascots.forEach(m=>m.look(px,py))})},{passive:true});
function happy(m,ms){m.face('open');m.wave();setTimeout(()=>m.face('smile'),ms||1900)}

const hero=createMascot($('#heroMascot'),false),heroB=$('#heroBubble');
const heroSay=h=>{heroB.innerHTML=h};
$('#heroMascot').addEventListener('click',()=>{heroSay(rand(FACTS));happy(hero)});
$$('[data-mood]').forEach(b=>b.addEventListener('click',()=>{
 const m=b.dataset.mood,on=b.getAttribute('aria-pressed')==='true';
 $$('[data-mood]').forEach(x=>x.setAttribute('aria-pressed','false'));
 if(on){hero.mood('idle');heroSay('Vuelvo a mi color normal. Tócame para un dato.')}
 else{b.setAttribute('aria-pressed','true');hero.mood(m);heroSay(MOODS[m]);hero.face('open');setTimeout(()=>hero.face('smile'),1500)}}));

const comp=createMascot($('#compMascot'),true),cB=$('#compBubble');let cT;
function compSay(h,ms){cB.innerHTML=h;cB.hidden=false;clearTimeout(cT);cT=setTimeout(()=>{cB.hidden=true},ms||7000)}
function compMood(m,h,ms){comp.mood(m);compSay(h,ms||7000);clearTimeout(compMood.t);if(m!=='idle')compMood.t=setTimeout(()=>comp.mood('idle'),ms||7000)}
$('#compBtn').addEventListener('click',()=>{compSay(rand(FACTS));happy(comp)});
cB.addEventListener('click',()=>{cB.hidden=true});

/* ---------- Avisos, confeti, logros ---------- */
const toastEl=$('#toast');let toastT;
function toast(h,ms){toastEl.innerHTML=h;toastEl.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>toastEl.classList.remove('show'),ms||3200)}
function confetti(){if(reduced)return;const c=document.createElement('div');c.className='confetti';const cols=['#f4b800','#2f49d8','#c42b33','#0f7a56','#7a3fd0','#ffe27a'];
 for(let i=0;i<90;i++){const p=document.createElement('i');p.style.left=Math.random()*100+'vw';p.style.background=rand(cols);p.style.setProperty('--x',(Math.random()*200-100)+'px');p.style.setProperty('--r',(Math.random()*900-450)+'deg');p.style.animationDuration=(1.6+Math.random()*1.8)+'s';p.style.animationDelay=(Math.random()*.4)+'s';c.appendChild(p)}
 document.body.appendChild(c);setTimeout(()=>c.remove(),4200)}
const got=new Set(store.json('itrio-ach',[]));
function drawAch(){
 $('#ach').innerHTML=ACH.map(([id,ic,t,d])=>`<div class="ach-it${got.has(id)?' on':''}"><span class="ic" aria-hidden="true">${ic}</span><span><b>${t}</b><span>${got.has(id)?'Desbloqueado · ':''}${d}</span></span></div>`).join('');
 $('#achMini').innerHTML=ACH.map(([id,ic,t])=>`<i class="${got.has(id)?'on':''}" title="${t}">${ic}</i>`).join('');
 $('#achTxt').textContent=`Logros: ${got.size} de ${ACH.length}`;$('#stA').textContent=`${got.size}/${ACH.length}`;
 const all=got.size===ACH.length;hero.hat(all);comp.hat(all)}
function unlock(id){if(got.has(id))return;got.add(id);store.put('itrio-ach',[...got]);drawAch();
 const a=ACH.find(x=>x[0]===id);toast(`<span style="font-size:1.4rem">${a[1]}</span><span><b>¡Logro desbloqueado!</b><br>${a[2]}</span>`,3800);
 comp.jump();happy(comp);if(got.size===ACH.length){setTimeout(()=>{confetti();compSay('¡Todos los logros! Me gané el birrete.',7000)},900)}}
drawAch();

/* ---------- Navegación, progreso y capítulos vistos ---------- */
const CHS=$$('.chap');
const NUMBERED=CHS.filter(s=>$('[data-num]',s));
NUMBERED.forEach((s,i)=>{$('[data-num]',s).textContent=`Capítulo ${i+1} de ${NUMBERED.length}`});
$('#stCh').textContent=NUMBERED.length;$('#stQ').textContent=Q.length;
const CH=CHS.map(s=>[s.id,s.dataset.title]);
const seen=new Set(store.json('itrio-seen2',[]));
function buildNav(ul){let n=0;ul.innerHTML=CH.map(([id,t])=>{const num=$('[data-num]',document.getElementById(id))?String(++n).padStart(2,'0'):id==='quiz'?'★':'◆';return `<li><a href="#${id}" data-id="${id}"><span class="num">${num}</span><span>${t}</span><span class="ck"></span></a></li>`}).join('')}
buildNav($('#sideNav'));buildNav($('#drawerNav'));
const drawer=$('#drawer'),menuBtn=$('#menuBtn');
function openDrawer(o){drawer.hidden=!o;menuBtn.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':'';if(o)$('#closeBtn').focus();else menuBtn.focus()}
menuBtn.addEventListener('click',()=>openDrawer(true));$('#closeBtn').addEventListener('click',()=>openDrawer(false));
$('#drawerNav').addEventListener('click',e=>{if(e.target.closest('a')){drawer.hidden=true;document.body.style.overflow='';menuBtn.setAttribute('aria-expanded','false')}});
let curId='inicio';
function refreshNav(){
 $$('.nav a').forEach(a=>{a.classList.toggle('seen',seen.has(a.dataset.id));a.setAttribute('aria-current',a.dataset.id===curId?'true':'false')});
 const n=NUMBERED.filter(s=>seen.has(s.id)).length;
 $$('.seenTxt').forEach(e=>e.textContent=`${n} de ${NUMBERED.length} capítulos vistos`);
 $$('.barSeen').forEach(e=>e.style.width=(n/NUMBERED.length*100)+'%');
 const t=CH.find(([id])=>id===curId);$('#curTitle').textContent=t&&curId!=='inicio'?t[1]:'Guía del Itrio';
 if(n>=1)unlock('first');if(n>=8)unlock('half');if(n>=NUMBERED.length)unlock('all')}
const io=new IntersectionObserver(es=>es.forEach(e=>{
 if(!e.isIntersecting)return;const id=e.target.id;if(id===curId)return;curId=id;
 if(id!=='inicio'){store.set('itrio-last',id);if(!seen.has(id)){seen.add(id);store.put('itrio-seen2',[...seen])}}
 refreshNav();if(TIPS[id])compSay(TIPS[id],6500)}),{rootMargin:'-45% 0px -50% 0px'});
$$('.hero,.chap').forEach(s=>io.observe(s));refreshNav();
function prog(){const h=document.documentElement.scrollHeight-innerHeight;const p=h>0?Math.min(100,scrollY/h*100):0;$('#barTop').style.width=p+'%'}
addEventListener('scroll',prog,{passive:true});prog();
(function(){const last=store.get('itrio-last');const c=last&&CH.find(x=>x[0]===last);if(c&&last!=='inicio'){const r=$('#resume');r.innerHTML=`Seguir donde lo dejaste: <a href="#${last}">${c[1]} →</a>`;r.classList.add('on')}})();

/* ---------- Herramientas: tema, compartir, imprimir, escuchar ---------- */
function isDark(){const t=document.documentElement.dataset.theme;return t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches}
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b)return;const a=b.dataset.act;
 if(a==='theme'){const t=isDark()?'light':'dark';document.documentElement.dataset.theme=t;store.set('itrio-theme',t);toast(t==='dark'?'Tema oscuro':'Tema claro',1400)}
 if(a==='share')share();
 if(a==='print')print();
 if(a==='search')openSearch()});
async function share(){const data={title:'Guía del Itrio',text:'Guía interactiva del itrio (elemento 39) con juegos, fichas y quiz.',url:location.href.split('#')[0]};
 try{if(navigator.share){await navigator.share(data);return}await navigator.clipboard.writeText(data.url);toast('Enlace copiado. ¡Pásalo a tus compañeros!')}catch(e){if(e&&e.name!=='AbortError')toast('Copia el enlace de la barra de direcciones')}}
const canSpeak='speechSynthesis' in window;let speakingBtn=null;
function stopSpeak(){if(!canSpeak)return;speechSynthesis.cancel();if(speakingBtn){speakingBtn.innerHTML='<svg><use href="#i-sound"/></svg>Escuchar';speakingBtn.setAttribute('aria-pressed','false')}speakingBtn=null}
function speakSection(sec,btn){
 if(speakingBtn===btn){stopSpeak();return}stopSpeak();
 const parts=[];$$('h2,p,li,dt,dd,h3,.tl-body,.face.b',sec).forEach(el=>{if(el.closest('.chap-tools,.src,button:not(.flip),.eyebrow,svg,.q-top')||el.offsetParent===null&&!el.closest('.flip'))return;const t=el.textContent.trim();if(t)parts.push(t)});
 const text=parts.join('. ').replace(/\s+/g,' ').replace(/\.\./g,'.');
 const chunks=text.match(/[^.!?]+[.!?]*/g)||[text];
 const voice=speechSynthesis.getVoices().find(v=>/^es/i.test(v.lang));
 speakingBtn=btn;btn.innerHTML='<svg><use href="#i-sound"/></svg>Detener';btn.setAttribute('aria-pressed','true');
 chunks.forEach((c,i)=>{const u=new SpeechSynthesisUtterance(c.trim());u.lang='es-ES';if(voice)u.voice=voice;u.rate=1;if(i===chunks.length-1)u.onend=()=>{if(speakingBtn===btn)stopSpeak()};speechSynthesis.speak(u)})}
NUMBERED.forEach(s=>{const h=$('.chap-head',s);const box=document.createElement('div');box.className='chap-tools';
 if(canSpeak)box.innerHTML='<button class="btn sm" type="button" aria-pressed="false"><svg><use href="#i-sound"/></svg>Escuchar</button>';
 h.appendChild(box);const b=$('button',box);if(b)b.addEventListener('click',()=>speakSection(s,b))});
if(canSpeak)speechSynthesis.getVoices();

/* ---------- Bibliografía ---------- */
const refTxt=r=>r[0].replace(/<[^>]+>/g,'')+(r[1]?' '+r[1]:'');
$('#refs').innerHTML=REFS.map((r,i)=>`<li id="ref-${i+1}"><span class="ref-t">${r[0]}${r[1]?` <a href="${r[1]}" target="_blank" rel="noopener">${r[1]}</a>`:''}</span><span class="ref-u">Se usó para: ${r[2]}.</span></li>`).join('');
Object.entries(CHREFS).forEach(([id,ns])=>{const h=$('#'+id+' .chap-head');if(!h)return;const p=document.createElement('p');p.className='src';
 p.innerHTML='Fuentes: '+ns.map(n=>`<a href="#ref-${n}" title="${refTxt(REFS[n-1]).slice(0,140)}">[${n}]</a>`).join('');h.appendChild(p)});
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#ref-"]');if(!a)return;const li=$(a.getAttribute('href'));if(!li)return;
 setTimeout(()=>{li.classList.add('flash');setTimeout(()=>li.classList.remove('flash'),1600)},400)});
$('#refCopy').addEventListener('click',async()=>{const t=REFS.map(refTxt).join('\n\n');
 try{await navigator.clipboard.writeText(t);toast('Bibliografía copiada. Pégala en tu trabajo.')}catch(e){toast('No pude copiar; selecciona el texto a mano')}});

/* ---------- Línea de tiempo ---------- */
$('#timeline').innerHTML=TL.map((t,i)=>`<li><button class="tl-btn" type="button" aria-expanded="${i===1}" aria-controls="tl${i}"><span class="yr">${t[0]}</span><span class="tt">${t[1]}</span><svg class="chev" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2"/></svg></button><div class="tl-body" id="tl${i}" ${i===1?'':'hidden'}>${t[2]}</div></li>`).join('');
$$('.tl-btn').forEach(b=>b.addEventListener('click',()=>{const o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',!o);$('#'+b.getAttribute('aria-controls')).hidden=o}));

/* ---------- Tabla periódica ---------- */
function ptPos(z){
 if(z===1)return[1,1];if(z===2)return[1,18];
 if(z<=4)return[2,z-2];if(z<=10)return[2,z+8];
 if(z<=12)return[3,z-10];if(z<=18)return[3,z];
 if(z<=36)return[4,z-18];if(z<=54)return[5,z-36];
 if(z<=56)return[6,z-54];if(z<=71)return[9,z-54];if(z<=86)return[6,z-68];
 if(z<=88)return[7,z-86];if(z<=103)return[10,z-86];return[7,z-100]}
function ptBlock(z){const[r,c]=ptPos(z);if(r>=9)return'f';if(c<=2||z===2)return's';if(c>=13)return'p';return'd'}
const RARE=z=>z===21||z===39||(z>=57&&z<=71);
const PF={all:()=>true,rare:RARE,g3:z=>[21,39,57,71,89,103].includes(z),ytt:z=>[39,65,68,70].includes(z),p5:z=>z>=37&&z<=54};
(function(){let h='';
 for(let z=1;z<=118;z++){const[r,c]=ptPos(z),b=ptBlock(z);
  h+=`<button class="el b-${b}${RARE(z)?' rare':''}${z===39?' me':''}" style="grid-row:${r};grid-column:${c}" data-z="${z}" aria-label="${NAMES[z-1]}, ${z}"><small>${z}</small>${SYM[z-1]}</button>`}
 h+=`<span class="ph" style="grid-row:6;grid-column:3">57–71</span><span class="ph" style="grid-row:7;grid-column:3">89–103</span><span class="gap" style="grid-row:8"></span>`;
 $('#pt').innerHTML=h})();
const ptClicked=new Set();
function ptShow(z){const[r,c]=ptPos(z),b=ptBlock(z),name=NAMES[z-1];
 const per=r===9?6:r===10?7:r,grp=r===9?'lantánido (grupo 3)':r===10?'actínido (grupo 3)':'grupo '+c;
 const rel=z===39?'<b>¡Soy yo, Itri!</b> Período 5, grupo 3, justo encima de los lantánidos.':
  z===21?'Mi vecino de arriba en el grupo 3. También es tierra rara.':
  [65,68,70].includes(z)?'Otro elemento con nombre de Ytterby, como el itrio.':
  z===67?'Su ion Ho³⁺ mide casi lo mismo que Y³⁺: por eso nos cuesta separarnos.':
  z===36?'El gas noble cuya configuración tiene el ion Y³⁺.':
  z===40?'El circonio: el ⁹⁰Y se convierte en ⁹⁰Zr al desintegrarse.':
  z===38?'El estroncio: el ⁹⁰Sr se desintegra y produce ⁹⁰Y.':
  RARE(z)?'Es una tierra rara, como el itrio.':'';
 $('#ptInfo').innerHTML=`<div class="mini" style="${z===39?'background:var(--yag);color:var(--yag-ink)':''}"><span><small>${z}</small><br><b>${SYM[z-1]}</b><br><small>${MASS[SYM[z-1]]?fmt(MASS[SYM[z-1]],3):''}</small></span></div><div><h3>${name}</h3><p class="muted small" style="margin:4px 0">Z = ${z} · período ${per} · ${grp} · bloque ${b}${RARE(z)?' · tierra rara':''}</p>${rel?`<p style="margin:0">${rel}</p>`:''}</div>`;
 $$('#pt .el').forEach(e=>e.classList.toggle('sel',+e.dataset.z===z));
 ptClicked.add(z);if(ptClicked.size>=5)unlock('table')}
$('#pt').addEventListener('click',e=>{const b=e.target.closest('.el');if(b)ptShow(+b.dataset.z)});
$('#ptFilter').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const f=PF[b.dataset.pf];
 $$('#ptFilter button').forEach(x=>x.setAttribute('aria-pressed',x===b));$$('#pt .el').forEach(el=>el.classList.toggle('dim',!f(+el.dataset.z)))});
ptShow(39);ptClicked.clear();

/* ---------- Átomo de Bohr ---------- */
const SH=[2,8,18,9,2],KEEP_ION=[2,8,18,8,0],RAD=[50,76,102,128,154],PER=[16,24,34,46,60];
let ion=false,iso=89;
(function(){let h=`<circle class="nuc" r="30"/><text class="nuc-t" id="nucP" y="-3"></text><text class="nuc-t" id="nucN" y="11"></text>`;
 SH.forEach((n,i)=>{h+=`<circle class="orbit" r="${RAD[i]}"/><g class="sh" style="animation-duration:${PER[i]}s;animation-direction:${i%2?'reverse':'normal'}">`;
  for(let j=0;j<n;j++){const a=(2*Math.PI/n)*j+i*.6;h+=`<circle class="e${i===4?' val':''}" data-s="${i}" data-j="${j}" cx="${(RAD[i]*Math.cos(a)).toFixed(1)}" cy="${(RAD[i]*Math.sin(a)).toFixed(1)}" r="5"/>`}h+='</g>'});
 $('#atomG').innerHTML=h})();
$('#isoSeg').innerHTML=[87,88,89,90,91].map(a=>`<button type="button" data-a="${a}" aria-pressed="${a===89}"><sup>${a}</sup>Y</button>`).join('');
function updAtom(){
 const N=iso-39,E=ion?36:39;
 $$('#atomG .e').forEach(e=>e.classList.toggle('lost',ion&&+e.dataset.j>=KEEP_ION[+e.dataset.s]));
 $('#nucP').textContent='39 p⁺';$('#nucN').textContent=N+' n⁰';
 $('#aA').textContent=iso;$('#aN').textContent=N;$('#aE').textContent=E;
 $('#aC').textContent=ion?'[Kr]':'[Kr] 4d¹ 5s²';
 const I=ISO[iso];$('#aS').innerHTML=I.st?'<span class="badge ok">Estable (natural)</span>':'<span class="badge warn">Radiactivo</span> t½ = '+fmt(I.t)+' '+(I.u==='h'?'h':'días');
 $('#aEq').textContent='A = Z + N → '+iso+' = 39 + '+N+(ion?'   ·   Y³⁺: 39 − 3 = 36 e⁻':'')}
$$('[data-ion]').forEach(b=>b.addEventListener('click',()=>{ion=b.dataset.ion==='1';$$('[data-ion]').forEach(x=>x.setAttribute('aria-pressed',x===b));updAtom()}));
$('#isoSeg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;iso=+b.dataset.a;$$('#isoSeg button').forEach(x=>x.setAttribute('aria-pressed',x===b));updAtom()});
updAtom();

/* ---------- Configuración electrónica ---------- */
const ORB=[['1s',2],['2s',2],['2p',6],['3s',2],['3p',6],['4s',2],['3d',10],['4p',6],['5s',2],['4d',10]];
const NOBLE=[[36,'Kr'],[18,'Ar'],[10,'Ne'],[2,'He']];
let eN=39,prevFill=null,playing=null;
$('#orbs').innerHTML=ORB.map(([o,c],i)=>`<div class="sub" data-i="${i}"><span class="nm">${o}</span><div class="boxes">${'<span class="box"><span></span><span></span></span>'.repeat(c/2)}</div></div>`).join('');
function fill(n){let left=n;return ORB.map(([,c])=>{const k=Math.min(c,left);left-=k;return k})}
function cfgStr(f,from=0){return ORB.map(([o],i)=>i>=from&&f[i]?o+sup(f[i]):'').filter(Boolean).join(' ')}
function updCfg(){
 const f=fill(eN),z=eN;$('#eRange').value=z;$('#eOut').textContent=z;
 let lastI=-1;f.forEach((k,i)=>{if(k)lastI=i});
 $$('#orbs .sub').forEach((s,i)=>{const k=f[i],c=ORB[i][1],m=c/2;
  s.classList.toggle('full',k===c);s.classList.toggle('cur',i===lastI&&k<c);
  $$('.box',s).forEach((b,j)=>{const up=j<Math.min(k,m),dn=j<k-m;const sp=b.children;
   const wasUp=prevFill&&j<Math.min(prevFill[i],m),wasDn=prevFill&&j<prevFill[i]-m;
   sp[0].textContent=up?'↑':'';sp[1].textContent=dn?'↓':'';
   sp[0].classList.toggle('pop',up&&!wasUp&&!!prevFill);sp[1].classList.toggle('pop',dn&&!wasDn&&!!prevFill)})});
 prevFill=f;
 $('#cfgEl').innerHTML=z?`<div class="mini${z===39?' me':''}"><span><small>${z}</small><br><b>${SYM[z-1]}</b></span></div><div><b style="font-family:var(--f-display);font-size:1.2rem">${NAMES[z-1]}</b><br><span class="muted small">Con ${z} electrones (átomo neutro) serías este elemento${z===39?' — ¡el itrio!':''}.</span></div>`:'<span class="muted">Sin electrones: solo el núcleo.</span>';
 $('#cfgFull').innerHTML=z?cfgStr(f):'—';
 const ng=NOBLE.find(([n])=>n<z);
 if(ng){let acc=0,from=0;for(let i=0;i<ORB.length;i++){acc+=ORB[i][1];if(acc===ng[0]){from=i+1;break}}
  const rest=ORB.map(([o],i)=>i>=from&&f[i]?[o,f[i]]:null).filter(Boolean).sort((a,b)=>a[0][0]-b[0][0]||'spdf'.indexOf(a[0][1])-'spdf'.indexOf(b[0][1]));
  $('#cfgShort').textContent='Abreviada: ['+ng[1]+'] '+rest.map(([o,k])=>o+sup(k)).join(' ')}
 else $('#cfgShort').textContent='';
 $('#cfgNote').innerHTML=z===24?'<div class="note">Excepción real: el cromo es [Ar] 3d⁵ 4s¹, porque un subnivel d a medio llenar es más estable.</div>':z===29?'<div class="note">Excepción real: el cobre es [Ar] 3d¹⁰ 4s¹, porque un subnivel d lleno es más estable.</div>':z===39?'<div class="note" style="border-color:var(--green);background:var(--green-soft)">El electrón 39 entra en el 4d. ¡Así queda el itrio!</div>':''}
$('#eRange').addEventListener('input',e=>{stopPlay();eN=+e.target.value;updCfg()});
$('#eMinus').addEventListener('click',()=>{stopPlay();eN=Math.max(0,eN-1);updCfg()});
$('#ePlus').addEventListener('click',()=>{stopPlay();eN=Math.min(39,eN+1);updCfg();if(eN===39)happy(comp)});
function stopPlay(){if(playing){clearInterval(playing);playing=null;$('#ePlay').textContent='▶ Llenar desde cero'}}
$('#ePlay').addEventListener('click',()=>{if(playing){stopPlay();return}eN=0;prevFill=null;updCfg();$('#ePlay').textContent='■ Detener';
 playing=setInterval(()=>{eN++;updCfg();if(eN>=39){stopPlay();unlock('cfg');compMood('blanca','¡39 electrones! Ese soy yo: [Kr] 4d¹ 5s².',5000);happy(comp)}},reduced?40:170)});
updCfg();
(function(){const rows=[['1s'],['2s','2p'],['3s','3p','3d'],['4s','4p','4d','4f'],['5s','5p','5d','5f']];
 const X=l=>40+l*58,Y=n=>28+(n-1)*46;const filled=new Set(ORB.map(o=>o[0]));let h='<defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--red)"/></marker></defs>';
 for(let s=1;s<=6;s++){const cells=[];for(let n=1;n<=5;n++){const l=s-n;if(l>=0&&l<n&&l<=3)cells.push([n,l])}if(!cells.length)continue;
  const a=cells[0],b=cells[cells.length-1];const x1=X(a[1])+16,y1=Y(a[0])-12,x2=X(b[1])-12,y2=Y(b[0])+14;
  h+=`<line class="arr" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" marker-end="url(#ah)"/>`}
 rows.forEach((r,n)=>r.forEach((o,l)=>{h+=`<text x="${X(l)}" y="${Y(n+1)+4}" style="${filled.has(o)?'':'opacity:.35;font-weight:400'}">${o}</text>`}));
 $('#moeller').innerHTML=h})();

/* ---------- Propiedades ---------- */
const tR=$('#tRange');
function updT(){const T=+tR.value;$('#tOut').textContent=T+' °C ('+fmt(T+273.15,0)+' K)';
 $('#tPin').style.left=((T+200)/3700*100)+'%';
 $('#tState').innerHTML=T<1526?'A esa temperatura el itrio es <b>sólido</b>'+(Math.abs(T-20)<=10?' (temperatura ambiente).':'.'):T<2930?'A esa temperatura el itrio es <b>líquido</b>.':'A esa temperatura el itrio es <b>gas</b>.'}
tR.addEventListener('input',updT);updT();
const METALS=[['Aluminio',2.70,660],['Itrio',4.47,1526],['Titanio',4.51,1668],['Hierro',7.87,1538],['Plomo',11.34,327]];
function drawDens(p){const k=p==='d'?1:2,max=Math.max(...METALS.map(m=>m[k]));
 $('#dens').innerHTML=METALS.map(m=>`<div class="${m[0]==='Itrio'?'y':''}"><span>${m[0]}</span><span class="tr"><i style="width:${m[k]/max*100}%"></i></span><span>${p==='d'?fmt(m[1],2):m[2]+' °C'}</span></div>`).join('');
 $('#densNote').textContent=p==='d'?'El itrio pesa casi lo mismo que el titanio y bastante menos que el hierro.':'Funde a una temperatura parecida a la del hierro y muy por encima del aluminio o el plomo.'}
$('#densSeg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('#densSeg button').forEach(x=>x.setAttribute('aria-pressed',x===b));drawDens(b.dataset.p)});
drawDens('d');

/* ---------- Enlaces ---------- */
const tabs=$$('[role=tab]');
function selTab(t){tabs.forEach(x=>{const on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;$('#'+x.getAttribute('aria-controls')).hidden=!on})}
tabs.forEach((t,i)=>{t.addEventListener('click',()=>selTab(t));t.addEventListener('keydown',e=>{
 if(e.key==='ArrowRight'||e.key==='ArrowLeft'){const n=tabs[(i+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length];selTab(n);n.focus()}})});
(function(){let h='';for(let r=0;r<3;r++)for(let c=0;c<4;c++){const x=45+c*70+(r%2?35:0),y=38+r*48;if(x<280)h+=`<circle class="cat" cx="${x}" cy="${y}" r="17"/><text x="${x}" y="${y+4}">Y³⁺</text>`}
 let s=7;const rnd=()=>(s=(s*9301+49297)%233280)/233280;
 for(let i=0;i<20;i++)h+=`<circle class="fe" cx="${(20+rnd()*260).toFixed(0)}" cy="${(14+rnd()*140).toFixed(0)}" r="3.2" style="--dx:${(rnd()*30-15).toFixed(0)}px;--dy:${(rnd()*24-12).toFixed(0)}px;animation-delay:-${(rnd()*5).toFixed(1)}s"/>`;
 $('#metalSvg').innerHTML=h})();
const gcd=(a,b)=>b?gcd(b,a%b):a;
$('#ionPick').innerHTML=ANIONS.map((a,i)=>`<button class="chip" type="button" data-i="${i}" aria-pressed="${i===0}">${sub(a[0])}${sup(a[1]==='1'?'':a[1])}⁻</button>`).join('');
function ionBuild(i){const[s,cs,name]=ANIONS[i],c=+cs,l=3*c/gcd(3,c),nY=l/3,nA=l/c,poly=s.length>2||/[a-z]?[A-Z]/.test(s.slice(1));
 const fY='Y'+(nY>1?nY:''),fA=nA>1?(poly?`(${s})${nA}`:s+nA):s,f=fY+fA;
 const chip=(t,cl,n)=>Array.from({length:n},()=>`<span class="c ${cl}">${t}</span>`).join('');
 const an=sub(s)+sup(c===1?'':c)+'⁻';
 $('#ionBuild').innerHTML=`${chip('Y³⁺','p',nY)}<span>+</span>${chip(an,'n',nA)}<span>→</span><span class="c r">${sub(f)}</span>`;
 $('#ionEq').innerHTML=`${name} de itrio · ${nY} × (+3) + ${nA} × (−${c}) = 0 · <button class="btn sm" type="button" id="ionCalc" data-f="${f}">Calcular su masa molar →</button>`}
$('#ionPick').addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;$$('#ionPick .chip').forEach(x=>x.setAttribute('aria-pressed',x===b));ionBuild(+b.dataset.i)});
$('#ionEq').addEventListener('click',e=>{const b=e.target.closest('#ionCalc');if(!b)return;$('#fIn').value=b.dataset.f;calc(false);$('#calculadora').scrollIntoView({behavior:reduced?'auto':'smooth'})});
ionBuild(0);

/* ---------- Laboratorio de cálculo ---------- */
const NA=6.02214076e23;
function parseFormula(raw){
 let s=raw.replace(/[₀-₉]/g,d=>SUBS.indexOf(d)).replace(/\s+/g,'').replace(/[·*]/g,'.');
 if(!s)throw new Error('Escribe una fórmula, por ejemplo Y2O3.');
 const total={};
 s.split('.').forEach(part=>{if(!part)return;let m=part.match(/^(\d+)(.*)$/),k=1;if(m){k=+m[1];part=m[2]}
  let i=0;
  function group(){const out={};while(i<part.length){const ch=part[i];
    if(ch==='('||ch==='['){i++;const g=group();if(part[i]!==')'&&part[i]!==']')throw new Error('Falta cerrar un paréntesis.');i++;const n=num();for(const e in g)out[e]=(out[e]||0)+g[e]*n}
    else if(ch===')'||ch===']')return out;
    else if(/[A-Z]/.test(ch)){let el=ch;i++;if(/[a-z]/.test(part[i]||'')){el+=part[i];i++}if(!MASS[el])throw new Error(`No conozco el elemento «${el}». Revisa mayúsculas y minúsculas (Co ≠ CO).`);const n=num();out[el]=(out[el]||0)+n}
    else throw new Error(`No entiendo el carácter «${ch}».`)}
   return out}
  function num(){let d='';while(/\d/.test(part[i]||'')){d+=part[i];i++}return d?+d:1}
  const g=group();if(i<part.length)throw new Error('Hay un paréntesis de cierre de más.');
  for(const e in g)total[e]=(total[e]||0)+g[e]*k});
 if(!Object.keys(total).length)throw new Error('Escribe una fórmula, por ejemplo Y2O3.');
 return total}
const sci=x=>{if(!isFinite(x)||x===0)return'0';const e=Math.floor(Math.log10(Math.abs(x)));const m=x/10**e;return fmt(m,3)+' × 10'+sup(e)};
const ELCOL=['var(--accent)','var(--red)','var(--teal)','var(--violet)','var(--green)','var(--ink-2)'];
$('#fChips').innerHTML=FORMULAS.map(([f,n])=>`<button class="chip" type="button" data-f="${f}" title="${n}">${sub(f)}</button>`).join('');
$('#fChips').addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;$('#fIn').value=b.dataset.f;calc(false)});
function calc(user){
 const fi=$('#fIn'),raw=fi.value;$$('#fChips .chip').forEach(c=>c.setAttribute('aria-pressed',c.dataset.f===raw.replace(/\s/g,'')));
 let comp;try{comp=parseFormula(raw);fi.setAttribute('aria-invalid','false');$('#fErr').textContent=''}catch(err){fi.setAttribute('aria-invalid','true');$('#fErr').textContent=err.message;return}
 const els=Object.keys(comp),M=els.reduce((s,e)=>s+comp[e]*MASS[e],0),g=Math.max(0,parseFloat($('#gIn').value)||0),n=g/M;
 const pctY=comp.Y?comp.Y*MASS.Y/M*100:0,pretty=sub(raw.replace(/\s/g,''));
 const atoms=els.reduce((s,e)=>s+comp[e],0);
 $('#cRes').innerHTML=`<div class="res"><span>Masa molar de ${pretty}</span><b>${fmt(M,2)} g/mol</b></div>
  <div class="res"><span>Moles en ${fmt(g,3)} g</span><b>${n<0.001&&n>0?sci(n):fmt(n,4)} mol</b></div>
  <div class="res"><span>Unidades fórmula</span><b>${sci(n*NA)}</b></div>
  <div class="res y"><span>${comp.Y?'Itrio contenido':'Itrio'}</span><b>${comp.Y?fmt(g*pctY/100,3)+' g':'No tiene'}</b>${comp.Y?`<span>${fmt(pctY,1)} % de la masa</span>`:''}</div>`;
 let ci=0;const col=e=>e==='Y'?'var(--yag)':ELCOL[(ci++)%ELCOL.length];const cols={};els.forEach(e=>cols[e]=col(e));
 $('#cStack').innerHTML=els.map(e=>`<i style="width:${comp[e]*MASS[e]/M*100}%;background:${cols[e]}" title="${e}"></i>`).join('');
 $('#cTbl').innerHTML=els.map(e=>`<tr><td><span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${cols[e]};margin-right:8px"></span><b>${e}</b> · ${NAMES[SYM.indexOf(e)]}</td><td>${comp[e]}</td><td>${fmt(MASS[e],3)}</td><td>${fmt(comp[e]*MASS[e],3)}</td><td>${fmt(comp[e]*MASS[e]/M*100,2)} %</td></tr>`).join('');
 $('#cSteps').innerHTML=`1) M = ${els.map(e=>`${comp[e]} × ${fmt(MASS[e],3)}`).join(' + ')}<br>&nbsp;&nbsp;&nbsp;M = ${fmt(M,3)} g/mol<br>2) n = m / M = ${fmt(g,3)} / ${fmt(M,3)} = ${fmt(n,5)} mol<br>3) Unidades = n × 6,022 × 10²³ = ${sci(n*NA)}<br>4) Átomos totales = ${atoms} × ${sci(n*NA)} = ${sci(n*NA*atoms)}${comp.Y?`<br>5) % Y = ${comp.Y} × 88,906 / ${fmt(M,3)} × 100 = ${fmt(pctY,2)} %`:''}`;
 if(user&&!FORMULAS.some(f=>f[0]===raw.replace(/\s/g,''))&&raw.replace(/\s/g,'').length>1)unlock('lab')}
$('#fIn').addEventListener('input',()=>calc(true));$('#gIn').addEventListener('input',()=>calc(false));
calc(false);

/* ---------- Espectro ---------- */
function nmRGB(w){let r=0,g=0,b=0;
 if(w<440){r=-(w-440)/60;b=1}else if(w<490){g=(w-440)/50;b=1}else if(w<510){g=1;b=-(w-510)/20}else if(w<580){r=(w-510)/70;g=1}else if(w<645){r=1;g=-(w-645)/65}else r=1;
 const f=w<420?.3+.7*(w-380)/40:w>700?.3+.7*(750-w)/50:1;return `rgb(${Math.round(255*r*f)},${Math.round(255*g*f)},${Math.round(255*b*f)})`}
(function(){const L0=Math.log10(300),L1=Math.log10(3500),X=nm=>30+(Math.log10(nm)-L0)/(L1-L0)*580;const x0=X(380),x1=X(750);
 let st='';for(let w=380;w<=750;w+=10)st+=`<stop offset="${((X(w)-x0)/(x1-x0)).toFixed(3)}" stop-color="${nmRGB(w)}"/>`;
 let h=`<defs><linearGradient id="vis" x1="0" x2="1">${st}</linearGradient><linearGradient id="ir" x1="0" x2="1"><stop offset="0" stop-color="#5a0c18"/><stop offset="1" stop-color="#1a0408"/></linearGradient><linearGradient id="uv" x1="0" x2="1"><stop offset="0" stop-color="#12062a"/><stop offset="1" stop-color="#3d1670"/></linearGradient></defs>`;
 h+=`<rect x="30" y="72" width="${x0-30}" height="28" fill="url(#uv)" rx="4"/><rect x="${x0}" y="72" width="${x1-x0}" height="28" fill="url(#vis)"/><rect x="${x1}" y="72" width="${610-x1}" height="28" fill="url(#ir)" rx="4"/>`;
 h+=`<rect x="${X(500)}" y="102" width="${X(650)-X(500)}" height="5" rx="2" fill="#f4c400" opacity=".75"/>`;
 [300,400,500,700,1000,2000,3000].forEach(w=>{h+=`<line x1="${X(w)}" x2="${X(w)}" y1="109" y2="114" stroke="var(--ink-2)"/><text class="tick" x="${X(w)}" y="126">${w}</text>`});
 h+=`<text class="zone" x="${X(330)}" y="148" text-anchor="middle">UV</text><text class="zone" x="${(x0+x1)/2}" y="148" text-anchor="middle">visible</text><text class="zone" x="${X(1800)}" y="148" text-anchor="middle">infrarrojo · nm</text>`;
 const LV={450:50,532:30,560:12,611:50,1064:50,2940:50};
 SPEC.forEach(([nm,lab,col,t],i)=>{const x=X(nm),y=LV[nm];h+=`<g class="mk" data-i="${i}" tabindex="0" role="button" aria-label="${t}, ${nm} nanómetros"><line x1="${x}" x2="${x}" y1="${y+10}" y2="100"/><circle cx="${x}" cy="${y+8}" r="6" fill="${col}"/><text x="${x}" y="${y-2}">${lab}</text></g>`});
 $('#spec').innerHTML=h})();
function specShow(i){const[nm,,col,t,d,m]=SPEC[i];$$('#spec .mk').forEach(g=>g.classList.toggle('on',+g.dataset.i===i));
 const ir=nm>750;$('#specInfo').innerHTML=`<span class="swatch" style="background:${ir?'repeating-linear-gradient(45deg,#3a0810 0 6px,#5a0c18 6px 12px)':col}" aria-hidden="true"></span><div><b>${t}</b> · <span class="mono">${nm} nm${ir?' (invisible)':''}</span><p class="small muted" style="margin:4px 0 0">${d}</p>${m?`<button class="btn sm" type="button" data-demo="${m}" style="margin-top:8px">Que Itri lo muestre</button>`:''}</div>`}
$('#spec').addEventListener('click',e=>{const g=e.target.closest('.mk');if(g)specShow(+g.dataset.i)});
$('#spec').addEventListener('keydown',e=>{const g=e.target.closest('.mk');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();specShow(+g.dataset.i)}});
specShow(3);

/* ---------- Aplicaciones ---------- */
$('#apps').innerHTML=APPS.map(a=>`<article class="app" data-cat="${a[1]}"><span class="cat-l">${a[1].split(' ').map(c=>CATN[c]).join(' · ')}</span><h3>${a[0]}</h3><span class="fm">${a[2]}</span><p>${a[3]}</p>${a[4]?`<button class="btn" type="button" data-demo="${a[4]}">Que Itri lo demuestre</button>`:''}</article>`).join('');
document.addEventListener('click',e=>{const b=e.target.closest('[data-demo]');if(!b)return;const m=b.dataset.demo;compMood(m,MOODS[m],9000);comp.face('open');setTimeout(()=>comp.face('smile'),1500)});
$('#appFilter').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const f=b.dataset.f;
 $$('#appFilter button').forEach(x=>x.setAttribute('aria-pressed',x===b));
 $$('.app').forEach(c=>c.hidden=!(f==='all'||c.dataset.cat.split(' ').includes(f)))});

/* ---------- Extracción ---------- */
let st=0;
function drawSteps(){
 $('#steps').innerHTML=STEPS.map((s,i)=>`<button type="button" data-i="${i}" ${i===st?'aria-current="step"':''} class="${i<st?'done':''}"><span class="n">Etapa ${i+1}</span>${s[0]}</button>`).join('');
 const s=STEPS[st];
 $('#stepBody').innerHTML=`<p class="eyebrow">Etapa ${st+1} de ${STEPS.length}</p><h3>${s[0]}</h3><p>${s[1]}</p>${s[2]?`<div class="eqn">${s[2].split('\n').join('<br>')}</div>`:''}<div class="step-nav"><button class="btn" type="button" id="stPrev" ${st===0?'disabled':''}>Anterior</button><button class="btn primary" type="button" id="stNext" ${st===STEPS.length-1?'disabled':''}>Siguiente</button></div>`}
$('#steps').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;st=+b.dataset.i;drawSteps()});
$('#stepBody').addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;st+=b.id==='stNext'?1:-1;drawSteps()});
drawSteps();
const SX_BETA=1.12,SX_ODDS0=1.5,SX_TARGET=Math.ceil(Math.log(9999/SX_ODDS0)/Math.log(SX_BETA));
function updSx(){const n=+$('#sxRange').value,o=SX_ODDS0*SX_BETA**n,p=o/(1+o)*100;
 $('#sxOut').textContent=n;$('#sxPct').textContent=(p>=99.99?fmt(Math.min(p,99.9999),4):p>=99?fmt(p,2):fmt(p,1))+' %';$('#sxBar').style.width=p+'%';
 $('#sxNote').innerHTML=(n>=SX_TARGET?`<b style="color:var(--green)">¡Pureza de 99,99 % alcanzada!</b> `:'')+`Modelo simplificado: la mezcla empieza con 60 % de itrio y cada etapa lo favorece apenas un 12 %. Se llega a 99,99 % en la etapa <b>${SX_TARGET}</b>. Por eso las plantas reales encadenan decenas o cientos de etapas.`}
$('#sxRange').addEventListener('input',updSx);updSx();

/* ---------- Decaimiento ---------- */
let dIso=90,dn=1,randT=null,decRaf=0;
$('#decSeg').innerHTML=[87,88,90,91].map(a=>`<button type="button" data-a="${a}" aria-pressed="${a===90}"><sup>${a}</sup>Y</button>`).join('');
$('#dots').innerHTML='<i></i>'.repeat(100);
$('#isoTbl').innerHTML=Object.keys(ISO).map(a=>{const I=ISO[a];return `<tr><td><b>${SUP[a]}Y</b></td><td>${I.st?'Estable':fmt(I.t)+(I.u==='h'?' horas':' días')}</td><td>${I.st?'No se desintegra':I.mode}</td><td>${I.st?'—':I.prod}</td></tr>`}).join('');
const DX=n=>44+n/6*356,DY=p=>200-p/100*184;
(function(){let h='';
 [0,25,50,75,100].forEach(p=>h+=`<line class="ax" x1="44" x2="400" y1="${DY(p)}" y2="${DY(p)}"/><text class="axt" x="38" y="${DY(p)+3}" text-anchor="end">${p}</text>`);
 for(let n=0;n<=6;n++)h+=`<text class="axt" x="${DX(n)}" y="216" text-anchor="middle">${n}</text>`;
 let d='';for(let n=0;n<=6.001;n+=.1)d+=(d?'L':'M')+DX(n).toFixed(1)+' '+DY(100*Math.pow(2,-n)).toFixed(1);
 h+=`<path class="area" d="${d}L${DX(6)} 200L44 200Z"/><path class="curve" d="${d}"/>`;
 h+=`<line class="guide" id="gV" y1="200" y2="200"/><line class="guide" id="gH" x1="44"/><circle class="dot-m" id="dM" r="6"/>`;
 h+=`<text class="axt" x="222" y="233" text-anchor="middle">Semividas (n)</text><text class="axt" x="6" y="10">% de átomos</text>`;
 $('#decChart').innerHTML=h})();
function updDec(){
 const p=100*Math.pow(2,-dn),I=ISO[dIso],T=dn*I.t;
 $('#nOut').textContent=fmt(dn,2);
 const alive=randT?randT.filter(t=>t>dn).length:Math.round(p);
 $('#pctOut').textContent=randT?alive+' de 100':fmt(p,1)+' %';
 $('#timeOut').textContent=fmt(dn,2)+' × '+fmt(I.t)+(I.u==='h'?' h':' días')+' = '+fmt(T)+(I.u==='h'?' h':' días')+(I.u==='h'&&T>=48?' (≈ '+fmt(T/24)+' días)':'')+(randT?` · la curva predice ${fmt(p,1)}`:'');
 $('#gV').setAttribute('x1',DX(dn));$('#gV').setAttribute('x2',DX(dn));$('#gV').setAttribute('y1',DY(p));
 $('#gH').setAttribute('x2',DX(dn));$('#gH').setAttribute('y1',DY(p));$('#gH').setAttribute('y2',DY(p));
 $('#dM').setAttribute('cx',DX(dn));$('#dM').setAttribute('cy',DY(p));
 $$('#dots i').forEach((d,i)=>d.classList.toggle('on',randT?randT[i]>dn:i<alive))}
$('#nRange').addEventListener('input',e=>{cancelAnimationFrame(decRaf);randT=null;dn=+e.target.value;updDec()});
$('#decSeg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;dIso=+b.dataset.a;$$('#decSeg button').forEach(x=>x.setAttribute('aria-pressed',x===b));updDec();updDose()});
$('#decPlay').addEventListener('click',()=>{cancelAnimationFrame(decRaf);randT=Array.from({length:100},()=>-Math.log2(1-Math.random()));
 const t0=performance.now(),D=reduced?1:7000;(function step(t){dn=Math.min(6,(t-t0)/D*6);$('#nRange').value=dn;updDec();if(dn<6)decRaf=requestAnimationFrame(step)})(t0)});
updDec();
function updDose(){const a0=parseFloat($('#a0In').value)||0,h=Math.max(0,parseFloat($('#hIn').value)||0),th=64.1,a=a0*Math.pow(.5,h/th);
 $('#doseOut').innerHTML=`A = ${fmt(a0,2)} × (½)<sup>${fmt(h,2)} / 64,1</sup> = ${fmt(a0,2)} × ${fmt(Math.pow(.5,h/th),4)} = <b>${fmt(a,2)} %</b><br>Han pasado ${fmt(h/th,2)} semividas · queda ${fmt(a/a0*100||0,1)} % de la actividad inicial.`}
$('#a0In').addEventListener('input',updDose);$('#hIn').addEventListener('input',updDose);updDose();

/* ---------- Tarjetas giratorias ---------- */
$('#flips').innerHTML=FL.map(f=>`<button class="flip" type="button" aria-pressed="false"><span class="face f"><small>Dato</small><h3>${f[0]}</h3><small>Toca para girar</small></span><span class="face b">${f[1]}</span></button>`).join('');
$('#flips').addEventListener('click',e=>{const b=e.target.closest('.flip');if(b)b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true')});

/* ---------- Juego de parejas ---------- */
let mDeck=[],mOpen=[],mMoves=0,mDone=0,mT0=0,mTimer=null,mLock=false;
const mFmt=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
function mBest(){const b=store.json('itrio-memo',null);$('#gBest').textContent=b?`${b.m} mov · ${mFmt(b.s)}`:'—'}
function mNew(){clearInterval(mTimer);mTimer=null;mOpen=[];mMoves=0;mDone=0;mLock=false;$('#gMoves').textContent=0;$('#gTime').textContent='0:00';
 mDeck=shuffle(PAIRS.flatMap((p,i)=>[{p:i,t:p[0],k:'m'},{p:i,t:p[1],k:'u'}]));
 $('#memo').innerHTML=mDeck.map((c,i)=>`<button class="mc" type="button" data-i="${i}" aria-pressed="false" aria-label="Carta ${i+1}"><span class="face f">Y</span><span class="face b ${c.k}">${c.k==='m'?`<b>${c.t}</b>`:c.t}</span></button>`).join('');mBest()}
$('#memo').addEventListener('click',e=>{const b=e.target.closest('.mc');if(!b||mLock||b.getAttribute('aria-pressed')==='true')return;
 if(!mTimer){mT0=Date.now();mTimer=setInterval(()=>$('#gTime').textContent=mFmt(Math.floor((Date.now()-mT0)/1000)),1000)}
 b.setAttribute('aria-pressed','true');b.setAttribute('aria-label',mDeck[+b.dataset.i].t);mOpen.push(b);
 if(mOpen.length<2)return;mMoves++;$('#gMoves').textContent=mMoves;const[a,c]=mOpen;mOpen=[];
 if(mDeck[+a.dataset.i].p===mDeck[+c.dataset.i].p){a.classList.add('ok');c.classList.add('ok');mDone++;
  if(mDone===PAIRS.length){clearInterval(mTimer);const s=Math.floor((Date.now()-mT0)/1000),b0=store.json('itrio-memo',null);
   if(!b0||mMoves<b0.m||(mMoves===b0.m&&s<b0.s))store.put('itrio-memo',{m:mMoves,s});mBest();unlock('memo');confetti();
   compMood('blanca',`¡Completado en ${mMoves} movimientos y ${mFmt(s)}!`,6000);happy(comp)}}
 else{mLock=true;a.classList.add('bad');c.classList.add('bad');setTimeout(()=>{[a,c].forEach(x=>{x.classList.remove('bad');x.setAttribute('aria-pressed','false');x.setAttribute('aria-label','Carta '+(+x.dataset.i+1))});mLock=false},900)}});
$('#gNew').addEventListener('click',mNew);mNew();

/* ---------- Fichas (Leitner) ---------- */
let boxes=store.json('itrio-boxes',null);if(!Array.isArray(boxes)||boxes.length!==CARDS.length)boxes=CARDS.map(()=>1);
let fcI=-1,fcLast=-1;
function fcPick(){const by=[1,2,3].map(b=>boxes.map((x,i)=>x===b?i:-1).filter(i=>i>=0&&i!==fcLast));
 const w=[.6,.3,.1].map((p,k)=>by[k].length?p:0),sum=w.reduce((a,b)=>a+b,0);
 if(!sum)return boxes.findIndex((_,i)=>i!==fcLast);
 let r=Math.random()*sum;for(let k=0;k<3;k++){if(r<w[k])return rand(by[k]);r-=w[k]}return rand(by.flat())}
function fcDraw(){const c=[1,2,3].map(b=>boxes.filter(x=>x===b).length);
 $('#leit').innerHTML=c.map((n,k)=>`<div class="box3 b${k+1}"><b>${n}</b><span>Caja ${k+1} · ${['por aprender','repasando','dominadas'][k]}</span></div>`).join('');
 if(c[2]>=10)unlock('cards')}
function fcNext(){fcLast=fcI;fcI=fcPick();const[f,b]=CARDS[fcI];const card=$('#fcard');card.setAttribute('aria-pressed','false');
 setTimeout(()=>{$('#fcF').innerHTML=`<span>${f}<small>Caja ${boxes[fcI]} · toca para ver la respuesta</small></span>`;$('#fcB').innerHTML=`<span>${b}<small>¿Lo sabías?</small></span>`},card.dataset.flipped?220:0);card.dataset.flipped='';fcDraw()}
function fcFlip(){const c=$('#fcard');const on=c.getAttribute('aria-pressed')!=='true';c.setAttribute('aria-pressed',on);if(on)c.dataset.flipped='1'}
function fcAnswer(ok){boxes[fcI]=ok?Math.min(3,boxes[fcI]+1):1;store.put('itrio-boxes',boxes);if(ok&&boxes[fcI]===3)comp.jump();fcNext()}
$('#fcard').addEventListener('click',fcFlip);
$('#fcYes').addEventListener('click',()=>fcAnswer(true));$('#fcNo').addEventListener('click',()=>fcAnswer(false));
$('#fcReset').addEventListener('click',()=>{boxes=CARDS.map(()=>1);store.put('itrio-boxes',boxes);fcNext();toast('Cajas reiniciadas')});
fcNext();

/* ---------- Glosario ---------- */
let glLetter='';
const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
$('#glLetters').innerHTML=['Todas',...[...new Set(GLOSS.map(g=>norm(g[0])[0].toUpperCase()))].sort()].map(l=>`<button type="button" data-l="${l==='Todas'?'':l}" aria-pressed="${l==='Todas'}" ${l==='Todas'?'style="width:auto;padding:0 10px"':''}>${l}</button>`).join('');
function glDraw(){const q=norm($('#glIn').value.trim());const hl=t=>{if(!q)return t;const n=norm(t),i=n.indexOf(q);return i<0?t:t.slice(0,i)+'<mark>'+t.slice(i,i+q.length)+'</mark>'+t.slice(i+q.length)};
 const items=GLOSS.filter(([t,d])=>(!glLetter||norm(t)[0].toUpperCase()===glLetter)&&(!q||norm(t+' '+d).includes(q)));
 $('#glList').innerHTML=items.length?items.map(([t,d])=>`<div class="gl-item" id="gl-${norm(t).replace(/\W+/g,'-')}"><dt>${hl(t)}</dt><dd>${hl(d)}</dd></div>`).join(''):'<p class="muted" style="padding:12px 0">No hay términos con esa búsqueda.</p>'}
$('#glIn').addEventListener('input',glDraw);
$('#glLetters').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;glLetter=b.dataset.l;$$('#glLetters button').forEach(x=>x.setAttribute('aria-pressed',x===b));glDraw()});
glDraw();

/* ---------- Quiz ---------- */
const qb=$('#quizBox');
const MODES={rapido:['Rápido','10 preguntas al azar.'],completo:['Completo','Las 30 preguntas.'],reloj:['Contrarreloj','Todas las que puedas en 90 segundos.']};
let qMode=null,qList=[],qi=0,qs=0,res=[],ans=false,qOrder=[],streak=0,qTimer=null,qLeft=0;
function qBest(m){return store.json('itrio-best2',{})[m]}
function drawModes(){clearInterval(qTimer);qMode=null;
 qb.innerHTML=`<div class="q-text" style="margin-bottom:6px">Elige un modo</div><p class="muted small">Las respuestas se barajan cada vez. Tras cada pregunta verás la explicación.</p><div class="modes">${Object.entries(MODES).map(([k,[t,d]])=>{const b=qBest(k);return `<button class="mode" type="button" data-mode="${k}"><b>${t}</b><span>${d}</span><span class="best">${b!=null?'Tu mejor marca: '+b+(k==='reloj'?' aciertos':' / '+(k==='rapido'?10:Q.length)):'Sin intentos'}</span></button>`}).join('')}</div>`}
function startQuiz(m){qMode=m;qi=0;qs=0;res=[];streak=0;const all=shuffle(Q.map((_,i)=>i));qList=m==='rapido'?all.slice(0,10):all;
 if(m==='reloj'){qLeft=90;clearInterval(qTimer);qTimer=setInterval(()=>{qLeft--;const t=$('.q-timer i',qb),l=$('#qLeft',qb);if(t)t.style.width=(qLeft/90*100)+'%';if(l)l.textContent=qLeft+' s';if(qLeft<=0){clearInterval(qTimer);drawEnd()}},1000)}
 drawQ()}
function dotsH(){if(qMode==='reloj')return `<span class="streak">${streak>=2?'🔥 racha de '+streak:''}</span>`;return `<div class="q-dots">${qList.map((_,i)=>`<i class="${res[i]===1?'ok':res[i]===0?'no':i===qi?'cur':''}"></i>`).join('')}</div>`}
function drawQ(){
 if(qi>=qList.length)return drawEnd();
 const q=Q[qList[qi]];ans=false;qOrder=shuffle([0,1,2,3]);
 qb.innerHTML=`<div class="q-top"><span>${qMode==='reloj'?`Aciertos: ${qs} · <span id="qLeft">${qLeft} s</span>`:`Pregunta ${qi+1} de ${qList.length}`}${qMode!=='reloj'&&streak>=2?` · <span class="streak">🔥 ${streak}</span>`:''}</span>${dotsH()}</div>${qMode==='reloj'?`<div class="q-timer"><i style="width:${qLeft/90*100}%"></i></div>`:''}<div class="q-text">${q[0]}</div><div class="opts">${qOrder.map((o,k)=>`<button class="opt" type="button" data-i="${o}"><kbd>${k+1}</kbd><span>${q[1][o]}</span></button>`).join('')}</div><div id="why"></div>`}
function answer(o){if(ans)return;ans=true;const q=Q[qList[qi]],i=+o.dataset.i,ok=i===q[2];res[qi]=ok?1:0;
 if(ok){qs++;streak++}else streak=0;
 $$('.opt',qb).forEach(b=>{b.disabled=true;if(+b.dataset.i===q[2])b.classList.add('ok');else if(b===o)b.classList.add('no')});
 if(qMode==='reloj'){if(ok)comp.jump();setTimeout(()=>{qi++;if(qLeft>0)drawQ()},ok?350:1100);if(!ok)$('#why').innerHTML=`<div class="why"><b>No es esa.</b> ${q[3]}</div>`;return}
 $('#why').innerHTML=`<div class="why"><b>${ok?'Correcto.':'No es esa.'}</b> ${q[3]} ${ok?'':`<a href="#${q[4]}">Repasar el tema →</a>`}</div><div style="margin-top:14px"><button class="btn primary" type="button" id="qNext">${qi===qList.length-1?'Ver resultado':'Siguiente'} <kbd class="mono small">↵</kbd></button></div>`;
 const d=$('.q-top .q-dots',qb);if(d)d.outerHTML=dotsH();
 if(ok){compMood('idle','¡Bien! '+(streak>=3?`Racha de ${streak}. 🔥`:''),3500);happy(comp)}else{comp.face('flat');compSay('Casi. Lee la explicación y sigue.',4000);setTimeout(()=>comp.face('smile'),2500)}}
qb.addEventListener('click',e=>{
 const m=e.target.closest('[data-mode]');if(m)return startQuiz(m.dataset.mode);
 const o=e.target.closest('.opt');if(o&&!ans)return answer(o);
 const id=e.target.closest('button')?.id;
 if(id==='qNext'){qi++;drawQ();qb.scrollIntoView({block:'nearest'})}
 if(id==='qAgain')startQuiz(qMode);
 if(id==='qModes')drawModes()});
addEventListener('keydown',e=>{if(!qMode||curId!=='quiz'||e.target.matches('input,textarea'))return;
 if(/^[1-4]$/.test(e.key)&&!ans){const o=$$('.opt',qb)[+e.key-1];if(o)answer(o)}
 if(e.key==='Enter'&&ans&&$('#qNext')){e.preventDefault();$('#qNext').click()}});
function drawEnd(){clearInterval(qTimer);
 const total=qMode==='reloj'?qi:qList.length,best=store.json('itrio-best2',{}),prev=best[qMode];
 if(prev==null||qs>prev){best[qMode]=qs;store.put('itrio-best2',best)}
 const wrongIdx=qList.filter((_,i)=>res[i]===0);const wrong=[...new Set(wrongIdx.map(i=>Q[i][4]))];
 const ratio=total?qs/total:0;
 const msg=qMode==='reloj'?(qs>=8?'¡Rapidísimo!':'Buen intento. Repasa y vuelve a probar.'):ratio>=.9?'Excelente: dominas el itrio.':ratio>=.6?'Buen trabajo. Repasa lo que falló y repite.':'Vuelve a leer los capítulos marcados y prueba otra vez.';
 qb.innerHTML=`<div class="q-top"><span>Resultado · ${MODES[qMode][0]}</span>${qMode==='reloj'?'':dotsH()}</div><div class="big">${qs} / ${total}</div><p style="margin-top:10px">${msg}</p>${wrong.length?`<p>Para repasar: ${wrong.map(id=>`<a href="#${id}">${CH.find(c=>c[0]===id)[1]}</a>`).join(' · ')}.</p>`:''}${wrongIdx.length?`<details style="margin-bottom:14px"><summary>Ver las ${wrongIdx.length} que fallaste</summary><ul>${wrongIdx.map(i=>`<li><b>${Q[i][0]}</b><br><span class="muted small">${Q[i][1][Q[i][2]]} — ${Q[i][3]}</span></li>`).join('')}</ul></details>`:''}<p style="font-size:.9rem;color:var(--ink-2)">Mejor marca en este navegador: ${Math.max(prev??0,qs)}${qMode==='reloj'?' aciertos':' / '+total}.</p><div class="row"><button class="btn primary" type="button" id="qAgain">Repetir</button><button class="btn" type="button" id="qModes">Cambiar de modo</button><button class="btn" type="button" data-act="share"><svg><use href="#i-share"/></svg>Retar a un amigo</button></div>`;
 if(qMode==='rapido'&&qs===10)unlock('quiz');if(qMode==='reloj'&&qs>=8)unlock('fast');
 if(ratio>=.9&&qMode!=='reloj'||qMode==='reloj'&&qs>=8){confetti();compMood('blanca','¡Perfecto! Me iluminaste.',6000);happy(comp)}}
drawModes();

/* ---------- Buscador ---------- */
const dlg=$('#searchDlg'),sIn=$('#sIn'),sRes=$('#sRes');let sSel=0,sItems=[];
const INDEX=[...CHS.map(s=>({t:s.dataset.title,k:'Capítulo',h:'#'+s.id,x:norm(s.textContent).slice(0,4000)})),
 ...GLOSS.map(([t,d])=>({t,k:'Glosario',h:'#glosario',g:t,x:norm(t+' '+d)})),
 ...APPS.map(a=>({t:a[0]+' · '+a[2],k:'Aplicación',h:'#aplicaciones',x:norm(a.join(' '))})),
 ...FL.map(f=>({t:f[0],k:'Dato curioso',h:'#curiosos',x:norm(f.join(' '))})),
 ...TL.map(t=>({t:t[0]+' · '+t[1],k:'Historia',h:'#historia',x:norm(t.join(' '))}))];
function sDraw(){const q=norm(sIn.value.trim());
 sItems=q?INDEX.filter(it=>it.x.includes(q)||norm(it.t).includes(q)).sort((a,b)=>(norm(b.t).includes(q))-(norm(a.t).includes(q))).slice(0,12):INDEX.filter(it=>it.k==='Capítulo');
 sSel=0;sRes.innerHTML=sItems.length?sItems.map((it,i)=>`<li><a href="${it.h}" role="option" data-i="${i}" aria-selected="${i===0}"><span>${it.t}</span><small>${it.k}</small></a></li>`).join(''):'<li class="empty">Sin resultados. Prueba con «láser», «semivida» o «Gadolin».</li>'}
function sGo(i){const it=sItems[i];if(!it)return;dlg.close();if(it.g){$('#glIn').value=it.g;glDraw()}const t=document.querySelector(it.h);if(t){history.replaceState(null,'',it.h);t.scrollIntoView({behavior:reduced?'auto':'smooth'})}}
function openSearch(){if(!dlg.open){dlg.showModal();sIn.value='';sDraw();sIn.focus()}}
sIn.addEventListener('input',sDraw);
sIn.addEventListener('keydown',e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();sSel=(sSel+(e.key==='ArrowDown'?1:-1)+sItems.length)%sItems.length;$$('a',sRes).forEach((a,i)=>{a.setAttribute('aria-selected',i===sSel);if(i===sSel)a.scrollIntoView({block:'nearest'})})}
 if(e.key==='Enter'){e.preventDefault();sGo(sSel)}});
sRes.addEventListener('click',e=>{const a=e.target.closest('a');if(a){e.preventDefault();sGo(+a.dataset.i)}});
dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});
addEventListener('keydown',e=>{
 if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch();return}
 if(e.key==='/'&&!e.target.matches('input,textarea')){e.preventDefault();openSearch();return}
 if(e.key==='Escape'&&!drawer.hidden)openDrawer(false);
 if(curId==='fichas'&&!e.target.matches('input,textarea')&&!dlg.open){
  if(e.key===' '){e.preventDefault();fcFlip()}if(e.key==='1')fcAnswer(false);if(e.key==='2')fcAnswer(true)}});

/* ---------- Reinicio y sin conexión ---------- */
$('#resetAll').addEventListener('click',()=>{if(!confirm('¿Borrar capítulos vistos, logros, fichas y marcas del quiz?'))return;
 try{Object.keys(localStorage).filter(k=>k.startsWith('itrio-')&&k!=='itrio-theme').forEach(k=>localStorage.removeItem(k))}catch(e){}location.hash='';location.reload()});
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
