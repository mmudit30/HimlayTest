
import { money, toggleWishlist, isWishlisted } from './utils.js';
const qs = (s)=>document.querySelector(s); const qsp=(k)=>new URLSearchParams(location.search).get(k)||'';
const state = { products: [], filtered: [] };
const renderCard = (p) => {
  const wish = isWishlisted(p.id) ? '♥' : '♡';
  const i = p.images[0];
  return `
  <a class="card wm" href="./product.html?id=${encodeURIComponent(p.id)}" aria-label="${p.name}">
    <img src="${i.md}" srcset="${i.sm} 400w, ${i.md} 600w, ${i.lg} 900w" sizes="(max-width: 600px) 100vw, 33vw" alt="${p.name}" loading="lazy">
    <div class="card__body">
      <h3>${p.name}</h3>
      <p>${money(p.priceINR)}</p>
      <small>${p.originVillage}, ${p.originState}</small>
      <button class="btn btn--wish" data-id="${p.id}" onclick="event.preventDefault(); window._toggleWish('${p.id}')">${wish} Wishlist</button>
    </div>
  </a>`;
};
window._toggleWish = (id) => { toggleWishlist(id); render(); };
const populateFilters = () => {
  const catSel = qs('#filter-category'); const matSel = qs('#filter-material');
  const cats = [...new Set(state.products.map(p=>p.category))].sort();
  const mats = [...new Set(state.products.flatMap(p=>p.materials))].sort();
  for(const c of cats){ const o=document.createElement('option'); o.value=c; o.textContent=c; catSel.appendChild(o); }
  for(const m of mats){ const o=document.createElement('option'); o.value=m; o.textContent=m; matSel.appendChild(o); }
  const catQ = qsp('category'); if(catQ) catSel.value = catQ; const searchQ = qsp('search'); if(searchQ) qs('#filter-search').value = decodeURIComponent(searchQ);
};
const applyFilters = () => {
  const cat = qs('#filter-category').value; const mat = qs('#filter-material').value; const q = qs('#filter-search').value.toLowerCase().trim(); const sort = qs('#filter-sort').value;
  let list = state.products.filter(p => (!cat || p.category===cat) && (!mat || p.materials.includes(mat)));
  if (q) list = list.filter(p => (p.name + ' ' + p.description + ' ' + p.tags.join(' ')).toLowerCase().includes(q));
  if (sort==='price-asc') list.sort((a,b)=>a.priceINR-b.priceINR); else if (sort==='price-desc') list.sort((a,b)=>b.priceINR-a.priceINR);
  else list.sort((a,b)=> new Date(b.dateAdded) - new Date(a.dateAdded));
  state.filtered = list;
};
const render = () => { applyFilters(); qs('#product-grid').innerHTML = state.filtered.map(renderCard).join(''); };
const init = async () => {
  const res = await fetch('../products.json'); state.products = await res.json(); populateFilters(); render();
  ['change','keyup'].forEach(ev => {
    qs('#filter-category').addEventListener('change', render);
    qs('#filter-material').addEventListener('change', render);
    qs('#filter-search').addEventListener('keyup', render);
    qs('#filter-sort').addEventListener('change', render);
  });
};
document.addEventListener('DOMContentLoaded', init);
