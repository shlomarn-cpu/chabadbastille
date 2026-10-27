/* Beth Loubavitch Bastille — contenu géré depuis la page Admin (Supabase) */
(function(){
var SB_URL='https://jfxebnoqulyzjaqnyoel.supabase.co';
var SB_KEY='sb_publishable_--GMXZHIR5DVx-0402h_1Q_GLCp0_hs';
window.SUPA={url:SB_URL,key:SB_KEY};
var PAGE=(location.pathname.split('/').pop()||'index.html').replace(/\.html$/,'')||'index';
var PAGE_NAME={'index':'Accueil','qui-sommes-nous':'Qui sommes-nous','activites':'Activités','agenda':'Agenda','cycles':'Cycles de la vie','touristes':'Touristes'}[PAGE]||'';
window.SITEPAGE=PAGE_NAME;
var cbs=[];
window.onSiteData=function(f){if(window.SITEDATA){try{f(window.SITEDATA)}catch(e){console.error(e)}}cbs.push(f);};
function L(){return document.documentElement.lang||'fr';}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function today(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function inRange(from,to){var t=today();return (!from||t>=from)&&(!to||t<=to);}
window.SD={esc:esc,today:today,inRange:inRange,lang:L};
/* événement (admin) -> carte du carrousel */
SD.upcoming=function(d){var t=today();return (d.ev||[]).filter(function(e){return e.s==='on'&&(!e.d||e.d>=t);}).sort(function(a,b){return (a.d||'').localeCompare(b.d||'');});};
SD.evCard=function(e){var dt='';if(e.d){var x=new Date(e.d+'T12:00');dt=x.toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})+(e.h?' · '+e.h.replace(':','h'):'');var dte=x.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'})+(e.h?' · '+e.h:'');}
  var u=String(e.url||'agenda.html');if(!/^(https?:|mailto:|tel:|[a-z0-9-]+\.html)/i.test(u))u='agenda.html';
  return {img:esc(e.img||'img/menorah.jpg'),titre:esc(e.t),en_titre:esc(e.te||e.t),sous:esc(e.x||dt),en_sous:esc(e.xe||e.x||dte||dt),btn:esc(e.b||(e.url?'Réserver':'En savoir plus')),en_btn:esc(e.be||(e.url?'Book':'Learn more')),lien:esc(u)};};
/* ---- vacances scolaires (zone C · Paris), calendrier officiel de l'Éducation nationale ---- */
var VAC_FALLBACK=[['2026-10-17','2026-11-02'],['2026-12-19','2027-01-04'],['2027-02-06','2027-02-22'],['2027-04-03','2027-04-19'],['2027-05-06','2027-05-10'],['2027-07-03','2027-09-02']];
SD.VAC=VAC_FALLBACK;
SD.isVac=function(ds){return SD.VAC.some(function(v){return ds>=v[0]&&ds<v[1];});};
var vacCbs=[];SD.onVac=function(f){vacCbs.push(f);};
(function(){var loc=function(iso){return new Date(iso).toLocaleDateString('sv-SE',{timeZone:'Europe/Paris'});};
  var addD=function(ds,n){var d=new Date(ds+'T12:00:00');d.setDate(d.getDate()+n);return d.toISOString().slice(0,10);};
  try{var c=JSON.parse(localStorage.getItem('sd-vac')||'null');if(c&&Date.now()-c.t<6*864e5&&c.v&&c.v.length){SD.VAC=c.v;return;}}catch(e){}
  var u='https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-calendrier-scolaire/records?select=description,start_date,end_date&where='+encodeURIComponent('location="Paris" and end_date>="'+new Date(Date.now()-200*864e5).toISOString().slice(0,10)+'"')+'&order_by=start_date&limit=60';
  fetch(u).then(function(r){return r.ok?r.json():null;}).then(function(j){if(!j||!j.results||!j.results.length)return;var seen={},v=[];
    j.results.forEach(function(x){var a=loc(x.start_date),b=loc(x.end_date);if(a===b){b=/Ascension/i.test(x.description)?addD(a,4):/Été/i.test(x.description)?addD(a,60):addD(a,1);}var k=a+b;if(seen[k])return;seen[k]=1;v.push([a,b]);});
    if(v.length){SD.VAC=v;try{localStorage.setItem('sd-vac',JSON.stringify({t:Date.now(),v:v}))}catch(e){}vacCbs.forEach(function(f){try{f()}catch(e){}});}}).catch(function(){});})();
SD.onLang=function(f){new MutationObserver(function(){f(L());}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});};
SD.DEST={'Cercle féminin':'activites.html#femmes','Bichvile’h':'activites.html#bichvileh','Cours & Étude':'activites.html#etude','Enfants':'activites.html#enfants','Cantine':'activites.html#cantine','CTeen':'activites.html#cteen','Social':'activites.html#social','Aucun':''};

/* ---- styles des composants ajoutés ---- */
var css='.sd-ann{position:relative;z-index:60;background:#000;color:#fff;font:600 14px/1.4 "Nunito Sans",system-ui,sans-serif;text-align:center;padding:10px 48px 10px 16px}'+
'.sd-ann a{color:#C8A05A;font-weight:800;margin-left:10px;text-decoration:none;white-space:nowrap}.sd-ann button{position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:0;color:#fff;font-size:18px;cursor:pointer;padding:6px}'+
'.sd-pop-o{position:fixed;inset:0;z-index:300;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:16px;opacity:0;transition:opacity .35s}.sd-pop-o.on{opacity:1}'+
'.sd-pop{position:relative;background:#fff;width:min(560px,100%);max-height:calc(100vh - 32px);overflow:auto;font-family:"Nunito Sans",system-ui,sans-serif;box-shadow:0 30px 80px rgba(0,0,0,.3)}'+
'.sd-pop .pim{aspect-ratio:16/9;background:#F7F3EC center/cover no-repeat}.sd-pop .pbd{padding:clamp(22px,4vw,34px)}.sd-pop .pk{font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:#B4552F;font-weight:800}'+
'.sd-pop h3{margin:10px 0 0;font-size:clamp(22px,3vw,30px);line-height:1.15;font-weight:900}.sd-pop p{margin:12px 0 0;color:#5A6672;line-height:1.6}'+
'.sd-pop .pb{display:inline-flex;align-items:center;justify-content:center;margin-top:20px;min-height:48px;padding:0 26px;background:#B4552F;color:#fff;font-weight:800;font-size:13px;letter-spacing:.08em;text-transform:uppercase;text-decoration:none}'+
'.sd-pop .px{position:absolute;top:10px;right:10px;width:40px;height:40px;border:0;background:#fff;font-size:18px;cursor:pointer;z-index:2}'+
'.sd-pop-o.b{inset:auto 16px 16px auto;background:none;padding:0;display:block}.sd-pop-o.b .sd-pop{width:min(360px,calc(100vw - 32px))}.sd-pop-o.b .pim{aspect-ratio:16/8}'+
'.sd-msg{padding:clamp(40px,6vw,80px) 16px;text-align:center;background:#F7F3EC}.sd-msg .k{font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:#B4552F;font-weight:800}.sd-msg p{margin:10px auto 0;max-width:640px;font-size:clamp(17px,1.6vw,22px);font-weight:300;line-height:1.5}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

/* ---- sections ouvrables / fermables ---- */
var SECMAP={
 'Accueil|Événements à venir':{page:'index',sel:'section.events'},
 'Accueil|Avis':{page:'index',sel:'section.avis'},
 'Accueil|FAQ':{page:'index',sel:'section.faq'},
 'Activités|Repas de Chabbat & fêtes':{page:'activites',id:'repas'},
 'Activités|Cours & Étude':{page:'activites',id:'etude'},
 'Activités|Enfants · Talmud Torah':{page:'activites',id:'enfants'},
 'Activités|Gan Israël':{page:'activites',sel:'#enfants [data-gan]'},
 'Activités|Cercle féminin':{page:'activites',id:'femmes'},
 'Activités|Bichvile’h':{page:'activites',id:'bichvileh'},
 'Activités|Cantine cacher':{page:'activites',id:'cantine'},
 'Activités|Téfiline & Mézouzot':{page:'activites',id:'tefiline'},
 'Activités|CTeen':{page:'activites',id:'cteen'},
 'Activités|Social':{page:'activites',id:'social'},
 'Cycles de la vie|Naissance':{page:'cycles',id:'naissance'},
 'Cycles de la vie|Bar & Bat Mitsva':{page:'cycles',id:'bar-mitsva'},
 'Cycles de la vie|Mariage':{page:'cycles',id:'mariage'},
 'Cycles de la vie|Location de la salle':{page:'cycles',id:'salle'},
 'Cycles de la vie|Kaddich':{page:'cycles',id:'kaddich'},
 'Cycles de la vie|Yizkor':{page:'cycles',id:'yizkor'},
 'Cycles de la vie|Convertisseur de date':{page:'cycles',id:'convertisseur'},
 'Touristes|Repas de Chabbat':{page:'touristes',id:'shabbat'},
 'Touristes|Chabbat pour les groupes':{page:'touristes',sel:'a[href*="87ad0188"]'},
 'Touristes|Adresses utiles':{page:'touristes',id:'adresses'}
};
window.SD.SECMAP=SECMAP;
function applySections(d){
  if(!d.sec)return;
  Object.keys(d.sec).forEach(function(k){
    var s=d.sec[k],m=SECMAP[k];if(!m||s.on!==0)return;
    if(m.id){
      // liens du menu et du sommaire vers cette section, sur toutes les pages
      document.querySelectorAll('a[href$="'+m.page+'.html#'+m.id+'"],a[href="#'+m.id+'"]').forEach(function(a){
        if(a.closest('.ddm,.msub,.ix,nav,.ix2,.sm2')||a.getAttribute('href')==='#'+m.id)a.style.display='none';});
    }
    if(m.page!==PAGE)return;
    var els=m.id?[document.getElementById(m.id)]:[].slice.call(document.querySelectorAll(m.sel));
    els.forEach(function(el){if(!el)return;
      if(s.msg&&el.tagName==='SECTION'){var b=document.createElement('section');b.className='sd-msg';b.id=el.id;el.removeAttribute('id');
        var t=el.querySelector('.tk')||el.querySelector('h2');b.innerHTML='<div class="k">'+esc(t?t.textContent:k.split('|')[1])+'</div><p>'+esc(s.msg)+'</p>';el.parentNode.insertBefore(b,el);}
      el.style.display='none';});
  });
}

/* ---- bandeau d'annonce ---- */
function applyAnnonce(d){
  var a=d.ann;if(!a||!a.on||!(a.fr||a.en))return;if(!inRange(a.from,a.to))return;
  try{if(sessionStorage.getItem('sd-ann-x')===(a.fr||'')+a.to)return;}catch(e){}
  var el=document.createElement('div');el.className='sd-ann';el.setAttribute('role','region');el.setAttribute('aria-label','Annonce');
  var txt=L()==='en'&&a.en?a.en:a.fr;
  el.innerHTML='<span>'+esc(txt)+'</span>'+(a.u?'<a href="'+esc(a.u)+'" target="_blank" rel="noopener">'+esc(a.l||'En savoir plus')+' →</a>':'')+'<button type="button" aria-label="Fermer">✕</button>';
  el.querySelector('button').onclick=function(){el.remove();try{sessionStorage.setItem('sd-ann-x',(a.fr||'')+a.to)}catch(e){}};
  document.body.insertBefore(el,document.body.firstChild);
}

/* ---- pop-up ---- */
var PGMAP={'Toutes les pages':null,'Accueil uniquement':'index','Activités':'activites','Agenda':'agenda','Touristes':'touristes','Cycles de la vie':'cycles','Qui sommes-nous':'qui-sommes-nous'};
function applyPopup(d){
  var p=(d.pop||[]).filter(function(x){return x.on;})[0];if(!p)return;
  if(!inRange(p.from,p.to))return;
  var pg=PGMAP[p.pages||'Toutes les pages'];if(pg&&pg!==PAGE)return;
  var key='sd-pop-'+(p.id||p.t),now=Date.now(),seen=null;
  try{seen=localStorage.getItem(key);}catch(e){}
  var fq=p.freq||'Une fois par visiteur';
  if(seen&&fq==='Une fois par visiteur')return;
  if(seen&&fq==='Une fois par jour'&&now-(+seen)<864e5)return;
  var delay=p.delay==='Immédiatement'?300:p.delay==='Après 10 secondes'?10000:3000;
  setTimeout(function(){
    var en=L()==='en';
    var o=document.createElement('div');o.className='sd-pop-o'+(p.fmt==='b'?' b':'');o.setAttribute('role','dialog');o.setAttribute('aria-modal',p.fmt==='b'?'false':'true');
    o.innerHTML='<div class="sd-pop"><button class="px" type="button" aria-label="Fermer">✕</button>'+(p.img?'<div class="pim" style="background-image:url(\''+esc(p.img)+'\')"></div>':'')+
      '<div class="pbd"><div class="pk">Beth Loubavitch Bastille</div><h3>'+esc(en&&p.te?p.te:p.t)+'</h3>'+((en&&p.xe)||p.x?'<p>'+esc(en&&p.xe?p.xe:p.x)+'</p>':'')+
      (p.l?'<a class="pb" href="'+esc(p.l)+'" target="_blank" rel="noopener">'+esc(p.b||'En savoir plus')+'</a>':'')+'</div></div>';
    function close(){o.classList.remove('on');setTimeout(function(){o.remove();},350);}
    o.addEventListener('click',function(e){if(e.target===o||e.target.closest('.px'))close();});
    document.addEventListener('keydown',function k(e){if(e.key==='Escape'){close();document.removeEventListener('keydown',k);}});
    document.body.appendChild(o);requestAnimationFrame(function(){o.classList.add('on');});
    try{localStorage.setItem(key,String(now));}catch(e){}
  },delay);
}

/* ---- questions fréquentes ---- */
var FAQL={'index':{sel:'#faq',flat:1,first:1},'touristes':{sel:'#faq',flat:1},'qui-sommes-nous':{sel:'.fqs'},'cycles':{sel:'.fqs'},'agenda':{sel:'.fqs',grp:1},'activites':{sel:'.fqs',grp:1,more:1}};
function paras(t){return String(t||'').split(/\n\s*\n/).map(function(x){return x.trim();}).filter(Boolean).map(function(x){return '<p>'+esc(x).replace(/\n/g,'<br>')+'</p>';}).join('');}
var FAQ_HE={"Faut-il réserver pour le repas de Chabbat ?": ["האם צריך להירשם לסעודת השבת?", "כן, ההרשמה חובה ונעשית באתר, מוקדם ככל האפשר כדי שנוכל להתכונן כראוי."], "Le centre est-il ouvert à tous ?": ["האם המרכז פתוח לכולם?", "בית חב״ד באסטיליה פתוח לכולם, באווירה חמה ומכבדת."], "Faut-il être pratiquant pour venir ?": ["האם צריך להיות שומר מצוות כדי להגיע?", "לא נדרשת רמת שמירה מסוימת. כל אחד מוזמן לבוא כפי שהוא."], "Le Beth Habad est-il sécurisé ?": ["האם בית חב״ד מאובטח?", "הביטחון בראש סדרי העדיפויות שלנו. אנו עובדים בשיתוף פעולה הדוק עם המשטרה, הפעילויות מחייבות הרשמה מראש והמקום מאובטח במצלמות."]};
function qaHtml(x,en,open){var h=L()==='he'?(x.qh?[x.qh,x.rh]:FAQ_HE[x.q]):null;var q=h?h[0]:(en&&x.qe?x.qe:x.q),r=h&&h[1]?h[1]:(en&&x.re?x.re:x.r);return '<div class="qa'+(open?' open':'')+'"><button type="button" aria-expanded="'+(open?'true':'false')+'"><span>'+esc(q)+'</span><i></i></button><div class="ans"><div>'+paras(r)+'</div></div></div>';}
function applyFaq(d){
  var lay=FAQL[PAGE];if(!d.faq||!lay)return;var box=document.querySelector(lay.sel);if(!box)return;
  var items=d.faq.map(function(x,i){return {x:x,k:(x.o&&x.o[PAGE_NAME]!=null)?x.o[PAGE_NAME]:1000+i};}).filter(function(o){return (o.x.pg||[]).indexOf(PAGE_NAME)>=0;}).sort(function(a,b){return a.k-b.k;}).map(function(o){return o.x;});
  var sec=box.closest('section');if(sec&&!items.length)sec.style.display='none';
  function draw(){var en=L()==='en',h='';
    if(lay.flat){h=items.map(function(x,i){return qaHtml(x,en,lay.first&&i===0);}).join('');}
    else if(lay.grp){var order=[],g={};items.forEach(function(x){var t=x.th||'';if(!g[t]){g[t]=[];order.push(t);}g[t].push(x);});
      h=order.map(function(t){return (t?'<div class="fqh">'+esc(t)+'</div>':'')+'<div class="fqg">'+g[t].map(function(x){return qaHtml(x,en);}).join('')+'</div>';}).join('');}
    else h='<div class="fqg">'+items.map(function(x){return qaHtml(x,en);}).join('')+'</div>';
    box.innerHTML=h;
    box.querySelectorAll('.qa button').forEach(function(b){b.onclick=function(){var qa=b.parentElement,open=!qa.classList.contains('open');
      qa.parentElement.querySelectorAll(':scope>.qa').forEach(function(x){x.classList.remove('open');x.querySelector('button').setAttribute('aria-expanded','false');});
      if(open){qa.classList.add('open');b.setAttribute('aria-expanded','true');}};});
    if(lay.more)box.querySelectorAll('.fqg').forEach(function(g){var q=g.querySelectorAll(':scope>.qa');if(q.length<2)return;q.forEach(function(x,i){if(i>0)x.classList.add('xtra');});
      var b=document.createElement('button');b.type='button';b.className='fqm';var n=q.length-1;
      var lab=function(){b.textContent=g.classList.contains('all')?(en?'See less':'Voir moins'):(en?'See more ('+n+')':'Voir plus ('+n+')');};
      lab();b.onclick=function(){g.classList.toggle('all');if(!g.classList.contains('all'))g.querySelectorAll('.qa.xtra.open').forEach(function(x){x.classList.remove('open');x.querySelector('button').setAttribute('aria-expanded','false');});lab();};g.after(b);});
  }
  draw();SD.onLang(draw);
}

/* ---- textes & photos des sections ---- */
var NOTIN='.qa,.card,.acard,.cd,.rail,.arail,.cg,.ml,.chips,.fqs,.ctc-m,.cookie,.oc,.cell,.og,.ix,.rp,.tt,.pc,#days,#pg,.avis-r,.av';
SD.sections=function(){var m=document.querySelector('main')||document.body;return [].slice.call(m.querySelectorAll(':scope>section')).filter(function(s){return !s.matches('.tfaq,.faq');});};
SD.secId=function(s,i){return s.id||('s'+i);};
SD.pick=function(sec){
  var ok=function(e){return !e.closest(NOTIN);};
  var h=sec.querySelector('h1,h2');
  var p=[].slice.call(sec.querySelectorAll('p')).filter(function(e){return ok(e)&&e.textContent.trim().length>20&&!e.querySelector('a,button');})[0]||null;
  var img=[].slice.call(sec.querySelectorAll('img')).filter(function(e){return ok(e)&&!/mark-|logo|flamme|\.svg/.test(e.getAttribute('src')||'');})[0]||null;
  var btns=[].slice.call(sec.querySelectorAll('a.btn')).filter(ok);
  return {h:h,p:p,img:img,btns:btns};};
// titre : « fin | gras » (span + b) ou lignes séparées par « | » (h1 avec <br>)
SD.hKind=function(h){if(!h)return 'x';var ch=[].slice.call(h.children);
  if(ch.length===2&&ch.every(function(e){return /^(SPAN|B)$/.test(e.tagName)&&!e.children.length;}))return 'sb';
  if(ch.length&&ch.every(function(e){return e.tagName==='BR';}))return 'br';
  if(!ch.length)return 't';return 'x';};
SD.hGet=function(h,en){var k=SD.hKind(h);if(k==='x')return {t:'',k:k};
  var g=function(e){return en?(e.dataset.en||e.innerHTML):(e.dataset.fr||e.innerHTML);};
  if(k==='sb'){var ch=[].slice.call(h.children);return {t:ch.map(function(e){return g(e).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();}).join(' | '),k:k};}
  return {t:g(h).split(/<br\s*\/?>/i).map(function(x){return x.replace(/<[^>]+>/g,'').trim();}).join(' | '),k:k};};
function setBi(el,fr,en){if(!el)return;if(fr!=null)el.dataset.fr=fr;if(en!=null&&en!=='')el.dataset.en=en;else if(fr!=null&&!el.dataset.en)el.dataset.en=fr;el.innerHTML=L()==='en'&&el.dataset.en?el.dataset.en:el.dataset.fr;}
function hSet(h,x){var k=SD.hKind(h);if(k==='x')return;var fr=(x.h||'').split('|').map(function(s){return esc(s.trim());}),en=(x.he||'').split('|').map(function(s){return esc(s.trim());});
  if(k==='sb'){var ch=[].slice.call(h.children);setBi(ch[0],fr[0]||'',x.he?en[0]:null);setBi(ch[1],fr.slice(1).join(' '),x.he&&en.length>1?en.slice(1).join(' '):null);return;}
  setBi(h,fr.join(k==='br'?'<br>':' '),x.he?en.join(k==='br'?'<br>':' '):null);}
function applyTx(d){
  var list=d.tx&&d.tx[PAGE_NAME];if(!list)return;var secs=SD.sections();
  list.forEach(function(x){if(!x.ed)return;var sec=x.id&&!/^s\d+$/.test(x.id)?document.getElementById(x.id):secs[+String(x.id).slice(1)];if(!sec)return;var k=SD.pick(sec);
    if((x.ed.h||x.ed.he)&&k.h)hSet(k.h,x);
    if((x.ed.p||x.ed.pe)&&k.p)setBi(k.p,esc(x.p||'').replace(/\n/g,'<br>'),x.pe?esc(x.pe).replace(/\n/g,'<br>'):null);
    if(x.ed.img&&k.img&&x.img){k.img.src=x.img;k.img.removeAttribute('srcset');}
    if(x.ed.btns&&x.btns)x.btns.forEach(function(bt,i){var a=k.btns[i];if(!a)return;if(bt.u){a.href=bt.u;}if(bt.t!=null){setBi(a,esc(bt.t),bt.te?esc(bt.te):null);}});
  });}

/* ---- infos importantes (coordonnées, tarifs, dates, liens, chiffres) ---- */
var DEF={'info.adresse':'37 rue Popincourt, 75011 Paris','info.metro1':'Richard-Lenoir · ligne 5','info.metro2':'Saint-Ambroise · ligne 9','info.tel':'+33 1 42 52 30 41','info.wa':'+33 1 42 52 30 41','info.mail':'levi.arnauve@loubavitch.fr','info.insta':'https://www.instagram.com/beth_loubavitch_bastille','info.chaharit':'10h00','info.cantH':'11h30 – 14h00','info.ganHd':'2026-12-21','info.ganHf':'2026-12-25','info.ganEd':'2027-07-05','info.ganEf':'2027-07-23','info.salleM2':'200 m²','info.sallePers':'100','info.salleTarif':'500 €','info.kaddich':'300 € / an','info.mezouza':'7 €','info.tefiline':'25 €','info.mariage':'150 €','chiffre.delegues':'7 136+','chiffre.continents':'5','chiffre.pays':'100+','chiffre.villes':'1 000+'};
function walkText(fn){var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null),n,a=[];while((n=w.nextNode()))a.push(n);a.forEach(fn);}
function replText(a,b){if(!a||!b||a===b)return;walkText(function(n){if(n.nodeValue.indexOf(a)>=0)n.nodeValue=n.nodeValue.split(a).join(b);});
  document.querySelectorAll('[data-fr],[data-en]').forEach(function(e){['fr','en'].forEach(function(k){var v=e.dataset[k];if(v&&v.indexOf(a)>=0)e.dataset[k]=v.split(a).join(b);});});}
