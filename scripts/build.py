"""Build shared excerpt data and the English/static preview entries. No dependencies."""
from pathlib import Path
import json,re,html
ROOT=Path(__file__).resolve().parents[1]
library=[json.loads(p.read_text()) for p in sorted((ROOT/'content/excerpts').glob('*.json'))]
assert len({e['slug'] for e in library})==len(library)
for article in library:
 assert 5<=len(article['excerpts'])<=12
 assert all(e['zh'] and e['en'] for e in article['excerpts'])
(ROOT/'assets/excerpts.json').write_text(json.dumps(library,ensure_ascii=False,indent=2)+'\n')
source=(ROOT/'index.html').read_text()
D=json.loads((ROOT/'assets/translations.json').read_text())
# Translate plain text runs, leaving code and all markup intact.
def translate_part(m):
 text=m[0];key=html.unescape(text.strip())
 if key in D:return text.replace(text.strip(),html.escape(D[key],quote=False))
 return text
parts=re.split(r'(<[^>]+>)',source)
en=''.join(translate_part(re.match(r'[\s\S]*',p)) if i%2==0 else p for i,p in enumerate(parts))
en=re.sub(r'<span data-zh="[^"]*" data-en="([^"]*)">.*?</span>',lambda m:'<span>'+html.escape(html.unescape(m[1]),quote=False)+'</span>',en)
en=en.replace('<html lang="zh">','<html lang="en">').replace('云雁 yunyan — 作品与笔记','Yunyan — Projects & notes')
en=en.replace('href="/reader.html?','href="/en/reader.html?')
en=en.replace('id="language-toggle" href="/en/" aria-label="Switch language">EN','id="language-toggle" href="/" aria-label="Switch language">中文')
(ROOT/'en/index.html').write_text(en)
(ROOT/'preview/index.html').write_text(source)
reader=(ROOT/'reader.html').read_text()
(ROOT/'en/reader.html').write_text(reader.replace('<html lang="zh">','<html lang="en">'))
for target in ['blog.html','note.html','preview/reader.html']:(ROOT/target).write_text(reader)
print(f'Built Chinese /, English /en/, and {sum(len(e["excerpts"]) for e in library)} core ideas.')
