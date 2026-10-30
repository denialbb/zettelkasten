---
title: CV — Daniel Biasiotto
description: Curriculum vitae of Daniel Biasiotto, available in English and Italian as a downloadable PDF.
author: Daniel Biasiotto
---

Curriculum Vitae — one page per language.

<section class="cv-section">
  <input type="radio" id="cv-en" name="cv-lang" checked>
  <input type="radio" id="cv-it" name="cv-lang">

  <div class="cv-bar" role="tablist" aria-label="CV language">
    <label for="cv-en" class="cv-tab">EN</label>
    <label for="cv-it" class="cv-tab">IT</label>
  </div>

  <div class="cv-view cv-view-en" role="tabpanel">
    <div class="cv-pdf">
      <iframe src="/static/cv-en.pdf#toolbar=0&amp;navpanes=0&amp;scrollbar=0&amp;view=FitH" title="CV — Daniel Biasiotto (English)" allowfullscreen></iframe>
      <button class="cv-fullscreen-button" type="button" aria-label="Toggle English CV fullscreen" onclick="if (document.fullscreenElement === this.closest('.cv-pdf')) { document.exitFullscreen(); } else { this.closest('.cv-pdf').requestFullscreen(); }">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3" /></svg>
        <span class="sr-only">Fullscreen</span>
      </button>
    </div>
    <p class="cv-download">
      <a href="/static/cv-en.pdf" target="_blank" rel="noopener">Open PDF in a new tab</a>
      <span aria-hidden="true">·</span>
      <a href="/static/cv-en.pdf" download>Download PDF (EN)</a>
    </p>
  </div>

  <div class="cv-view cv-view-it" role="tabpanel">
    <div class="cv-pdf">
      <iframe src="/static/cv-it.pdf#toolbar=0&amp;navpanes=0&amp;scrollbar=0&amp;view=FitH" title="CV — Daniel Biasiotto (Italiano)" allowfullscreen></iframe>
      <button class="cv-fullscreen-button" type="button" aria-label="Toggle Italian CV fullscreen" onclick="if (document.fullscreenElement === this.closest('.cv-pdf')) { document.exitFullscreen(); } else { this.closest('.cv-pdf').requestFullscreen(); }">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3" /></svg>
        <span class="sr-only">Fullscreen</span>
      </button>
    </div>
    <p class="cv-download">
      <a href="/static/cv-it.pdf" target="_blank" rel="noopener">Open PDF in a new tab</a>
      <span aria-hidden="true">·</span>
      <a href="/static/cv-it.pdf" download>Download PDF (IT)</a>
    </p>
  </div>
</section>