function kpSet(scope,label,val){document.querySelectorAll(scope+' .kp > div').forEach(function(dv){var sp=dv.querySelector('span'),b=dv.querySelector('b');if(sp&&b&&(sp.dataset.fr||sp.textContent).trim()===label)b.textContent=val;});}
function ganTxt(a,b,en){if(!a||!b)return null;var A=new Date(a+'T12:00'),B=new Date(b+'T12:00'),loc=en?'en-GB':'fr-FR';
  var m=function(x){return x.toLocaleDateString(loc,{month:'short'}).replace('.','');};
  return A.getMonth()===B.getMonth()?A.getDate()+' – '+B.getDate()+' '+(en?m(B):m(B)+'.')+' '+B.getFullYear():A.getDate()+' '+m(A)+' – '+B.getDate()+' '+m(B)+' '+B.getFullYear();}
function applyInfo(d){var f=d.form;if(!f)return;var ch=function(k){return f[k]&&String(f[k]).trim()&&String(f[k]).trim()!==DEF[k];},v=function(k){return String(f[k]).trim();};
  var num=function(s){return s.replace(/[^\d+]/g,'').replace(/^\+/,'');};
  if(ch('info.tel'))document.querySelectorAll('a[href^="tel:"]').forEach(function(a){a.href='tel:+'+num(v('info.tel'));if(/\d/.test(a.textContent))a.textContent=v('info.tel');});
  if(ch('info.tel'))replText(DEF['info.tel'],v('info.tel'));
  if(ch('info.wa'))document.querySelectorAll('a[href*="wa.me/33142523041"]').forEach(function(a){a.href=a.getAttribute('href').replace('wa.me/33142523041','wa.me/'+num(v('info.wa')));});
  if(ch('info.mail'))document.querySelectorAll('a[href^="mailto:'+DEF['info.mail']+'"]').forEach(function(a){a.href=a.getAttribute('href').replace(DEF['info.mail'],v('info.mail'));if(a.textContent.indexOf('@')>=0)a.textContent=v('info.mail');});
  if(ch('info.insta'))document.querySelectorAll('a[href*="instagram.com"]').forEach(function(a){a.href=v('info.insta');});
  if(ch('info.adresse')){var p=v('info.adresse').split(/,\s*/),st=p[0],cy=p.slice(1).join(', ');replText('37 rue Popincourt',st);if(cy)replText('75011 Paris',cy);
    document.querySelectorAll('a[href*="google.com/maps"][href*="Popincourt"]').forEach(function(a){a.href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(v('info.adresse'));});}
  if(ch('info.metro1'))replText('Richard-Lenoir · ligne 5',v('info.metro1'));
  if(ch('info.metro2'))replText('Saint-Ambroise · ligne 9',v('info.metro2'));
  if(ch('info.chaharit'))document.querySelectorAll('.hr3 b').forEach(function(b){if(b.textContent.trim()===DEF['info.chaharit']){b.textContent=v('info.chaharit');b.dataset.fr=v('info.chaharit');b.dataset.en=v('info.chaharit');}});
  if(ch('info.cantH'))kpSet('#cantine','Déjeuner',v('info.cantH').replace(/h00\b/,'h'));
  if(ch('info.salleM2'))kpSet('#salle','Surface',v('info.salleM2'));
  if(ch('info.sallePers'))kpSet('#salle','Personnes',v('info.sallePers'));
  if(ch('info.salleTarif'))kpSet('#salle','Tarif',v('info.salleTarif'));
  if(ch('info.mezouza'))kpSet('#tefiline','Mézouza',v('info.mezouza'));
  if(ch('info.tefiline'))kpSet('#tefiline','Téfiline',v('info.tefiline'));
  if(ch('info.kaddich'))replText(DEF['info.kaddich'],v('info.kaddich'));
  if(ch('info.mariage'))replText('Don suggéré de '+DEF['info.mariage'],'Don suggéré de '+v('info.mariage'));
  [['hiver','info.ganHd','info.ganHf'],['ete','info.ganEd','info.ganEf']].forEach(function(g){if(!(ch(g[1])||ch(g[2])))return;var el=document.querySelector('[data-gan="'+g[0]+'"] strong');if(!el)return;
    var fr=ganTxt(f[g[1]]||DEF[g[1]],f[g[2]]||DEF[g[2]],false),en=ganTxt(f[g[1]]||DEF[g[1]],f[g[2]]||DEF[g[2]],true);if(fr){el.dataset.fr=fr;el.dataset.en=en;el.textContent=L()==='en'?en:fr;}});
  [['chiffre.delegues',0],['chiffre.continents',1],['chiffre.pays',2],['chiffre.villes',3]].forEach(function(c){if(!ch(c[0]))return;var n=document.querySelectorAll('.cnt')[c[1]];if(!n)return;
    var raw=v(c[0]),digits=parseInt(raw.replace(/\D/g,''),10);if(isNaN(digits))return;n.dataset.to=digits;n.textContent=digits.toLocaleString('fr-FR').replace(/ | /g,' ');var sup=n.parentElement.querySelector('sup');if(sup)sup.style.display=/\+/.test(raw)?'':'none';});
  var LK={'link.don':'a[href*="kehila.io/don"]','link.tt':'#enfants .bts a','link.bm':'#bar-mitsva a.btn[href*="wa.me"]','link.mariage':'#mariage a.btn[href*="wa.me"]','link.kaddich':'a[href*="recitation-du-kaddich"]','link.yizkor':'a[href*="priere-du-yizkor"]','link.salle':'a[href*="a22f392f"]','link.naissance':'a[href*="naissance"][href*="wa.me"]','link.cteen':'#cteen a.btn'};
  Object.keys(LK).forEach(function(k){var u=f[k]&&String(f[k]).trim();if(!u)return;document.querySelectorAll(LK[k]).forEach(function(a){a.href=u;});});
}

function common(d){
  [applyTx,applyInfo,applySections,applyAnnonce,applyPopup,applyFaq].forEach(function(f){try{f(d)}catch(e){console.error(e)}});
}

var PREV=null;try{if(/[?&]apercu\b/.test(location.search))PREV=JSON.parse(localStorage.getItem('sd-apercu')||'null');}catch(e){}
(PREV?Promise.resolve([{data:PREV}]):fetch(SB_URL+'/rest/v1/contenu?cle=eq.site&select=data',{headers:{apikey:SB_KEY}})
 .then(function(r){return r.ok?r.json():[];}))
 .then(function(rows){var d=rows&&rows[0]&&rows[0].data;if(!d)return;window.SITEDATA=d;
   var run=function(){common(d);cbs.forEach(function(f){try{f(d)}catch(e){console.error(e)}});};
   if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();})
 .catch(function(){});
})();
