# Yunyan · 云雁

Static bilingual personal website for GitHub Pages. No server or package installation is required.

## Routes

- `/`: Chinese homepage (always the default, independent of browser storage).
- `/en/`: English homepage.
- `/reader.html?post=SLUG` and `/reader.html?note=SLUG`: Chinese articles.
- `/en/reader.html?post=SLUG` and `/en/reader.html?note=SLUG`: English articles.
- Old `blog.html?post=…` and `note.html?note=…` URLs remain supported.
- `/preview/` mirrors the current homepage for the existing local preview link.

## Edit and preview

Edit `index.html` for homepage structure, `assets/site.css` for its appearance, and `assets/translations.json` for English UI copy. Article Markdown remains in `blogs/` and `notes/`; Chinese files use `_zh.md`. The three organizational-intelligence articles currently have Chinese content in both legacy source files: the reader labels this fallback explicitly.

Run `python3 scripts/build.py` after changes. This regenerates the English homepage, preview entry points, reader aliases and the combined excerpt library. Generated files are committed so GitHub Pages can serve them directly.

Run `python3 -m http.server 8765 --bind 127.0.0.1` to preview locally.

## “Turn a page” content

Each article has a metadata file in `content/excerpts/`:

- `kind`, `slug`: match the article's entry in `assets/catalog.json`.
- `zh`, `en`: article titles.
- `format`: `core-idea`. These are editorial summaries, not verbatim quotations, and are labeled accordingly in the UI.
- `excerpts`: stable IDs with Chinese and English text.

Short articles currently have 6–8 core ideas; longer articles have 12. New articles should have 5–8 or 11–12 according to length. Keep each statement meaningful without its surrounding paragraph; preserve uncertainty and avoid turning a report's claims into universal facts. Add exact quotations only with an explicit format/attribution change.

Run the build after editing. The homepage draws without replacement through the 116-entry pool, then reshuffles. It avoids consecutive entries from the same article whenever the remaining pool permits. Each reader exposes its own core ideas in a collapsible panel.

## Dependencies

Vendored browser libraries are Marked 15.0.12 and DOMPurify 3.2.6; their license headers are preserved in `assets/vendor/`. Markdown is sanitized before rendering. Nothing calls an AI service at runtime.
