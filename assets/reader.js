(async()=>{
const params=new URLSearchParams(location.search);const lang=location.pathname.startsWith('/en/')?'en':'zh';
const kind=params.has('post')?'post':'note',slug=params.get(kind),content=document.getElementById('content'),status=document.getElementById('status');let generation=0;
const catalog=await fetch('/assets/catalog.json').then(r=>r.json());
async function render(){const request=++generation;document.documentElement.lang=lang;document.getElementById('language').textContent=lang==='zh'?'EN':'中文';document.getElementById('toc-label').textContent=lang==='zh'?'本页目录':'On this page';document.getElementById('toc').setAttribute('aria-label',lang==='zh'?'本页目录':'On this page');document.getElementById('back').textContent=lang==='zh'?'← 返回全部文章':'← Back to all writing';for(const id of ['home','back'])document.getElementById(id).href=(lang==='en'?'/en/':'/')+'#all-writing';
status.hidden=false;status.textContent=lang==='zh'?'正在加载…':'Loading…';content.replaceChildren();document.getElementById('toc').replaceChildren();
try{
const record=catalog.find(e=>e.kind===kind&&e.slug===slug);if(!record)throw Error('missing');
let actual=lang;const base='/'+(kind==='post'?'blogs/':'notes/')+slug;
let response=await fetch(base+(lang==='zh'?'_zh':'')+'.md');if(!response.ok){actual=lang==='zh'?'en':'zh';response=await fetch(base+(actual==='zh'?'_zh':'')+'.md')}
if(!response.ok)throw Error('missing');const md=await response.text();if(request!==generation)return;
// Some legacy English files are Chinese duplicates: report the actual text language.
if(actual==='en' && /[\u4e00-\u9fff]/.test(md.split('\n')[0]))actual='zh';
content.innerHTML=DOMPurify.sanitize(marked.parse(md));content.lang=actual;
content.querySelectorAll('img').forEach(img=>{const src=img.getAttribute('src');if(src&&!/^(https?:|data:|\/)/.test(src))img.src=new URL('/'+src,location.href).href;img.loading='lazy'});
content.querySelectorAll('a').forEach(a=>{const href=a.getAttribute('href');if(!href)return;if(/^(note|blog)\.html\?/.test(href)){const u=new URL(href,location.href);u.pathname=(lang==='en'?'/en':'')+'/reader.html';u.searchParams.delete('lang');a.href=u.href}});
content.querySelectorAll('table').forEach(table=>{const wrap=document.createElement('div');wrap.className='table-scroll';table.before(wrap);wrap.append(table)});
content.querySelectorAll('h1,h2,h3').forEach((h,i)=>{h.id='section-'+i;const a=document.createElement('a');a.href='#'+h.id;a.textContent=h.textContent;if(h.tagName==='H3')a.className='sub';document.getElementById('toc').append(a)});
document.title=(content.querySelector('h1')?.textContent||record[actual])+' — yunyan';document.getElementById('meta').textContent=(kind==='post'?(lang==='zh'?'文章':'ESSAY'):(lang==='zh'?'研究笔记':'RESEARCH NOTES'))+' / '+(actual==='zh'?'中文':'ENGLISH');status.hidden=actual===lang;if(actual!==lang)status.textContent=lang==='zh'?'暂无中文版本，显示英文原文。':'English is unavailable; showing the Chinese original.';
if(location.hash){document.getElementById(location.hash.slice(1))?.scrollIntoView()}
}catch{if(request!==generation)return;status.textContent=lang==='zh'?'暂时无法加载这篇文章，请刷新重试，或返回文章目录。':'Unable to load this article. Please refresh or return to the writing directory.'}
}
document.getElementById('language').addEventListener('click',()=>{const url=new URL(location.href);url.pathname=(lang==='zh'?'/en':'')+'/reader.html';url.searchParams.delete('lang');location.href=url.href});
if(matchMedia('(max-width:760px)').matches)document.querySelector('aside details').open=false;
await render();
try{
 const library=await fetch('/assets/excerpts.json').then(r=>r.json());const article=library.find(e=>e.kind===kind&&e.slug===slug);
 if(article){
  document.getElementById('highlights-label').textContent=lang==='zh'?'文章核心句 · 根据原文整理':'Core ideas · Adapted from the article';
  for(const excerpt of article.excerpts){const li=document.createElement('li');li.textContent=excerpt[lang];document.getElementById('highlight-list').append(li)}
  const details=document.getElementById('highlights');details.hidden=false;
  if(location.hash==='#highlights'){details.open=true;details.scrollIntoView()}
 }
}catch{}
})().catch(()=>{document.getElementById('status').textContent='文章目录加载失败 / Unable to load the writing directory.'});
