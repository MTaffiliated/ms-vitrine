
(function(){'use strict';
function qs(s){return document.querySelector(s);}
function qsa(s){return Array.from(document.querySelectorAll(s));}
var LANG='fr';
var T={{fr:{{nav_boutique:'Boutique',nav_insp:'Inspirations',nav_looks:'Looks',nav_blog:'Blog',nav_contact:'Contact',hero_h1:'Luxe & Tendances — Sélection internationale',hero_p:'Beauté, mode, accessoires : nos meilleures trouvailles CAN / USA / EU.',btn_discover:'Découvrir',btn_insp:'Voir inspirations',shop_title:'Produits en vedette',shop_intro:'Sélection premium.' ,insp_title:'Inspirations',insp_intro:'Des icônes & looks pour s\'inspirer.',looks_title:'Looks & Mode',blog_title:'Blog & Guides',quiz_title:'Quiz express — Trouve ton style',quiz_label_want:'Je veux',quiz_beaute:'Beauté',quiz_mode:'Mode',quiz_acc:'Accessoires',quiz_skin:'Type de peau',quiz_btn:'Voir recommandations',footer_copy:'© 2025 M&S Affiliated — Liens affiliés.'}},en:{{nav_boutique:'Shop',nav_insp:'Inspiration',nav_looks:'Looks',nav_blog:'Blog',nav_contact:'Contact',hero_h1:'Luxury & Trends — International picks',hero_p:'Beauty, fashion, accessories: our top finds for CAN / USA / EU.',btn_discover:'Discover',btn_insp:'See inspirations',shop_title:'Featured Products',shop_intro:'Premium selection.' ,insp_title:'Inspirations',insp_intro:'Icons & looks to inspire.',looks_title:'Looks & Fashion',blog_title:'Blog & Guides',quiz_title:'Quick quiz — Find your style',quiz_label_want:'I want',quiz_beaute:'Beauty',quiz_mode:'Fashion',quiz_acc:'Accessories',quiz_skin:'Skin type',quiz_btn:'Show picks',footer_copy:'© 2025 M&S Affiliated — Affiliate links.'}}};
function applyLang(){var t=T[LANG]; qsa('[data-i18n]').forEach(function(el){var k=el.getAttribute('data-i18n'); if(t[k]) el.textContent=t[k];});}
window.setLang=function(lang){LANG=lang; applyLang(); qsa('.lang button').forEach(b=>b.classList.remove('active')); var b=qs('[data-lang="'+lang+'"]'); if(b) b.classList.add('active');};

var PRODUCTS_PATH = 'data/products.json';

var INSP_BEAUTY = [
  {{img:'assets/img/inspirations/victoria_beckham.svg',name:'Victoria Beckham',insta:'@victoriabeckham',bio:'Luxe & skincare.'}},
  {{img:'assets/img/inspirations/hailey_bieber.svg',name:'Hailey Bieber',insta:'@haileybieber',bio:'Glow minimaliste.'}},
  {{img:'assets/img/inspirations/rihanna.svg',name:'Rihanna',insta:'@badgalriri',bio:'Audace & inclusivité.'}}
];
var INSP_MODE = [
  {{img:'assets/img/inspirations/bella_hadid.svg',name:'Bella Hadid',insta:'@bellahadid',bio:'High fashion.'}},
  {{img:'assets/img/inspirations/ariana_grande.svg',name:'Ariana Grande',insta:'@arianagrande',bio:'Glamour & parfums.'}},
  {{img:'assets/img/inspirations/kylie_jenner.svg',name:'Kylie Jenner',insta:'@kyliejenner',bio:'Beauty & business.'}}
];

document.addEventListener('DOMContentLoaded', function(){
  applyLang(); setLang('fr');
  fetch(PRODUCTS_PATH).then(function(r){ if(!r.ok) throw new Error('no products'); return r.json(); }).then(function(items){ var grid = qs('#grid'); if(grid) grid.innerHTML = items.map(function(p){ return `
    <article class="card">
      <img src="${p.image}" alt="${p.name}">
      <div class="pad">
        <div class="badge">${p.category}</div>
        <h3>${p.name}</h3>
        <p class="small">${p.brand}</p>
        <p class="price">${p.price_display||p.price} €</p>
        <p><a class="cta" href="${p.affiliateLink}" target="_blank" rel="nofollow sponsored noopener">Acheter</a></p>
      </div>
    </article>`; }).join(''); }).catch(function(e){ console.warn('Products not loaded', e); if(qs('#grid')) qs('#grid').innerHTML = '<p class="small">Aucun produit pour l\'instant.</p>'; });

  var inspContainer = qs('#inspiration-list');
  if(inspContainer){ inspContainer.innerHTML = `
    <div class="insp-grid-preview">
      <div class="cat-box">
        <h4>Inspirations Beauté</h4>
        <div class="preview-row" id="preview-beaute"></div>
        <div class="cat-actions"><a class="cta" href="inspirations.html">Voir tout Beauté</a></div>
      </div>
      <div class="cat-box">
        <h4>Inspirations Mode</h4>
        <div class="preview-row" id="preview-mode"></div>
        <div class="cat-actions"><a class="cta" href="inspirations.html">Voir tout Mode</a></div>
      </div>
    </div>`;
    var pb = qs('#preview-beaute'); if(pb) pb.innerHTML = INSP_BEAUTY.slice(0,2).map(function(i){ return `<article class="card insp-card"><img src="${i.img}" alt="${i.name}"><div class="insp-bio pad"><h3>${i.name}</h3><p class="small">${i.bio}</p><p class="small"><a href="https://instagram.com/${i.insta.replace('@','')}" target="_blank">${i.insta}</a></p></div></article>`; }).join('');
    var pm = qs('#preview-mode'); if(pm) pm.innerHTML = INSP_MODE.slice(0,2).map(function(i){ return `<article class="card insp-card"><img src="${i.img}" alt="${i.name}"><div class="insp-bio pad"><h3>${i.name}</h3><p class="small">${i.bio}</p><p class="small"><a href="https://instagram.com/${i.insta.replace('@','')}" target="_blank">${i.insta}</a></p></div></article>`; }).join('');
  }

  var looks = qs('#looks-row'); if(looks) looks.innerHTML = [1,2,3].map(function(i){ return `<article class="card"><img src="assets/img/models/look${i}.svg" alt="Look ${i}"><div class="pad"><h4>Look ${i}</h4><p class="small">Inspiration & produits associés.</p><p><a class="cta" href="looks.html">Shop the look</a></p></div></article>`; }).join('');

  var row = qs('#blog-row'); if(row) row.innerHTML = [
    {img:'assets/img/blog/blog1.svg',title:'Routine glow express',excerpt:'5 minutes pour un teint lumineux.',link:'blog/routine-glow.html'},
    {img:'assets/img/blog/blog2.svg',title:'Top accessoires 2025',excerpt:'Investir dans des pièces qui durent.',link:'blog/top-accessoires-2025.html'}
  ].map(function(p){ return `<article class="card"><img src="${p.img}" alt="${p.title}"><div class="pad"><h4>${p.title}</h4><p class="small">${p.excerpt}</p><a class="cta" href="${p.link}">Lire</a></div></article>`; }).join('');

  var qbtn = qs('#quiz-btn'); if(qbtn) qbtn.addEventListener('click', function(){ var pref = qs('#pref').value; var skin = qs('#skin').value; var out = qs('#quiz-out'); if(out) out.innerHTML = '<strong>Recommandation:</strong> '+(pref==='beaute'?'Glow & soin hydratant':pref==='mode'?'Silhouettes minimal-chic':'Accessoires dorés')+' — Peau: '+skin; var el = qs('#boutique'); if(el) el.scrollIntoView({behavior:'smooth'}); });
});
})();