---
title: "Monospace UI and inline PDF patterns"
date: "2026-10-30T00:00:00+02:00"
tags:
  - programming
  - web-design
  - typography
---

# Summary

- Use monospace as a *role* for concise interface text—navigation, section labels, dates, tags, and code—rather than setting long-form prose in it. Brittany Chiang's archived v4 portfolio is a clear coder-oriented example: [navigation](https://github.com/bchiang7/v4/blob/main/src/components/nav.js#L56-L63), [overlines and subtitles](https://github.com/bchiang7/v4/blob/main/src/styles/GlobalStyle.js#L392-L405), [experience tabs and date ranges](https://github.com/bchiang7/v4/blob/main/src/components/sections/jobs.js#L70-L82), and [code](https://github.com/bchiang7/v4/blob/main/src/styles/GlobalStyle.js#L358-L361) use a mono stack; its [body and post paragraphs](https://github.com/bchiang7/v4/blob/main/src/styles/GlobalStyle.js#L70-L81) stay in a sans stack with 1.3–1.5 line-height. The font tokens make the pairing explicit: [sans for reading, mono for technical/UI accents](https://github.com/bchiang7/v4/blob/main/src/styles/variables.js#L20-L22). The [current portfolio](https://www.brittanychiang.com/) says it uses Inter throughout, so treat v4 as an archived design precedent, not current styling.
- A useful counterpoint is [Julia Evans's blog](https://jvns.ca/): its first-party [stylesheet](https://jvns.ca/stylesheets/screen.css) uses PT Serif for body prose, a sans face for navigation and metadata, and monospace for code. The transferable principle is the *division of labor*: preserve a comfortable proportional face for paragraphs, and reserve mono for short technical or structural cues.
- The [IBM Developer typography guide](https://www.ibm.com/brand/experience-guides/developer/brand/typography) makes a similar role distinction: Plex Mono carries expressive headlines, code, and data points, while Plex Sans handles informative/supporting copy. It is a brand-system reference rather than a personal-site example.

# Inline PDF pattern

- [Gwern.net's stylesheet](https://gwern.net/static/css/default.css) is a live first-party implementation of the minimal layout: its iframe is block-level and nearly full width, capped to the viewport height; `.pdf` uses an 8.5:11 aspect ratio, with a taller mobile ratio. The site's [design notes](https://gwern.net/design) confirm that PDFs can be read in an embedded PDF viewer. This keeps the document in the reading flow without a heavy custom viewer.
- For a basic embed, use a responsive `<iframe>` pointing directly to the PDF, give it a descriptive `title`, and put a normal “Open/download PDF” link beside or below it. [MDN's iframe reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe#embedding_pdfs) confirms that browsers can render PDFs natively and warns that an iframe has no fallback content if rendering fails; it also documents full-width CSS and the `loading="lazy"` option.
- If fullscreen must be an explicit page-level control, place the frame in a wrapper and have a button call the wrapper's `requestFullscreen()`; toggle with `document.exitFullscreen()` when active. The [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen) requires a user gesture and can reject, so retain the ordinary PDF link as fallback. If relying on a control *inside* a nested viewer, grant fullscreen permission with `allow="fullscreen"` on the iframe.

## Sources

- [Brittany Chiang, v4 personal-site source](https://github.com/bchiang7/v4) and [live portfolio](https://www.brittanychiang.com/)
- [Julia Evans's blog](https://jvns.ca/) and [first-party stylesheet](https://jvns.ca/stylesheets/screen.css)
- [IBM Developer Experience Guide: Typography](https://www.ibm.com/brand/experience-guides/developer/brand/typography)
- [Gwern.net design notes](https://gwern.net/design) and [stylesheet](https://gwern.net/static/css/default.css)
- [MDN: `<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe) and [MDN: `requestFullscreen()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen)

Related: [[Typography]], [[Web Development]].
