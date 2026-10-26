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
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function today(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function inRange(from,to){var t=today();return (!from||t>=from)&&(!to||t<=to);}
window.SD={esc:esc,today:today,inRange:inRange,lang:L};
/* événement (admin) -> carte du carrousel */
SD.upcoming=function(d){var t=today();return (d.ev||[]).filter(function(e){return e.s==='on'&&(!e.d||e.d>=t);}).sort(function(a,b){return (a.d||'').localeCompare(b.d||'');});};
SD.evCard=function(e){var dt='';if(e.d){var x=new Date(e.d+'T12:00');dt=x.toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})+(e.h?' · '+e.h.replace(':','h'):'');var dte=x.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'})+(e.h?' · '+e.h:'');}
  return {img:e.img||'img/menorah.jpg',titre:e.t,en_titre:e.te||e.t,sous:e.x||dt,en_sous:e.xe||e.x||dte||dt,btn:e.b||(e.url?'Réserver':'En savoir plus'),en_btn:e.be||(e.url?'Book':'Learn more'),lien:e.url||'agenda.html'};};
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
        var t=el.querySelector('h2');b.innerHTML='<div class="k">'+esc(t?t.textContent:k.split('|')[1])+'</div><p>'+esc(s.msg)+'</p>';el.parentNode.insertBefore(b,el);}
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

function common(d){
  [applySections,applyAnnonce,applyPopup].forEach(function(f){try{f(d)}catch(e){console.error(e)}});
}

fetch(SB_URL+'/rest/v1/contenu?cle=eq.site&select=data',{headers:{apikey:SB_KEY}})
 .then(function(r){return r.ok?r.json():[];})
 .then(function(rows){var d=rows&&rows[0]&&rows[0].data;if(!d)return;window.SITEDATA=d;
   var run=function(){common(d);cbs.forEach(function(f){try{f(d)}catch(e){console.error(e)}});};
   if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();})
 .catch(function(){});
})();
