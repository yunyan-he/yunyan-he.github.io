(async()=>{
 const button=document.getElementById('shuffle-note');
 try{
  const response=await fetch('/assets/excerpts.json');if(!response.ok)throw Error('excerpts');
  const articles=await response.json();
  const pool=articles.flatMap(article=>article.excerpts.map(excerpt=>({...excerpt,article})));
  let remaining=[],current=null;
  const language=()=>location.pathname.startsWith('/en/')?'en':'zh';
  function shuffle(items){for(let i=items.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[items[i],items[j]]=[items[j],items[i]]}return items}
  function next(){
   if(!remaining.length)remaining=shuffle([...pool]);
   // Keep the deck exhaustive, but avoid successive excerpts from the same article.
   const candidate=remaining.findIndex(e=>e.article.slug!==current?.article.slug);
   const index=candidate<0?0:candidate;
   current=remaining.splice(index,1)[0];render();
  }
  function render(){
   const lang=language();
   document.getElementById('note-kind').textContent=lang==='zh'?'文章核心句 · 根据原文整理':'CORE IDEA · Adapted from the article';
   document.getElementById('note-text').textContent=current[lang];
   const a=document.getElementById('note-source');a.textContent=current.article[lang]+' ↗';
   a.href=(lang==='en'?'/en':'')+'/reader.html?'+current.article.kind+'='+encodeURIComponent(current.article.slug)+'#highlights';
   document.getElementById('note-pool').textContent=lang==='zh'?`${articles.length} 篇文章 · ${pool.length} 条核心句`:`${articles.length} articles · ${pool.length} core ideas`;
   const card=document.getElementById('random-note');card.dataset.excerpt=current.id;card.dataset.article=current.article.slug;
   card.classList.remove('refresh');void card.offsetWidth;card.classList.add('refresh');
  }
  button.addEventListener('click',next);button.disabled=false;next();
 }catch{button.disabled=true;document.getElementById('note-pool').textContent=location.pathname.startsWith('/en/')?'Unable to load more excerpts. Please refresh.':'暂时无法加载更多核心句，请刷新重试。'}
})();
