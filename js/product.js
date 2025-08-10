
import { addToCart, money, toggleWishlist, isWishlisted } from './utils.js';
const qs = (s)=>document.querySelector(s); const id = new URLSearchParams(location.search).get('id');
const renderGallery = (images) => { const i = images[0]; return `<img class="wm" src="${i.lg}" srcset="${i.sm} 400w, ${i.md} 600w, ${i.lg} 900w" sizes="(max-width: 600px) 100vw, 50vw" alt="Product image" loading="lazy">`; };
const render = (p) => {
  const wish = isWishlisted(p.id) ? '♥ Remove' : '♡ Wishlist';
  qs('#product-detail').innerHTML = `
    <div>
      <div class="gallery">${renderGallery(p.images)}</div>
    </div>
    <div>
      <h1>${p.name}</h1>
      <p><strong>${money(p.priceINR)}</strong></p>
      <p>${p.description}</p>
      <p><small>Origin: ${p.originVillage}, ${p.originState}</small></p>
      <p><small>Materials: ${p.materials.join(', ')}</small></p>
      <div class="product__actions">
        <button class="btn btn--primary" id="add-cart">Add to Cart</button>
        <button class="btn" id="toggle-wish">${wish}</button>
      </div>
      <div class="product__meta">
        <h3>Care</h3><p>${p.care}</p>
        <h3>Shipping</h3><p>${p.shippingInfo}</p>
        <h3>Tags</h3><p>${p.tags.map(t=>`#${t}`).join(' ')}</p>
      </div>
    </div>`;
  qs('#add-cart').addEventListener('click', ()=>{ addToCart({ id: p.id, name: p.name, priceINR: p.priceINR, image: p.images[0].sm }); alert('Added to cart'); });
  qs('#toggle-wish').addEventListener('click', ()=>{ toggleWishlist(p.id); render(p); });
};
const init = async () => {
  const res = await fetch('../products.json'); const list = await res.json(); const p = list.find(x=>String(x.id)===String(id)) || list[0]; render(p);
};
document.addEventListener('DOMContentLoaded', init);
