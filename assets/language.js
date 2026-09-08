(async()=>{
const dictionary=await fetch('/assets/translations.json').then(r=>{if(!r.ok)throw Error('translation load');return r.json()});
const lang=location.pathname.startsWith('/en/')?'en':'zh';
const originals=new WeakMap();
const labels=new WeakMap();
function apply(){
 document.documentElement.lang=lang;
 document.querySelectorAll('[aria-label]').forEach(e=>{if(!labels.has(e))labels.set(e,e.getAttribute('aria-label'));const zh=labels.get(e);let en=zh;if(e.getAttribute('role')==='img')en=(e.closest('.project')?.querySelector('h3')?.textContent||'Project')+' interaction concept, not a product screenshot';else if(zh==='随手翻一页')en='Turn a page';else if(zh==='主导航')en='Main navigation';else if(zh==='选择经历阶段')en='Choose a stage';e.setAttribute('aria-label',lang==='zh'?zh:en)});
 document.title=lang==='zh'?'云雁 yunyan — 作品与笔记':'Yunyan — Projects & notes';
 document.querySelectorAll('[data-zh]').forEach(e=>e.textContent=e.dataset[lang]);
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
 while(n=walker.nextNode()){
  if(n.parentElement.closest('script,style,[data-zh],#language-toggle,#random-note,#note-pool'))continue;
  const raw=n.textContent,trim=raw.trim();
  if(!originals.has(n))originals.set(n,raw);
  const original=originals.get(n),key=original.trim();
  if(dictionary[key])n.textContent=lang==='en'?original.replace(key,dictionary[key]):original;
  else if(lang==='en'&&trim.endsWith(' ↗')&&dictionary[trim.slice(0,-2)])n.textContent=dictionary[trim.slice(0,-2)]+' ↗';
 }
 document.querySelectorAll('a[href*="reader.html?"]').forEach(a=>{const u=new URL(a.href);u.pathname=(lang==='en'?'/en':'')+'/reader.html';u.searchParams.delete('lang');a.href=u.href});
 document.getElementById('language-toggle').textContent=lang==='zh'?'EN':'中文';
}
const observer=new MutationObserver(()=>{observer.disconnect();apply();observe()});
function observe(){observer.observe(document.getElementById('story'),{childList:true,subtree:true,characterData:true})}
const toggle=document.getElementById('language-toggle');toggle.href=(lang==='zh'?'/en/':'/')+location.hash;
apply();observe();
})().catch(()=>{document.getElementById('language-toggle').hidden=true});
