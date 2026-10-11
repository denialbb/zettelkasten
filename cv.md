---
title: CV
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
    <object data="/static/cv-en.pdf" type="application/pdf" aria-label="CV (English)">
      <iframe title="CV (English)" src="/static/cv-en.pdf"></iframe>
    </object>
    <p class="cv-download">
      <a href="/static/cv-en.pdf" download>Download PDF (EN)</a>
    </p>
  </div>

  <div class="cv-view cv-view-it" role="tabpanel">
    <object data="/static/cv-it.pdf" type="application/pdf" aria-label="CV (Italiano)">
      <iframe title="CV (Italiano)" src="/static/cv-it.pdf"></iframe>
    </object>
    <p class="cv-download">
      <a href="/static/cv-it.pdf" download>Download PDF (IT)</a>
    </p>
  </div>
</section>

